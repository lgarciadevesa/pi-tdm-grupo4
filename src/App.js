import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Peliculas from './pages/Peliculas/Peliculas';
import Series from './pages/Series/Series';
import Detalle from './pages/Detalle/Detalle';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from './components/NotFound/NotFound';

  
function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/peliculas" component={Peliculas} />
        <Route path="/series" component={Series} />
        <Route path="/detalle/pelicula/:id" component={Detalle} />
        <Route path="/detalle/serie/:id" component={Detalle} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
