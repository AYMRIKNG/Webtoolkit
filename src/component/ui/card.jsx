import React from 'react';

const pastelColors = [
  '#b951ff', // rose pastel
  '#ff5151', // orange pastel
  '#68E487', // jaune pastel
  '##CEFF51', // vert pastel
  '#5162ff', // bleu pastel
];

function getRandomPastelColor() {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

export default function Card({ site }) {
  if (!site) return null;

  const hasImage = site.preview_image && site.preview_image.trim() !== '';

  // Si pas d'image, on génère une couleur pastel aléatoire une fois
  const bgColor = hasImage ? 'transparent' : getRandomPastelColor();

  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer">
      <div className='flex flex-col gap-y-2 h-fit cursor-pointer'>
        <div
          className="aspect-[16/10] rounded-sm bg-center bg-no-repeat bg-cover bg-zoom"
          style={{
            backgroundImage: hasImage ? `url(${site.preview_image})` : 'none',
            backgroundColor: bgColor,
          }}
        />
        <h4 className='font-bold'>{site.name}</h4>
        <h5>{site.description}</h5>
      </div>
    </a>
  );
}
