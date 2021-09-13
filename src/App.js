import styles from './App.module.css';
import { Route, Switch } from 'react-router';
import Header from './components/presentational/Header/Header';
import Landing from './components/presentational/Landing/Landing';
import AuthorizedRouteManager from './components/container/AuthorizedRouteManager/AuthorizedRouteManager';
import CatalogComponent from './components/container/CatalogComponent/CatalogComponent';
import ErrorsDisplay from './components/container/ErrorsDisplay/ErrorsDisplay';

function App() {
  return (
    <section className="App">
      <Header />
      <ErrorsDisplay />

      <Switch>
        <Route path='/catalog' component={CatalogComponent} />
        <Route path='/' component={Landing} />

        {/* <AuthorizedRouteManager path='/profile' component={Profile} /> */}
      </Switch>
    </section>
  );
}

export default App;
