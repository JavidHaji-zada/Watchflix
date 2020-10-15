import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./navigation";
import Header from "./header";
import Reports from "./reports";
import About from "./about";
import Team from "./team";
import JsonData from "../data/data.json";

export class Home extends Component {
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
					<div>
						<Header data={this.state.landingPageData.Header} />
						{/* <Reports /> */}
						<About data={this.state.landingPageData.About} />
						<Team data={this.state.landingPageData.Team} />
					</div>
				</div>
			</Router>
		);
	}
}

export default Home;
