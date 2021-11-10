import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";
import Header from "./components/presentational/Header/Header";
import AuthorizedRouteManager from "./components/container/AuthorizedRouteManager/AuthorizedRouteManager";
import EventsDisplay from "./components/container/EventsDisplay/EventsDisplay";
import PreloaderDisplay from "./components/container/PreloaderDisplay/PreloaderDisplay";
import Footer from "./components/presentational/Footer/Footer";
import CookieDisplay from "./components/container/CookieDisplay/CookieDisplay";
import Preloader from "./components/presentational/Preloader/Preloader";

const BusinessPlanDisplay = lazy(() =>
	import("./components/container/BusinessPlanDisplay/BusinessPlanDisplay")
);
const CatalogComponent = lazy(() =>
	import("./components/container/CatalogComponent/CatalogComponent")
);
const Terms = lazy(() => import("./components/presentational/Terms/Terms"));
const AuthDisplay = lazy(() =>
	import("./components/container/AuthDisplay/AuthDisplay")
);
const Landing = lazy(() =>
	import("./components/presentational/Landing/Landing")
);
const ProfileDisplay = lazy(() =>
	import("./components/container/ProfileDisplay/ProfileDisplay")
);
const ProfileRedirect = lazy(() =>
	import("./components/container/ProfileRedirect/ProfileRedirect")
);
const NewPlanDisplay = lazy(() =>
	import("./components/container/NewPlanDisplay/NewPlanDisplay")
);
const EditPlanDisplay = lazy(() =>
	import("./components/container/EditPlanDisplay/EditPlanDisplay")
);
const InvalidRoute = lazy(() => import("./components/presentational/404/404"));

function App() {
	return (
		<section className="App">
			<Header />
			<PreloaderDisplay />

			<Suspense fallback={<section className={"sectionDimensioned"}></section>}>
				<Switch>
					<Route
						path="/plan/:planId/ed/:edId"
						component={BusinessPlanDisplay}
					/>
					<Route path="/catalog" component={CatalogComponent} />
					<Route path="/terms" component={Terms} />
					<Route path="/auth" component={AuthDisplay} />
					<Route exact path="/" component={Landing} />

					<AuthorizedRouteManager
						path="/profile/:userId/:plans"
						component={ProfileDisplay}
					/>
					<AuthorizedRouteManager
						path="/profile/:plans"
						component={ProfileRedirect}
					/>
					<AuthorizedRouteManager
						path="/newPlan"
						component={NewPlanDisplay}
					/>
					<AuthorizedRouteManager
						path="/editPlan/plan/:planId/ed/:edId/owner/:ownerId"
						component={EditPlanDisplay}
					/>

					<Route component={InvalidRoute} />
				</Switch>
			</Suspense>

			<Footer />
			<EventsDisplay />
			<CookieDisplay />
		</section>
	);
}

export default App;
