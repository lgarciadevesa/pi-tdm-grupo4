import React, { Component } from 'react';
import Buscador from '../../components/Buscador/Buscador';
import Seccion from '../../components/Seccion/Seccion';
import { useState, useEffect } from 'react';

function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
 
useEffect(() => {
    const apiKey = '6b6cb210c82c48fac559ee907885a2e9';

    // Películas populares
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey)
      .then(res => res.json())
      .then(data => {
        setPeliculas(data.results.filter((item, idx) => idx < 4));
      })
      .catch(err => console.log(err));

    // Series populares
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey)
      .then(res => res.json())
      .then(data => {
        setSeries(data.results.filter((item, idx) => idx < 4));
      })
      .catch(err => console.log(err));
  })


    if (
      peliculas.length === 0 ||
      series.length === 0
    ) {
      return (
        <main>
          <div className="text-center my-5">
            <p>Cargando...</p>
          </div>
        </main>
      );
    }
    return (
      <main>
        <Buscador />

        <Seccion
          titulo="Películas populares"
          color="alert-primary"
          tipo="pelicula"
          clase="single-card-movie"
          items={peliculas}
          rutaVerTodas="/peliculas"
        />

        <Seccion
          titulo="Series populares"
          color="alert-warning"
          tipo="serie"
          clase="single-card-tv"
          items={series}
          rutaVerTodas="/series"
        />
      </main>
    );
  
}


export default Home;
