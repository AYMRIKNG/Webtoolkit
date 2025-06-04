import React, { useEffect, useState } from 'react';
import Searchbar from './ui/searchbar';
import { supabase } from '../supabaseClient'; // Ajuste le chemin si besoin

export default function Navbar({ selectedCategory }) {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'Explore') {
      setSubcategories([]); // ou charger autre chose si tu veux
      return;
    }

    async function fetchSubcategories() {
      // On récupère l'id de la catégorie d'abord
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', selectedCategory)
        .limit(1)
        .single();

      if (catError) {
        console.error('Erreur récupération catégorie:', catError);
        setSubcategories([]);
        return;
      }

      const { data: subs, error: subError } = await supabase
        .from('subcategories')
        .select('name')
        .eq('category_id', categories.id);

      if (subError) {
        console.error('Erreur récupération sous-catégories:', subError);
        setSubcategories([]);
      } else {
        setSubcategories(subs);
      }
    }

    fetchSubcategories();
  }, [selectedCategory]);

  return (
    <nav className='h-12 min-w-3 flex justify-center flex-col mt-2 mr-2 ml-2 rounded-sm py-1 bg-black px-4'>
      <ul className='flex justify-between text-white w-full'>
       <ul className='flex gap-x-10'> <li className='flex items-center gap-x-2'>
          <img src="/assets/image/logo.png" className='h-8 rounded-md' alt="Logo" />
          <h1 className='text-3xl font-bold'>WEBTOOLKIT</h1>
        </li>
        
        <li className='hidden md:flex items-center space-x-4'>
          <h2 className='text-white'>{selectedCategory}</h2>
          {subcategories.length === 0 ? (
            <span className='text-zinc-400 italic'></span>
          ) : (
            subcategories.map(sub => (
              <button
                key={sub.name}
                className="text-white hover:underline"
                onClick={() => alert(`Tu as cliqué sur ${sub.name}`)} 
              >
                {sub.name}
              </button>
            ))
          )}
        </li></ul>

        <li className='hidden md:flex items-center gap-x-4'>
          <Searchbar />
          <a href="https://www.linkedin.com/in/aymerickng/" target="_blank" rel="noreferrer">
            <h4>Linkedin</h4>
          </a>
          <a href="https://github.com/AYMRIKNG" target="_blank" rel="noreferrer">
            <h4>Github</h4>
          </a>
          <a href="https://ay-one.vercel.app" target="_blank" rel="noreferrer">
            <h4>Portfolio</h4>
          </a>
        </li>

        <li className='md:hidden'>button</li>
      </ul>
    </nav>
  );
}
