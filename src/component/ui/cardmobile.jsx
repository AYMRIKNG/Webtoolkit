import React from 'react';
import { supabase } from '../../supabaseClient'; // adapte le chemin si besoin

export default function CardMini({ site }) {
  if (!site || !site.url) return null;

  const logoUrl = site.logo || `https://www.google.com/s2/favicons?sz=64&domain=${new URL(site.url).hostname}`;

  const handleClick = async (e) => {
    e.preventDefault(); // Empêche le href de s’exécuter immédiatement

    if (!site.id) return;

    const compteActuel = site.compte ?? 0;

    const { error } = await supabase
      .from('sites') // ⚠️ corriger ici
      .update({ compte: compteActuel + 1 })
      .eq('id', site.id);

    if (error) {
      console.error('Erreur lors de la mise à jour du compteur :', error.message);
    }

    // Ouvrir le lien manuellement après la mise à jour
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div onClick={handleClick} className="flex gap-x-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer">
      <img src={logoUrl} alt="logo" className="h-14 w-14 rounded-md" />
      <div className="my-auto">
        <h4 className="text-sm font-semibold">{site.name}</h4>
        <h5 className="text-xs text-zinc-400 truncate whitespace-normal break-words line-clamp-2">
          {site.description}
        </h5>
      </div>
    </div>
  );
}
