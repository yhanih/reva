import React, { useState, useEffect } from "react";
import PromoterDashboard from "./components/PromoterDashboard";
import MarketerDashboard from "./components/MarketerDashboard";
import { useAuth } from "AuthContext";
import { supabase } from "supabaseClient";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (data) {
          setRole(data.role);
        }
      }
    };
    fetchRole();
  }, [user]);

  if (!role) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      {role === 'promoter' ? <PromoterDashboard /> : <MarketerDashboard />}
    </div>
  );
};

export default Dashboard;
