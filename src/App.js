import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/" exact={true} component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
