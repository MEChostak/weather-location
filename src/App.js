import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat,long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather",{
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt', 
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data)
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        Você precisar habilitar a localização no seu browser !!
      </Fragment>
    )
  } else if (weather === false ) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  }
  else {
    return (
      <Fragment>
        <h3> Clima nas suas Cordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura Atual: {weather['main']['temp']}º</li>
          <li>Temperatura Máxima: {weather['main']['temp_max']}º</li>
          <li>Temperatura Minima: {weather['main']['temp_min']}º</li>
          <li>Pressão: {weather['main']['pressure']}º hpa</li>
          <li>Umidade: {weather['main']['humidity']}º %</li>
        </ul>
      </Fragment>
    );
  }
}


export default App;
