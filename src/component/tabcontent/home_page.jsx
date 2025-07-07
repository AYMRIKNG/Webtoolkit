import React, { useEffect, useState } from 'react';
import HeroBanner from '../ui/herobanner';
import Card from '../ui/card';
import CardMini from '../ui/cardmobile';
import { supabase } from '../../supabaseClient';
import Book from '../ui/book';
export default function HomePage({ setSelectedCategory }) {   

 const [latestSites, setLatestSites] = useState([]);
  const [mostUsed, setMostUsed] = useState([]);
  const [book,setbook] = useState([]);

  useEffect(() => {
  const fetchSites = async () => {
    // Récupération des nouveautés
    const { data: latestData, error: latestError } = await supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12);

    if (latestError) {
      console.error("Erreur lors du chargement des nouveautés :", latestError);
    } else {
      setLatestSites(latestData);
    }

    // Récupération des sites les plus utilisés
    const { data: mostUsedData, error: mostUsedError } = await supabase
      .from('sites')
      .select('*')
      .order('compte', { ascending: false })
      .limit(8);

    if (mostUsedError) {
      console.error("Erreur lors du chargement des sites les plus utilisés :", mostUsedError);
    } else {
      setMostUsed(mostUsedData);
    }

    //recup book

    const {data: bookData, error: bookError } = await supabase
       .from('books')
       .select('*')
       .limit(8);

       if (bookError){
        console.error('no book');
       } else {
        setbook(bookData);
       }
  };

  fetchSites();
}, []);



  return (
    <div className='h-full  flex flex-col min-w-3 text-white rounded-sm gap-y-4 overflow-scroll scrollbar-hide bg-transparent p-3'>
        <HeroBanner image="/assets/image/glass.gif" />

        {/* Most used*/}

        <div className='flex flex-col p-4 gap-y-4 bg-black'>
  <div className='flex justify-between'>
    <h3>Most used</h3>
  </div>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
    {mostUsed.map((site) => (
      <Card key={site.id} site={site} />
    ))}
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
             <h3>Livres</h3>
             <h6 onClick={() => setSelectedCategory("Livres")} className='hover:underline cursor-pointer ' >Tout voir</h6>
        </div>
          <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5  gap-4'> 
         {book.map((book) => (
      <Book key={book.id} book={book} />
    ))}
          </div>
       
        </div>

        

         {/* Nouveauté */}
          <div className='flex flex-col p-4 gap-y-4'>
        <div className='flex justify-between'>
             <h3>Podcast</h3>
             <a className='hover:underline cursor-pointer ' href="https://youtube.com/playlist?list=PLoWhlSwYg0GYtuPxLXtV5-64XWwo2_mZa&si=XizjQUtEmNIoiqLV" target="_blank" rel="noopener noreferrer"><h6 >Tout voir</h6></a>
        </div>
 
        <div className='flex p-2 justify-between '> <iframe
  className='aspect-video w-full pr-4'
  src="https://www.youtube.com/embed/xguam0TKMw8"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
 <div className='hidden md:flex flex-col justify-between w-96 '>

<iframe
  className='aspect-video w-full'
  src="https://www.youtube.com/embed/30pxmKvkzFM"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe><iframe
  className='aspect-video w-full'
  src="https://www.youtube.com/embed/c2sNTAaILdA"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe><iframe
  className='aspect-video w-full'
  src="https://www.youtube.com/embed/ND_AjF_KTD8"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>


 </div> </div>
    
        </div>
    </div>
  );
}


