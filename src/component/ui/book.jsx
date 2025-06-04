import React from 'react';
import { supabase } from '../../supabaseClient'; // adapte le chemin

export default function Book({ book }) {
  if (!book) return null;

  const handleClick = async (e) => {
    e.preventDefault(); // Empêche le href de se déclencher immédiatement

    if (!book.id) return;

    const { error } = await supabase
      .from('books')
      .eq('id', book.id);

    if (error) {
      console.error('Erreur mise à jour du compteur :', error.message);
    }

    // Ouvre ensuite le lien dans un nouvel onglet
    window.open(book.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-y-2 h-fit cursor-pointer"
    >
      <div className="aspect-[9/12] rounded-sm bg-center bg-no-repeat bg-cover bg-zoom overflow-hidden flex items-center justify-center">

          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-fill"
          />

      </div>


    </div>
  );
}
