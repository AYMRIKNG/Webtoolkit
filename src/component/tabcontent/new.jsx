import React, { useEffect, useState } from "react";
import Card from "../ui/card";
import { supabase } from "../../supabaseClient";

export default function NouveautePage() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchNewSites = async () => {
      const { data, error } = await supabase
        .from("sites")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Erreur de chargement des nouveautés :", error);
      } else {
        setSites(data);
      }
    };

    fetchNewSites();
  }, []);

  return (
    <section className="text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Nouveautés</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sites.map(site => (
          <Card key={site.id} site={site} />
        ))}
      </div>
    </section>
  );
}
