import Buscador from '../../components/Buscador/Buscador';
import Seccion from '../../components/Seccion/Seccion';

function Home() {

  let peliculas = [
    {
      id: 1061474,
      title: 'Superman',
      poster_path: '/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
      overview: 'Superman, un periodista de Metrópolis, emprende un viaje para reconciliar su herencia kryptoniana con su crianza humana como Clark Kent.'
    },
    {
      id: 911430,
      title: 'F1',
      poster_path: '/9PXZIUsSDh4alB80jheWX4fhZmy.jpg',
      overview: 'La leyenda de las carreras Sonny Hayes vuelve del retiro para liderar un equipo de Fórmula 1 en problemas y ser mentor de un joven piloto, mientras busca una última oportunidad de gloria.'
    },
    {
      id: 1083433,
      title: 'Sé lo que hicieron el verano pasado',
      poster_path: '/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg',
      overview: 'Cinco amigos provocan un accidente fatal y hacen un pacto para mantenerlo en secreto. Un año después, alguien que sabe lo que hicieron vuelve para vengarse.'
    },
    {
      id: 1078605,
      title: 'El club del crimen de los jueves',
      poster_path: '/tzrJulItjttxzoX0t3B2My46TS7.jpg',
      overview: 'Un grupo de jubilados apasionados por resolver casos sin cerrar se ve envuelto en un misterio de asesinato real en esta comedia policial.'
    }
  ];


  let series = [
    {
      id: 253106,
      name: 'The Terminal List: Dark Wolf',
      poster_path: '/9mYeRoWguq5etbwJRdF8BXFKiF.jpg',
      overview: 'Antes de The Terminal List, el Navy SEAL Ben Edwards se ve envuelto en las operaciones encubiertas de la CIA. Cuanto más se adentra en la zona gris, más difícil le resulta no ceder a sus impulsos más oscuros.'
    },
    {
      id: 157239,
      name: 'Alien: Earth',
      poster_path: '/yueXS3q8BtoWekcHOATFHicLl3e.jpg',
      overview: 'Cuando la misteriosa nave de investigación USCSS Maginot se estrella en la Tierra, Wendy y un grupo de soldados hacen un descubrimiento que los enfrenta a la mayor amenaza del planeta.'
    },
    {
      id: 110492,
      name: 'Peacemaker',
      poster_path: '/yb4F1Oocq8GfQt6iIuAgYEBokhG.jpg',
      overview: 'La historia continúa con Peacemaker, un superhéroe/supervillano vanidoso que cree en la paz a cualquier precio, sin importar a cuánta gente tenga que matar.'
    },
    {
      id: 86248,
      name: 'Upload',
      poster_path: '/6TPGDrU9MyWbn2TpggJphVAVXiq.jpg',
      overview: 'En 2033, las personas cercanas a la muerte pueden ser "subidas" a hoteles de realidad virtual. Nora trabaja en atención al cliente del lujoso Lakeview cuando el auto autónomo de Nathan choca y su novia lo sube permanentemente al mundo de Nora.'
    }
  ];

  return (
    <main>
      <Buscador />
      <Seccion
        titulo="Películas populares"
        color="alert-primary"
        tipo="pelicula"
        clase="single-card-movie"
        items={peliculas}
      />
      <Seccion
        titulo="Series populares"
        color="alert-warning"
        tipo="serie"
        clase="single-card-tv"
        items={series}
      />
    </main>
  );
}

export default Home;
