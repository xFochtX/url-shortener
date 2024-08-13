"use client";

import Image from "next/image";
import {useState, useRef} from 'react';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortURL, setShortURL] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Estoy al inicio del handle del botón');
    e.preventDefault();
    const currentInput = inputRef.current;
    if(!currentInput) return;
    const url = inputRef.current.value;
    console.log('Estoy antes del try del fetch');
    try {
      console.log('Estoy a punto de utilizar el fetch para llamar al api');
      const response = await fetch("/api/shortUrl",{
        method: 'POST',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify({url})
      })
      console.log('Ya salí del fetch y estoy recibiendo el response')
      const data = await response.json();
      console.log('Ya tengo la data convertida del fetch');
      setShortURL(data.shortUrl);
    } catch (error) {
      console.error('Error en el fetch', error);
    }
    console.log('Estoy después del fetch');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex flex-col items-center">
        <div className="flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/images/Focht.png"
            alt="Logo de Focht"
            width={150}
            height={150}
            priority
          />
        </div>
        <p className="mt-6 text-2xl font-bold text-center">
          Shorten your URLs here
        </p>
      </div>
 
      <div className="mt-8 w-full flex justify-center">
        <form onSubmit={handleSubmit} className="flex items-center w-4/5 max-w-2xl p-4 border rounded">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your URL here"
            className="flex-grow p-2 border rounded mr-2"
          />
          <button className="p-2 bg-blue-500 text-white rounded">
            Shorten
          </button>
        </form>
      </div>

      {shortURL && (
        <div className="mt-4 p-4 bg-gray-100 border rounded w-4/5 max-w-2xl text-center">
          <h2 className="text-xl font-semibold mb-2">Shortened URL</h2>
          <a
            href={shortURL}
            target="_blank"  // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer"  // Buenas prácticas para la seguridad
            className="text-blue-500 break-all cursor-pointer"
            style={{ cursor: 'pointer' }} // Cambia el cursor a una mano
          >
            {shortURL}
          </a>
        </div>
      )}
    </main>
  );
}

