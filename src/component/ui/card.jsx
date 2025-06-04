import React from 'react';
import { supabase } from '../../supabaseClient'; // adapte le chemin

export default function Card({ site }) {
  if (!site) return null;

  const hasImage = site.preview_image && site.preview_image.trim() !== '';
  const fallbackLogo = site.logo && site.logo.trim() !== '';

  const handleClick = async (e) => {
    e.preventDefault(); // Empêche le href de se déclencher immédiatement

    if (!site.id) return;

    const { error } = await supabase
      .from('sites')
      .update({ compte: site.compte + 1 })
      .eq('id', site.id);

    if (error) {
      console.error('Erreur mise à jour du compteur :', error.message);
    }

    // Ouvre ensuite le lien dans un nouvel onglet
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-y-2 h-fit cursor-pointer"
    >
      <div className="aspect-[16/10] rounded-sm bg-center bg-no-repeat bg-cover bg-zoom overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img
            src={site.preview_image}
            alt={site.name}
            className="w-full h-full object-cover"
          />
        ) : fallbackLogo ? (
          <img
            src={site.logo}
            alt={`${site.name} logo`}
            className="h-12 object-contain"
          />
        ) : (
          <div className="text-sm text-zinc-400">Aucune image</div>
        )}
      </div>
      <h4 className="font-bold">{site.name}</h4>
      <h5 className="max-h-44 whitespace-normal break-words line-clamp-2">
        {site.description}
      </h5>
    </div>
  );
}
