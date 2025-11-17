import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, FileText, LogOut, Plus, Eye, UserPlus, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    recentCustomers: 0,
    consultationRequests: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total customers
      const { count: customersCount } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      // Get recent customers (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentCount } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString());

      // Get consultation requests
      const { count: consultationCount } = await supabase
        .from("consultation_requests")
        .select("*", { count: "exact", head: true });

      // Get pending consultation requests
      const { count: pendingCount } = await supabase
        .from("consultation_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      setStats({
        totalCustomers: customersCount || 0,
        recentCustomers: recentCount || 0,
        consultationRequests: consultationCount || 0,
        pendingRequests: pendingCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "Successfully logged out from admin panel.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">VisionCare Admin</h1>
              <p className="text-xs text-muted-foreground">Lens Shop Management</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={handleLogout} className="hover-scale">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.recentCustomers} new this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent Entries
              </CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.recentCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Consultations
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.consultationRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total requests
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting response
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto py-6 flex-col gap-2">
              <Link to="/admin/customers">
                <Users className="h-6 w-6" />
                <span>View Customers</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto py-6 flex-col gap-2">
              <Link to="/admin/add-customer">
                <UserPlus className="h-6 w-6" />
                <span>Add Customer</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto py-6 flex-col gap-2">
              <Link to="/admin/consultation-requests">
                <MessageSquare className="h-6 w-6" />
                <span>Consultation Requests</span>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={handleLogout}>
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
