import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import loading from "../loading.gif";
import { filmTypes } from "../filmTypes";
import axios from "axios";
import "./styles/Results.css";
import { Button } from "react-bootstrap";
import Result from "../components/Result";

const Results = () => {
  const location = useLocation();
  const imdb = location.state.imdb;
  const mood = location.state.mood;
  const latitude = location.state.coordinate.latitude;
  const longitude = location.state.coordinate.longitude;
  const [weatherData, setWeatherData] = useState();
  const [movieData, setMovieData] = useState();
  const [filmType, setFilmType] = useState();
  const [randomMovie, setRandomMovie] = useState();
  const [randomMoviePage, setRandomMoviePage] = useState(() => {
    return Math.floor(Math.random() * 20);
  });
  const [totalPagesFound, setTotalPagesFound] = useState(() => {
    return Math.floor(Math.random() * 20);
  });
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  const MOVIE_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&&vote_average.gte=${imdb}&with_genres=${filmType}`;
  const MOVIE_API_URL_RANDOM_PAGE = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&&page=${randomMoviePage}&vote_average.gte=${imdb}&with_genres=${filmType}`;
  const date = new Date();
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const getRandomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };
  const checkTime = () => {
    if (
      time >= "00:00" &&
      time <= "06:00" &&
      (mood == 1 || mood == 2 || mood == 3 || mood == 4)
    ) {
      let items = [
        filmTypes.ADVENTURE,
        filmTypes.COMEDY,
        filmTypes.FAMILY,
        filmTypes.FANTASY,
        filmTypes.MUSIC,
        filmTypes.ROMANCE,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "00:00" &&
      time <= "06:00" &&
      (mood == 5 || mood == 6 || mood == 7 || mood == 8)
    ) {
      let items = [
        filmTypes.ACTION,
        filmTypes.COMEDY,
        filmTypes.DOCUMENTARY,
        filmTypes.FANTASY,
        filmTypes.HORROR,
        filmTypes.SCIENCE_FICTION,
        filmTypes.WAR,
        filmTypes.THRILLER,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "06:01" &&
      time <= "12:00" &&
      (mood == 1 || mood == 2 || mood == 3 || mood == 4)
    ) {
      let items = [filmTypes.COMEDY, filmTypes.FANTASY, filmTypes.TV_MOVIE];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "06:01" &&
      time <= "12:00" &&
      (mood == 5 || mood == 6 || mood == 7 || mood == 8)
    ) {
      let items = [
        filmTypes.ADVENTURE,
        filmTypes.COMEDY,
        filmTypes.FAMILY,
        filmTypes.FANTASY,
        filmTypes.MUSIC,
        filmTypes.ROMANCE,
        filmTypes.TV_MOVIE,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "12:01" &&
      time <= "18:00" &&
      (mood == 1 || mood == 2 || mood == 3 || mood == 4)
    ) {
      let items = [
        filmTypes.ANIMATION,
        filmTypes.COMEDY,
        filmTypes.FAMILY,
        filmTypes.FANTASY,
        filmTypes.TV_MOVIE,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "12:01" &&
      time <= "18:00" &&
      (mood == 5 || mood == 6 || mood == 7 || mood == 8)
    ) {
      let items = [
        filmTypes.ACTION,
        filmTypes.CRIME,
        filmTypes.HORROR,
        filmTypes.SCIENCE_FICTION,
        filmTypes.THRILLER,
        filmTypes.WAR,
        filmTypes.WESTERN,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "18:01" &&
      time <= "23:59" &&
      (mood == 1 || mood == 2 || mood == 3 || mood == 4)
    ) {
      let items = [
        filmTypes.COMEDY,
        filmTypes.DOCUMENTARY,
        filmTypes.FAMILY,
        filmTypes.SCIENCE_FICTION,
        filmTypes.TV_MOVIE,
        filmTypes.ROMANCE,
      ];
      setFilmType(getRandomItem(items));
    } else if (
      time >= "18:01" &&
      time <= "23:59" &&
      (mood == 5 || mood == 6 || mood == 7 || mood == 8)
    ) {
      let items = [
        filmTypes.COMEDY,
        filmTypes.ACTION,
        filmTypes.CRIME,
        filmTypes.SCIENCE_FICTION,
        filmTypes.HORROR,
        filmTypes.MYSTERY,
        filmTypes.THRILLER,
        filmTypes.WAR,
        filmTypes.WESTERN,
      ];
      setFilmType(getRandomItem(items));
    }
  };
  var getRandomMovieIndex = () => {
    const randomMovie = Math.floor(Math.random() * 20);
    setRandomMovie(randomMovie);
  };
  const getWeatherData = async () => {
    const result = await axios.get(WEATHER_API_URL);
    setWeatherData(result.data);
  };
  const getRandomMoviePage = () => {
    getRandomMovieIndex();
    let randomPage;
    if (totalPagesFound > 500) {
      randomPage = Math.floor(Math.random() * 500);
    } else {
      randomPage = Math.floor(Math.random() * totalPagesFound);
    }
    setRandomMoviePage(randomPage);
  };
  const getMovieData = async () => {
    const result = await axios
      .get(MOVIE_API_URL)
      .then((res) => {
        setTotalPagesFound(res.data.total_pages);
        getRandomMoviePage();
        setMovieData(null);
        axios
          .get(MOVIE_API_URL_RANDOM_PAGE)
          .then((res) => {
            setMovieData(res.data.results);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    return result;
  };

  useEffect(() => {
    checkTime();
    getWeatherData();
    getMovieData();
  }, []);

  return (
    <div className="wrapper-result">
      {weatherData && <Result result={weatherData} />}
      <Button onClick={() => getMovieData()}>Random Movie</Button>
      {movieData && (
        <p id="movie-imdb">{movieData[randomMovie].vote_average}</p>
      )}
      {movieData && <p id="movie-title">{movieData[randomMovie].title}</p>}
      {movieData && (
        <img
          src={`https://image.tmdb.org/t/p/w400${movieData[randomMovie].poster_path}`}
          id="poster"
          alt="Poster is not found!"
        />
      )}
      {!movieData && <img src={loading} id="loading-gif" alt="loading" />}
    </div>
  );
};
export default Results;
