import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Us</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">Netra Kiran Optics</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in eye care, committed to providing exceptional lens solutions and personalized service since 2010.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 shadow-card">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Netra Kiran, we believe everyone deserves clear, comfortable vision. We combine cutting-edge technology with personalized care to deliver lens solutions that enhance your quality of life. Our expert team is dedicated to understanding your unique needs and providing guidance every step of the way.
            </p>
          </Card>

          <Card className="p-8 shadow-card">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-muted-foreground leading-relaxed">
              With over 15 years of experience in the optical industry, we specialize in prescription lenses, contact lenses, and specialized eyewear. Our state-of-the-art facility and partnership with leading lens manufacturers ensure you receive the highest quality products backed by professional service.
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12 shadow-card mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Store</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    LGF-3 Retailx Shoping Complex<br />
                    Abhay Khand 3, Pocket 4<br />
                    Indirapuram, Ghaziabad, Uttar Pradesh 201010
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    +91 7011295507 <br />
                    {/* Toll-free: 1-800-VISION-1 */}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    netrakiran07@gmail.com<br />
                    {/* support@visioncare.com */}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Sunday: 9:00 AM - 10:00 PM<br />
                    {/* Saturday: 9:00 AM - 10:00 PM<br /> */}
                    {/* Sunday: Closed */}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Book your consultation today and experience the VisionCare difference.
              </p>
              <Button asChild className="bg-gradient-hero hover:opacity-90 h-12">
                <Link to="/customer">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
