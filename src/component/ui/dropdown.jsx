import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function TabDropDown({ tittle, image, isOpen, categoryId, onClick }) {
  const [open, setOpen] = useState(isOpen);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId);

      if (error) {
        console.error(`Erreur chargement sous-catégories pour ${tittle}`, error);
      } else {
        setSubcategories(data);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  const toggleDropdown = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className='h-fit w-full'>
      <div
        className='py-2 flex justify-between cursor-pointer'
        
        
      >
        <div onClick={onClick} className='flex items-center text-white gap-x-2'>
          <img className='h-5 w-5' src={image} alt="" />
          <h4>{tittle}</h4>
        </div>
        <div className='flex items-center ' onClick={toggleDropdown}>
          <img 
            className={`h-4 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            src="/assets/image/arrowdown.png"
            alt="arrow"
          />
        </div>
      </div>

      {open && (
        <div className='flex flex-col'>
          <ul className='pl-2 text-white h-fit'>
            {subcategories.map(sub => (
              <li
                key={sub.id}
                className='pl-4 border-l-2 border-zinc-800 cursor-pointer hover:border-white py-[0.10rem]'
              >
                {sub.name}
              </li>
            ))}
         
          </ul>
        </div>
      )}
    </div>
  );
}
