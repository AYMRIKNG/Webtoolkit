import React, { useState, useEffect } from 'react';
import Card from "../ui/card";
import { supabase } from '../../supabaseClient';

export default function CategoryPage({ category }) {
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategoryId = async () => {
      // Récupère l'ID de la catégorie à partir de son nom
      const { data, error } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();

      if (error) {
        console.error("Erreur récupération ID catégorie :", error);
        setCategoryId(null);
      } else {
        setCategoryId(data.id);
      }
    };

    if (category) {
      fetchCategoryId();
    }
  }, [category]);

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

  return (
    <section className="h-full p-4 overflow-scroll mb-8 scrollbar-hide">


      {subcategories.map(sub => (
        <div key={sub.id} className="flex flex-col mb-6 p-4 gap-y-4 text-white">
          <div className="flex justify-between items-center ">
            <h3 className=" font-semibold">{sub.name}</h3>
            <button className="text-sm text-zinc-400 hover:underline">Tout voir</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      ))}

      {subcategories.length === 0 && (
        <p className="text-zinc-400 italic">Aucune sous-catégorie disponible.</p>
      )}
    </section>
  );
}
