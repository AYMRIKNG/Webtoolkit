import React from 'react';
import HomePage from './tabcontent/home_page';
import CategoryPage from './tabcontent/categorypage'; // à créer selon les catégories
import NouveautePage from './tabcontent/new';

export default function Tabcontent({ selectedCategory, setSelectedCategory  }) {
  return (
    <section className="w-full h-full bg-transparent mt-2 mr-2 rounded-sm pb-8">
      {selectedCategory === 'Explore' ? (
         <HomePage setSelectedCategory={setSelectedCategory} />
      ) : selectedCategory === 'Nouveau' ? (
        <NouveautePage />
      ) : (
        <CategoryPage category={selectedCategory} />
      ) }
    </section>
  );
}
