import React, { useEffect, useState } from 'react';
import HeroBanner from '../ui/herobanner';
import Card from '../ui/card';
import CardMini from '../ui/cardmobile';
import { supabase } from '../../supabaseClient';
export default function HomePage({ setSelectedCategory }) {   

 const [latestSites, setLatestSites] = useState([]);


  useEffect(() => {
    const fetchLatestSites = async () => {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error("Erreur lors du chargement des nouveautés :", error);
      } else {
        setLatestSites(data);
      }
    };

    fetchLatestSites();
  }, []);


  return (
    <div className='h-full  flex flex-col min-w-3 text-white rounded-sm gap-y-4 overflow-scroll scrollbar-hide bg-transparent p-3'>
        <HeroBanner image="/assets/image/glass.gif" />

        {/* Most used*/}

        <div className='flex flex-col p-4 gap-y-4 bg-black '>
        <div className='flex justify-between'>
             <h3>Most used</h3>
             <h6>Tout voir</h6>
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-4'> 
 <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>

          </div>
       
        </div>

        {/* Nouveauté */}
         <div className='flex flex-col p-4 gap-y-4'>
        <div className='flex justify-between'>
             <h3>Nouveauté</h3>
             <h6 onClick={() => setSelectedCategory("Nouveau")}  className='text-zinc-400 hover:underline cursor-pointer '>Tout voir</h6>
        </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-4  lg:grid-cols-4 lg:grid-rows-2 gap-4'> 
            {latestSites.map((site) => (
            <CardMini key={site.id} site={site} />
          ))}
          </div>
       
        </div>
          <HeroBanner image="/assets/image/black.gif" />

        {/* Nouveauté */}
                 <div className='flex flex-col p-4 gap-y-4 bg-black '>
        <div className='flex justify-between'>
             <h3>Most used</h3>
             <h6>Tout voir</h6>
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-4'> 
        <Card/>
        <Card/>
        <Card/>
        <Card/>
          </div>
       
        </div>

            {/* Nouveauté */}
                 <div className='flex flex-col p-4 gap-y-4 bg-black '>
        <div className='flex justify-between'>
             <h3>Most used</h3>
             <h6>Tout voir</h6>
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-4'> 
        <Card/>
        <Card/>
        <Card/>
        <Card/>   <Card/>
        <Card/>
        <Card/>
        <Card/> 
          </div>
       
        </div>

         {/* Nouveauté */}
          <div className='flex flex-col p-4 gap-y-4'>
        <div className='flex justify-between'>
             <h3>Nouveauté</h3>
             <h6>Tout voir</h6>
        </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-4  lg:grid-cols-4 lg:grid-rows-2 gap-4'> 
           <CardMini/><CardMini/><CardMini/><CardMini/><CardMini/><CardMini/>

          </div>
       
        </div>

         {/* Nouveauté */}
          <div className='flex flex-col p-4 gap-y-4'>
        <div className='flex justify-between'>
             <h3>Podcast</h3>
             <h6>Tout voir</h6>
        </div>
          <iframe
  className='aspect-video m-8'
  src="https://www.youtube.com/embed/xguam0TKMw8"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

        </div>
    </div>
  );
}


