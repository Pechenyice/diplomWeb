import styles from './App.module.css';
import { Route, Switch } from 'react-router';
import Header from './components/presentational/Header/Header';
import Landing from './components/presentational/Landing/Landing';
import AuthorizedRouteManager from './components/container/AuthorizedRouteManager/AuthorizedRouteManager';
import CatalogComponent from './components/container/CatalogComponent/CatalogComponent';
import ErrorsDisplay from './components/container/ErrorsDisplay/ErrorsDisplay';
import InvalidRoute from './components/presentational/404/404';
import BusinessPlanDisplay from './components/container/BusinessPlanDisplay/BusinessPlanDisplay';
import AuthDisplay from './components/container/AuthDisplay/AuthDisplay';

function App() {
  return (
    <section className="App">
      <Header />
      <ErrorsDisplay />

      <Switch>
        <Route path='/plan/:planId/ed/:edId' component={BusinessPlanDisplay} />
        <Route path='/catalog' component={CatalogComponent} />
        <Route path='/auth' component={AuthDisplay} />
        <Route exact path='/' component={Landing} />

        <AuthorizedRouteManager path='/profile' component={Header} />
        <AuthorizedRouteManager path='/newPlan' component={Header} />

        <Route component={InvalidRoute} />
      </Switch>
    </section>
  );
}

export default App;
