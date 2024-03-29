
import React, { useState, useEffect } from 'react';
import Anime from '../../components/anime/Anime';


function allAnime() {
  const [animes, setAnimes] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch animes data from backend API
    const getAnimes = async () => {
        try {
            const response = await fetch('/anime');
            console.log(response)
           
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setAnimes(data);
        } catch (error) {
            console.error('Error fetching anime: ', error);
        }
    };

    getAnimes();

    

    //Fetch genres data from backend API
    const getGenres = async () => {
      try {
        
        const response = await fetch('/genre');
        console.log(response)
        

        const data = await response.json()
      
        console.log('data: ', data);
        if (data.error) {
          throw new Error(data.error);
        }
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genre: ', error);
      }
    }

    getGenres();
   
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(animes);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = animes.filter(anime =>
      anime.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  }

  const [genreTerm, setGenreTerm] = useState('');
  const [filteredGenreData, setFilteredGenreData] = useState(animes);

  const handleGenre = (event) => {
    const genre = event.target.value;
    setGenreTerm(genre);
    const filtered = animes.filter(anime => 
      anime.genres.toLowerCase().includes(genre.toLowerCase())
    );
    setFilteredGenreData(filtered);
  }

  return (
    
    <div className=" px-6 m-2 py-8 bg-slate-400">
        <div className='flex justify-between border border-lime-400 px-2 py-2'>
        <h1 className="text-3xl font-semibold text-black     ">Streaming Now</h1>

        <input
        className='border border-lime-400 px-2 py-2 rounded-md w-1/4'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        />
        
        
        </div>
        <div className="w-full max-w-md mx-auto">
          <select id="mySelect" name="mySelect" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" onChange={handleGenre}>
            <option value="">Select Genre</option>
            {genres.map(genre=>(
              <option key={genre._id} value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>

       
        <div className="flex flex-wrap -mx-4">
        {searchTerm === '' && genreTerm === '' && animes.map(anime => (
          <Anime key={anime._id} anime={anime} />
        ))}
        {searchTerm === '' && genreTerm !== '' && filteredGenreData.map((anime) => (
          <Anime key={anime._id} anime={anime} />
        ))}
        {searchTerm !== '' && filteredData.map((anime) => (
          <Anime key={anime._id} anime={anime} />
        ))}
      </div>
      
    </div>
    
  );
}

export default allAnime;






// import React, { useState, useEffect } from 'react';
// import Anime from '../../components/anime/Anime';


// function allAnime() {
//   const [animes, setAnimes] = useState([]);

//   useEffect(() => {
//     // Fetch animes data from backend API
//     const getAnimes = async () => {
//         try {
//             const response = await fetch('/anime');
//             const data = await response.json()
//             console.log('data: ', data);
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             setAnimes(data);
//         } catch (error) {
//             console.error('Error fetching anime: ', error);
//         }
//     };

//     getAnimes();

   
//   }, []);


//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState(animes);

//   const handleSearch = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);
//     const filtered = animes.filter(anime =>
//       anime.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }

  



//   return (
    
//     <div className=" px-6 m-2 py-8 bg-slate-400">
//         <div className='flex justify-between border border-lime-400 px-2 py-2'>
//         <h1 className="text-3xl font-semibold text-black     ">Streaming Now</h1>

//         <input
//         className='border border-lime-400 px-2 py-2 rounded-md w-1/4'
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//         />
        
        
//         </div>

//         <div>
//             HELLO

//         </div>
      
//         <div className="flex flex-wrap -mx-4">
//         {searchTerm === '' ? animes.map(anime => (
//           <Anime key={anime._id} anime={anime} />
//         )): filteredData.map((anime) => (
//           <Anime key={anime._id} anime={anime} />
//         ))}
//       </div>
      
//     </div>
    
//   );
// }

// export default allAnime;
