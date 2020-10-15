import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/navigation";
import Header from "./components/header";
import Reports from "./components/reports";
import About from "./components/about";
import Services from "./components/services";
import Gallery from "./components/gallery";
import Testimonials from "./components/testimonials";
import Team from "./components/team";
import Home from "./components/home";
import Contact from "./components/contact";
import JsonData from "./data/data.json";
import Proposal from "./components/proposal";

export class App extends Component {
	state = {
		landingPageData: {},
	};
	getlandingPageData() {
		this.setState({ landingPageData: JsonData });
	}

	componentDidMount() {
		this.getlandingPageData();
	}

	render() {
		return (
			<Router>
				<div>
					<Navigation />
					{/* <div>
						<Navigation />
						<Header data={this.state.landingPageData.Header} />
						<Reports />
						<About data={this.state.landingPageData.About} />
						<Team data={this.state.landingPageData.Team} />
					</div> */}
					{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
					<Switch>
						<Route path="/proposal.pdf">
							{/* <About /> */}
							<Proposal />
						</Route>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

function Users() {
	return <h2>Users</h2>;
}

export default App;
