import React, { Component } from "react";
import { Link } from "react-router-dom";

export class reports extends Component {
	render() {
		return (
			<div id="reports" className="text-center">
				<div className="container">
					<div className="col-md-10 col-md-offset-1 section-title">
						<h2>Reports</h2>
					</div>
					<div className="row">
						<div className="col-xs-6 col-md-3">
							<Link to="/#/proposal">Link to our Project Proposal</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default reports;
