import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Trash2, ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number | null;
  gender: string | null;
  left_eye_power: string | null;
  right_eye_power: string | null;
  lens_type: string | null;
  notes: string | null;
  created_at: string;
}

const Customers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load customers.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lens_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer deleted successfully.",
      });
      fetchCustomers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete customer.",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-3xl">Customer Management</CardTitle>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, email, or lens type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button asChild className="bg-gradient-hero hover:opacity-90">
                <Link to="/admin/add-customer">Add Customer</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchTerm ? "No customers found matching your search." : "No customers yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Lens Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.lens_type || "—"}</TableCell>
                        <TableCell>
                          {format(new Date(customer.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(customer.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Customer Details</DialogTitle>
            <DialogDescription>
              Full information for {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Name</p>
                <p className="font-medium">{selectedCustomer.name}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">{selectedCustomer.phone}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{selectedCustomer.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Age</p>
                <p className="font-medium">{selectedCustomer.age || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Gender</p>
                <p className="font-medium">{selectedCustomer.gender || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Lens Type</p>
                <p className="font-medium">{selectedCustomer.lens_type || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Left Eye Power</p>
                <p className="font-medium">{selectedCustomer.left_eye_power || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Right Eye Power</p>
                <p className="font-medium">{selectedCustomer.right_eye_power || "—"}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Notes</p>
                <p className="font-medium">{selectedCustomer.notes || "No notes"}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Submitted</p>
                <p className="font-medium">
                  {format(new Date(selectedCustomer.created_at), "PPP 'at' p")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
