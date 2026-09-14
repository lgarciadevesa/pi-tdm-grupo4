import Card from '../Card/Card';

function Seccion(props) {
  return (
    <div>
      <h2 className={'alert ' + props.color}>{props.titulo}</h2>
      <section className="row cards">
        {props.items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            tipo={props.tipo}
            titulo={props.tipo === 'pelicula' ? item.title : item.name}
            imagen={'https://image.tmdb.org/t/p/w342' + item.poster_path}
            descripcion={item.overview}
            clase={props.clase}
          />
        ))}
      </section>
    </div>
  );
}

export default Seccion;
