import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Book from '../ui/book';
import HeroBanner from '../ui/herobanner';
export default function BookPage({ category }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('books_categories')
        .select('*');
        
      if (error) {
        console.error('Erreur récupération catégories :', error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data, error } = await supabase.from('auteur').select('*');
      if (!error) setAuthors(data);
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
      .from('books')
      .select('*');

      if (error) {
        console.error('Erreur récupération books :', error);
      } else {
        setBooks(data);
      }

    };

    fetchBooks();
  },  [])

  return (
    <section className="text-white h-full overflow-scroll scrollbar-hide">   <div className='flex justify-end absolute right-0'>
 {/* Dropdown custom */}
      <div className="relative inline-block mb-4 ">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-4 py-2 rounded bg-transparent text-white gap-4 flex text-right"
        >
          {selectedAuthor ? selectedAuthor.name : 'Tous les auteurs '}
           <img
            className={`h-4 cursor-pointer self-center mt-1 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
            src="/assets/image/arrowdown.png"
            alt=""
          />
        </button>
         
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-56 bg-black rounded shadow-lg z-10 text-white">
            <li
              onClick={() => {
                setSelectedAuthor(null);
                setDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-zinc-800 cursor-pointer text-right"
            >
              Tous les auteurs
            </li>
            {authors.map((author) => (
              <li
                key={author.id}
                onClick={() => {
                  setSelectedAuthor(author);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-zinc-800 text-zinc-300 text-right cursor-pointer"
              >
                {author.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      </div>
      <HeroBanner image="/assets/image/book.gif" />
   

     
 {categories.map((category) => (

          <div key={category.id} className="flex flex-col mb-6 p-4 gap-y-4 text-white">
          <div className="flex justify-between items-center ">
            <h3 className=" font-semibold">{category.name}</h3>
    
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
               {books
      .filter((book) => book.category === category.id) // <-- ici c'est .category, pas .category_id
      .filter((book) => !selectedAuthor || book.author_id === selectedAuthor.id)
      .map((book) => (
        <Book key={book.id} book={book} />
    ))}

          </div>
        </div>

        ))}
     
    </section>
  );
}
