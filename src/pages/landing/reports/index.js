import React from "react";
import design from "../../../assets/reports/design.pdf";
import proposal from "../../../assets/reports/proposal.pdf";

function Reports() {
	return (
		<div id="reports" className="container">
			<h1>Reports</h1>
			<a href={proposal}>Proposal Report</a>
			<br />
			<a href={design}>Design Report</a>
		</div>
	);
}

export default Reports;
