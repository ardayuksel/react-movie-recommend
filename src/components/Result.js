const Result = ({ result }) => {
  return (
    <>
      <div className="weather-text-container">
        <p className="weather-celcius">{result.main.temp} &#8451;</p>
        <hr />
        <p className="weather-location-name">{result.name}</p>
      </div>
      <img
        className="img-weather"
        src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
      />
    </>
  );
};

export default Result;
