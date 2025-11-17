import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface CustomerProtectedRouteProps {
  children: React.ReactNode;
}

const CustomerProtectedRoute = ({ children }: CustomerProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCustomer, setIsCustomer] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCustomerAccess = async () => {
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        // Check if user has customer role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'customer')
          .maybeSingle();

        if (!error && data) {
          setIsCustomer(true);
        } else {
          setIsCustomer(false);
        }
      }
      
      setLoading(false);
    };

    checkCustomerAccess();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkCustomerAccess();
      } else {
        setIsCustomer(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session || !isCustomer) {
    return <Navigate to="/customer-login" replace />;
  }

  return <>{children}</>;
};

export default CustomerProtectedRoute;
