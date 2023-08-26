import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setMovies(defaultMovies);
      return;
    }
    const formattedQuery = encodeURIComponent(searchQuery);
    // const asdas= onbeforeunload/
    
    const getMovieReq = async () => {
      try {
        const url = `https://www.omdbapi.com/?s=${formattedQuery}&apikey=82173918`;
        const resp = await fetch(url);
        const respJson = await resp.json();

        if (respJson.Search) {
          setMovies(respJson.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getMovieReq();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Default list of movies
  const defaultMovies = [
    {
      imdbID: "1",
      Title: "Default Movie 1",
      Poster: "default-movie1.jpg",
      Runtime: "120 min",
      Year: "2023",
      Plot: "This is a default movie plot.",
    },
    {
      imdbID: "2",
      Title: "Default Movie 2",
      Poster: "default-movie2.jpg",
      Runtime: "110 min",
      Year: "2023",
      Plot: "This is another default movie plot.",
    },
  ];

  return (
    <>
      <div className="w-full h-20 bg-gray-300 flex flex-row items-center justify-between px-12">
        <h1 className="text-2xl font-semibold">Movise</h1>
        <input
          className="active:flex-shrink rounded py-2 px-3 w-1/2 transition-transform duration-500 ease-in-out transform hover:scale-105"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {movies.length === 0
              ? // Display default movies when there are no search results
                defaultMovies.map((movie) => (
                  <div key={movie.imdbID} className="xl:w-1/4 md:w-1/2 p-4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <img
                        className="h-64 rounded w-full object-cover object-center mb-6"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                        {movie.Title}
                      </h2>
                      <p className="text-green-600 text-xs mb-2">PG-13</p>
                      <p className="text-gray-400 text-xs mb-2">
                        Runtime: {movie.Runtime}
                      </p>
                      <p className="text-gray-400 text-xs mb-2">
                        Release Date: {movie.Year}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Description: {movie.Plot}
                      </p>
                    </div>
                  </div>
                ))
              : movies.map((movie) => (
                  <div key={movie.imdbID} className="xl:w-1/4 md:w-1/2 p-4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <img
                        className="h-64 rounded w-full object-cover object-center mb-6"
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                        {movie.Title}
                      </h2>
                      <p className="text-green-600 text-xs mb-2">PG-13</p>
                      <p className="text-gray-400 text-xs mb-2">
                        Runtime: {movie.Runtime}
                      </p>
                      <p className="text-gray-400 text-xs mb-2">
                        Release Date: {movie.Year}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Description: {movie.Plot}
                      </p>
                    </div>
                    {/* <button on></button> */}
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
