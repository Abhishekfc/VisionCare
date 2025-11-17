import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, LogOut } from "lucide-react";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    left_eye_power: "",
    right_eye_power: "",
    lens_type: "",
    notes: "",
    include_prescription: false,
    right_sphere: "",
    right_cylinder: "",
    right_axis: "",
    right_add: "",
    right_pd_distance: "",
    left_sphere: "",
    left_cylinder: "",
    left_axis: "",
    left_add: "",
    left_pd_near: "",
    doctor_name: "",
    prescription_notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("customers").insert([
        {
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Customer added successfully.",
      });

      navigate("/admin/customers");
    } catch (error) {
      console.error("Error adding customer:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add customer.",
      });
    } finally {
      setIsSubmitting(false);
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
          <Link to="/admin/customers" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Customers</span>
          </Link>
          
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl">Add New Customer</CardTitle>
                <CardDescription>Manually enter customer information</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lens_type">Lens Type</Label>
                  <Select value={formData.lens_type} onValueChange={(value) => setFormData({ ...formData, lens_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lens type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Soft">Soft</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Color">Color</SelectItem>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="left_eye_power">Left Eye Power</Label>
                  <Input
                    id="left_eye_power"
                    value={formData.left_eye_power}
                    onChange={(e) => setFormData({ ...formData, left_eye_power: e.target.value })}
                    placeholder="e.g., -2.50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="right_eye_power">Right Eye Power</Label>
                  <Input
                    id="right_eye_power"
                    value={formData.right_eye_power}
                    onChange={(e) => setFormData({ ...formData, right_eye_power: e.target.value })}
                    placeholder="e.g., -2.25"
                  />
                </div>
              </div>

              {/* Eye Prescription Section */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include_prescription"
                    checked={formData.include_prescription}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, include_prescription: checked as boolean })
                    }
                  />
                  <Label htmlFor="include_prescription" className="text-base font-semibold">
                    Include Detailed Eye Prescription
                  </Label>
                </div>

                {formData.include_prescription && (
                  <div className="space-y-6 p-6 bg-muted/50 rounded-lg">
                    {/* Right Eye */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Right Eye (OD)</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="right_sphere">Sphere (SPH)</Label>
                          <Input
                            id="right_sphere"
                            value={formData.right_sphere}
                            onChange={(e) => setFormData({ ...formData, right_sphere: e.target.value })}
                            placeholder="e.g., -2.50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="right_cylinder">Cylinder (CYL)</Label>
                          <Input
                            id="right_cylinder"
                            value={formData.right_cylinder}
                            onChange={(e) => setFormData({ ...formData, right_cylinder: e.target.value })}
                            placeholder="e.g., -0.75"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="right_axis">Axis</Label>
                          <Input
                            id="right_axis"
                            value={formData.right_axis}
                            onChange={(e) => setFormData({ ...formData, right_axis: e.target.value })}
                            placeholder="e.g., 180"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="right_add">Add</Label>
                          <Input
                            id="right_add"
                            value={formData.right_add}
                            onChange={(e) => setFormData({ ...formData, right_add: e.target.value })}
                            placeholder="e.g., +2.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="right_pd_distance">PD Distance</Label>
                          <Input
                            id="right_pd_distance"
                            value={formData.right_pd_distance}
                            onChange={(e) => setFormData({ ...formData, right_pd_distance: e.target.value })}
                            placeholder="e.g., 32"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Left Eye */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Left Eye (OS)</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="left_sphere">Sphere (SPH)</Label>
                          <Input
                            id="left_sphere"
                            value={formData.left_sphere}
                            onChange={(e) => setFormData({ ...formData, left_sphere: e.target.value })}
                            placeholder="e.g., -2.25"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="left_cylinder">Cylinder (CYL)</Label>
                          <Input
                            id="left_cylinder"
                            value={formData.left_cylinder}
                            onChange={(e) => setFormData({ ...formData, left_cylinder: e.target.value })}
                            placeholder="e.g., -0.50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="left_axis">Axis</Label>
                          <Input
                            id="left_axis"
                            value={formData.left_axis}
                            onChange={(e) => setFormData({ ...formData, left_axis: e.target.value })}
                            placeholder="e.g., 175"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="left_add">Add</Label>
                          <Input
                            id="left_add"
                            value={formData.left_add}
                            onChange={(e) => setFormData({ ...formData, left_add: e.target.value })}
                            placeholder="e.g., +2.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="left_pd_near">PD Near</Label>
                          <Input
                            id="left_pd_near"
                            value={formData.left_pd_near}
                            onChange={(e) => setFormData({ ...formData, left_pd_near: e.target.value })}
                            placeholder="e.g., 30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Doctor & Notes */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor_name">Doctor Name</Label>
                        <Input
                          id="doctor_name"
                          value={formData.doctor_name}
                          onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                          placeholder="Dr. Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prescription_notes">Prescription Notes</Label>
                        <Input
                          id="prescription_notes"
                          value={formData.prescription_notes}
                          onChange={(e) => setFormData({ ...formData, prescription_notes: e.target.value })}
                          placeholder="Additional prescription details"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-hero hover:opacity-90 h-12" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Customer..." : "Add Customer"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/admin/customers")}
                  className="h-12"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddCustomer;
