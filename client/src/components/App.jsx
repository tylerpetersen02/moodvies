import React, { useEffect, useState } from "react";
import axios from "axios";
import Posters from "./Posters.jsx";
import Genres from "./Genres.jsx";
import key from "../../../config.js";

const App = (props) => {
  const [genrePosters, setGenrePosters] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [moviePoster, setMoviePoster] = useState("");
  const [onlyFaves, setOnlyFaves] = useState(false);
  const [currentFav, setCurrentFav] = useState("");
  const [favMovies, setFavMovies] = useState([]);
  const [noGenres, setNoGenres] = useState(true);
  const [noMovies, setNoMovies] = useState(true);
  const [userName, setUserName] = useState("");
  const [genreId, setGenreId] = useState(28);
  let movies = [];
  let genres = [];

  // Gets all movie genres
  axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key.KEY}&language=en-US`
    )
    .then((response) => {
      genres = response.data.genres;
      if (noGenres) {
        setMovieGenres(genres);
        setNoGenres(false);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  // Gets favorites list
  useEffect(() => {
    console.log('getting favorites')
    axios
      .get(`favs/${userName}`)
      .then((response) => {
        setFavMovies(response.data.favorites);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [userName, currentFav, onlyFaves]);

  // Gets all movies for one genre
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key.KEY}&with_genres=${genreId}`
      )
      .then((response) => {
        response.data.results.forEach((movie) => {
          movies.push("https://image.tmdb.org/t/p/w300" + movie.poster_path);
        });
        setGenrePosters(movies);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [genreId]);

  // Creates new user object
  useEffect(() => {
    let currFav = favMovies || [];
    let newUserObj = {
      userName: userName,
      favorites: currFav,
    };

    if (userName && !loginModal) {
      axios
        .post(`/favs/${userName}`, newUserObj)
        .then((response) => {
          console.log("post received");
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }, [loginModal]);

  // Update user favorites list
  useEffect(() => {
    console.log("Movie added to favorites list!");
    let updatePerson = {
      userName: userName,
      favorites: currentFav,
    };

    axios
      .post("/favs", updatePerson)
      .then((response) => {
        console.log("post received");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

  }, [currentFav]);

  const handleGenreChange = (val) => {
    setGenreId(val);
  };

  const showModalHandler = (e) => {
    setLoginModal(!loginModal);
  };

  const handleFavLogin = (e) => {
    setUserName(e);
  };

  const handleLogin = (e) => {
    const userNameText = e.target.value;
    setUserName(userNameText);
  };

  const handleFavItem = (str) => {
    setCurrentFav(str);
  };

  const handleOnlyFaves = (str) => {
    setOnlyFaves(true);
  };

  const handleOnlyFavesfalse = (str) => {
    setOnlyFaves(false);
  };

  return (
    <div>
      <div className="nav">
        <div className="nav_list">
          <ul className="nav_items">
            <li>SEARCH</li>
            <li onClick={handleOnlyFaves}>FAVORITES</li>
            {!userName && <li onClick={showModalHandler}>LOGIN</li>}
            {userName && (
              <li onClick={showModalHandler}>{userName.toUpperCase()}</li>
            )}
          </ul>
        </div>
      </div>
      <h1>Moodvies</h1>

      <div className="genre_container">
        {movieGenres?.map((genre, i) => {
          return (
            <Genres
              key={i}
              handleOnlyFaves={handleOnlyFavesfalse}
              genre={genre}
              changeId={handleGenreChange}
            />
          );
        })}
      </div>

      {!onlyFaves && (
        <div className="movie_container">
          {genrePosters?.map((posterURL, i) => {
            return (
              <Posters
                key={i}
                userName={userName}
                handleFavItem={handleFavItem}
                handleFavLogin={handleFavLogin}
                posterURL={posterURL}
              />
            );
          })}
        </div>
      )}
      {onlyFaves && (
        <div className="movie_container">
          {favMovies?.map((posterURL, i) => {
            return (
              <Posters
                key={i}
                userName={userName}
                onlyFaves={onlyFaves}
                handleFavItem={handleFavItem}
                handleFavLogin={handleFavLogin}
                posterURL={posterURL}
              />
            );
          })}
        </div>
      )}

      {loginModal && (
        <div className="darken_bg">
          <div className="modal">
            <div onClick={showModalHandler} className="exit_X">
              ✖
            </div>
            <h2>Welcome Back!</h2>
            <label>Please enter your username:</label>
            <input
              onChange={handleLogin}
              className="modal_input"
              maxLength="20"
            ></input>
            <button
              type="button"
              onClick={showModalHandler}
              className="modal_button"
            >
              LOG IN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
