import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Reports from "./pages/landing/reports/index";
import Header from "./pages/landing/header";
import About from "./pages/landing/about";
import Team from "./pages/landing/team";
import Design from "./pages/landing/reports/design";
import Proposal from "./pages/landing/reports/proposal";
import Home from "./pages/app/home";
import Login from "./pages/app/login";
import Register from "./pages/app/register";
import MovieDetails from "./pages/app/home/main/product-details";

function App(): JSX.Element {
	return (
		<Router>
			<Switch>
				<Route
					excat path='/app'
					component={Home}
				/>
				<Route
					exact path='/browse/:id'
					component={MovieDetails}
				/>
				<Route
					excat path='/login'
					component={Login}
				/>
				<Route
					excat path='/register'
					component={Register}
				/>
				<Route path=''>
					<Header />
					<About />
					<Team />
					<Reports />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
