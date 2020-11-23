import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Reports from "./pages/reports/index";
import Header from "./pages/header";
import About from "./pages/about";
import Team from "./pages/team";
import Design from "./pages/reports/design";
import Proposal from "./pages/reports/proposal";

function App(): JSX.Element {
	return (
		<Router>
			<Header />
			<Route path=''>
				<About />
				<Team />
				<Reports />
			</Route>
		</Router>
	);
}

export default App;
