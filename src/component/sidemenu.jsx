import React, { useEffect, useState } from 'react';
import Sidebutton from './ui/sidebutton';
import TabDropDown from './ui/dropdown';
import { supabase } from '../supabaseClient';

export default function Sidemeu({ onCategorySelect }) {
  const [areTabsOpen, setAreTabsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleAllTabs = () => setAreTabsOpen(prev => !prev);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Erreur de chargement des catégories:', error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className='hidden md:flex flex-col w-72 bg-black h-full p-4 m-2 rounded-sm'>
    <Sidebutton tittle="Explore" image="/assets/image/nav.png"   onClick={() => {
    console.log("Explore cliqué !");
    onCategorySelect('Explore');
  }} />
      <Sidebutton tittle="Livres" image="/assets/image/book.png" onClick={() => onCategorySelect('Livres')} />

      <div className='flex flex-col h-full'>
        <div className='flex justify-between mb-2' onClick={toggleAllTabs}>
          <h6 className='text-zinc-500 items-center'>Outils</h6>
          <img
            className={`h-4 cursor-pointer transform transition-transform duration-300 ${areTabsOpen ? 'rotate-180' : ''}`}
            src="/assets/image/doubledown.png"
            alt=""
          />
        </div>

        {categories.map(cat => (
          <TabDropDown
            key={cat.id}
            categoryId={cat.id}
            tittle={cat.name}
            image={`/assets/image/${cat.name}.png`}
            isOpen={areTabsOpen}

             onClick={() => onCategorySelect(cat.name)}
          />
        ))}

 <button class="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
<span class="relative px-10 w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Ajouter un site
</span>
</button>
      </div>
    </section>
  );
}
