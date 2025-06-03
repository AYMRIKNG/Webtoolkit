import React, { useState, useEffect } from 'react';
import CardMini from './cardmobile';
import { supabase } from '../../supabaseClient';

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sites, setSites] = useState([]);

  const fetchLatestSites = async () => {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Erreur récupération derniers sites :', error);
    } else {
      setSites(data);
    }
  };

  const fetchSearchResults = async (query) => {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .ilike('name', `${query}%`) // cherche les titres commençant par query
      .limit(10);

    if (error) {
      console.error('Erreur recherche sites :', error);
    } else {
      setSites(data);
    }
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      fetchLatestSites();
    } else {
      fetchSearchResults(inputValue);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  return (
    <div
      className="w-72 relative"
      onMouseLeave={() => setIsOpen(false)}
    >
      <input
        className="w-full p-1 px-3 text-white bg-black border-[1px] rounded-sm border-zinc-800 outline-none focus:border-lime-300"
        type="search"
        placeholder="Chercher un site web"
        value={inputValue}
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
      />

      {isOpen && (
        <div className="flex flex-col bg-black min-h-72 gap-y-1 border-[1px] border-zinc-800 p-2 border-t-0 rounded-br-sm rounded-bl-sm w-96 absolute z-10 top-full left-0 overflow-auto max-h-96">
          {sites.length > 0 ? (
            sites.map(site => (
              <CardMini key={site.id} site={site} />
            ))
          ) : (
            <p className="text-zinc-400 italic p-2">Aucun site trouvé</p>
          )}
        </div>
      )}
    </div>
  );
}
