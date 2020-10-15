import React from "react";
import Navigation from "./navigation";

function Proposal(): JSX.Element {
	return (
		<div>
			<iframe
				style={{ width: "100%", height: "100%", marginTop: 80 }}
				src={require("../assets/reports/proposal.pdf")}
			></iframe>
		</div>
	);
}

export default Proposal;
