import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Shield, Star, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Eye Care</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your Vision, <span className="text-primary">Our Care</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience premium lens solutions tailored to your unique needs. Expert care, modern technology, exceptional service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 shadow-soft text-lg h-14 px-8">
                <Link to="/customer">
                  Book Lens Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 hover-scale">
                <Link to="/customer-login">
                  <User className="mr-2 h-5 w-5" />
                  My Records
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="lg" className="text-lg h-14 px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose VisionCare?</h2>
            <p className="text-muted-foreground text-lg">Excellence in every aspect of eye care</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-card hover-scale transition-all border-primary/10">
              <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Expert Consultation</h3>
              <p className="text-muted-foreground">
                Professional eye examinations with state-of-the-art equipment for precise prescriptions.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover-scale transition-all border-primary/10">
              <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                High-quality lenses from trusted brands, ensuring durability and crystal-clear vision.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover-scale transition-all border-primary/10">
              <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Personalized Service</h3>
              <p className="text-muted-foreground">
                Customized lens solutions tailored to your lifestyle, preferences, and budget.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to See Better?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take the first step towards clearer vision. Book your consultation today.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-8 hover-scale">
            <Link to="/customer">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-3">VisionCare Lens Shop</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for premium eye care solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/customer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Book Consultation
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/login" className="block text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: +1 (555) 123-4567</p>
                <p>Email: info@visioncare.com</p>
                <p>Hours: Mon-Sat 9AM-6PM</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 VisionCare Lens Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
