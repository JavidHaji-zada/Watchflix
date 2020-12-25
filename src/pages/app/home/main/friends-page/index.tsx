import React, { HTMLAttributes, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

//import { APP_STYLES } from "../../../../shared/styles";

function Friends(): JSX.Element {
    return(
        <div>
            <div className="row" style={{ color: "#808080" }}>
                <div className="col py-3 px-lg-5 border bg-light"> Lily Mean Aldrin</div>
                <div className="col py-3 px-lg-5 border bg-light">Marshal Erikson</div>
                <div className="w-100"></div>
                <div className="col py-3 px-lg-5 border bg-light">Ted Loser Mosby</div>
                <div className="col py-3 px-lg-5 border bg-light">Barney Kasar Stinson</div>
                <div className="w-100"></div>
                <div className="col py-3 px-lg-5 border bg-light">Robin Scherbatsky</div>
                <div className="col py-3 px-lg-5 border bg-light">Blitz</div>
            </div>
        </div>
    )
}

export default Friends;
