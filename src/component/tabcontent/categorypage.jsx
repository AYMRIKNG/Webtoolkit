import React, { useState, useEffect } from 'react';
import Card from "../ui/card";
import { supabase } from '../../supabaseClient';

export default function CategoryPage({ category }) {
   const [subcategories, setSubcategories] = useState([]);
  const [sitesBySub, setSitesBySub] = useState({});  // <-- Ici, important
  const [categoryId, setCategoryId] = useState(null);

  // 1) Récupérer l'ID de la catégorie
useEffect(() => {
  if (!category || category === 'Nouveau') return; // ← on ne fait rien
  const fetchCategoryId = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .eq('name', category)
      .maybeSingle();

    if (error) {
      console.error("Erreur récupération ID catégorie :", error.message, error.details);
      setCategoryId(null);
    } else if (data) {
      setCategoryId(data.id);
    } else {
      console.warn("Catégorie non trouvée :", category);
      setCategoryId(null);
    }
  };

  fetchCategoryId();
}, [category]);


  // 2) Récupérer les sous-catégories
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!categoryId) return;

      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId);

      if (error) {
        console.error("Erreur chargement sous-catégories :", error);
      } else {
        setSubcategories(data);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  // 3) Récupérer tous les sites des sous-catégories
  useEffect(() => {
    const fetchSites = async () => {
      if (subcategories.length === 0) return;

      const subIds = subcategories.map(sub => sub.id);

      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .in('subcategory_id', subIds);

      if (error) {
        console.error("Erreur chargement sites :", error);
        setSitesBySub({});
      } else {
        // Regroupe les sites par sous-catégorie
        const grouped = data.reduce((acc, site) => {
          if (!acc[site.subcategory_id]) acc[site.subcategory_id] = [];
          acc[site.subcategory_id].push(site);
          return acc;
        }, {});

        setSitesBySub(grouped);
      }
    };

    fetchSites();
  }, [subcategories]);

  return (
    <section className="h-full p-4 overflow-scroll mb-8 scrollbar-hide">


      {subcategories.map(sub => (
        <div key={sub.id} className="flex flex-col mb-6 p-4 gap-y-4 text-white">
          <div className="flex justify-between items-center ">
            <h3 className=" font-semibold">{sub.name}</h3>
    
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(sitesBySub[sub.id] || []).map(site => (
              <Card key={site.id} site={site} />
            ))}
          </div>
        </div>
      ))}

      {subcategories.length === 0 && (
        <p className="text-zinc-400 italic">Aucune sous-catégorie disponible.</p>
      )}
    </section>
  );
}
