import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, ArrowLeft, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  
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
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setIsLoggedIn(true);
      setUserEmail(user.email || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields (name, phone, email).",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Insert into customers table
      const { error: customerError } = await supabase.from("customers").insert([
        {
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
          user_id: user?.id || null,
        },
      ]);

      if (customerError) throw customerError;

      // Also insert into consultation_requests table
      const { error: consultationError } = await supabase.from("consultation_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.notes || null,
          status: "pending",
        },
      ]);

      if (consultationError) {
        console.error("Error creating consultation request:", consultationError);
        // Don't fail the submission if consultation request fails
      }

      // Send email notifications
      try {
        await supabase.functions.invoke("send-consultation-email", {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            age: formData.age ? parseInt(formData.age) : undefined,
            gender: formData.gender || undefined,
            leftEyePower: formData.left_eye_power || undefined,
            rightEyePower: formData.right_eye_power || undefined,
            lensType: formData.lens_type || undefined,
            notes: formData.notes || undefined,
          },
        });
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Don't fail the submission if email fails
      }

      toast({
        title: "Success!",
        description: "Your details have been submitted successfully. Check your email for confirmation.",
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your details. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Login Status Banner */}
        {isLoggedIn ? (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span className="text-sm">Logged in as <strong>{userEmail}</strong></span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/my-records")}
            >
              View My Records
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-muted rounded-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <LogIn className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Login to save and view your consultation history</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/customer-login")}
            >
              Login / Sign Up
            </Button>
          </div>
        )}

        <Card className="shadow-card border-primary/10">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-soft">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Book Your Lens Consultation</CardTitle>
            <CardDescription className="text-base">
              Fill in your details and we'll help you find the perfect lenses
            </CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information or special requirements..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-hero hover:opacity-90 text-lg h-12" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
