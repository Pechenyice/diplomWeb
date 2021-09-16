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
import PreloaderDisplay from './components/container/PreloaderDisplay/PreloaderDisplay';
import NewPlanDisplay from './components/container/NewPlanDisplay/NewPlanDisplay';
import EditPlanDisplay from './components/container/EditPlanDisplay/EditPlanDisplay';
import ProfileDisplay from './components/container/ProfileDisplay/ProfileDisplay';
import ProfileRedirect from './components/container/ProfileRedirect/ProfileRedirect';

function App() {
  return (
    <section className="App">
      <Header />
      <ErrorsDisplay />
      <PreloaderDisplay />

      <Switch>
        <Route path='/plan/:planId/ed/:edId' component={BusinessPlanDisplay} />
        <Route path='/catalog' component={CatalogComponent} />
        <Route path='/auth' component={AuthDisplay} />
        <Route exact path='/' component={Landing} />

        <AuthorizedRouteManager path='/profile' component={ProfileRedirect} />
        <AuthorizedRouteManager path='/profile/:userId' component={ProfileDisplay} />
        <AuthorizedRouteManager path='/newPlan' component={NewPlanDisplay} />
        <AuthorizedRouteManager path='/editPlan/plan/:planId/ed/:edId/owner/:ownerId' component={EditPlanDisplay} />

        <Route component={InvalidRoute} />
      </Switch>
    </section>
  );
}

export default App;
