import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Home, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-12">
      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-card text-center animate-scale-in">
        <div className="mx-auto h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Your consultation request has been successfully submitted. Our team will contact you shortly to confirm your appointment.
        </p>

        <div className="bg-muted/50 rounded-2xl p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-xl mb-4">Contact Information</h2>
          
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Phone className="h-5 w-5 text-primary" />
            <span>+91 7011295507</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Mail className="h-5 w-5 text-primary" />
            <span>netrakiran07@gmail.com</span>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Working Hours:</strong> Monday - Sunday, 9:00 AM - 10:00 PM
            </p>
          </div>
        </div>

        <Button asChild className="bg-gradient-hero hover:opacity-90 h-12 px-8">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default ThankYou;
