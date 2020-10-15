import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navigation extends Component {
	render() {
		return (
			<nav id="menu" className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button
							type="button"
							className="navbar-toggle collapsed"
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
						>
							{" "}
							<span className="sr-only">Toggle navigation</span>{" "}
							<span className="icon-bar"></span>{" "}
							<span className="icon-bar"></span>{" "}
							<span className="icon-bar"></span>{" "}
						</button>
						<a className="navbar-brand page-scroll" href="./">
							Watchflix
						</a>
					</div>

					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav navbar-right">
							{/* <li>
								<a href="./#reports" className="page-scroll">
									Reports
								</a>
							</li> */}
							<li>
								<Link to="/proposal">Project Proposal</Link>
							</li>
							<li>
								<a href="./#about" className="page-scroll">
									About
								</a>
							</li>
							<li>
								<a href="./#team" className="page-scroll">
									Team
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navigation;
