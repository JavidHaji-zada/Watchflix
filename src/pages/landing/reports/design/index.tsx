import React from "react";

function Design(): JSX.Element {
	return (
		<div>
			<iframe
				style={{ width: "100%", height: "100%", marginTop: 80 }}
				src={require('../../../../assets/reports/design.pdf')}
			></iframe>
		</div>
	);
}

export default Design;