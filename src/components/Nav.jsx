import React from "react";
import "./scss/Nav.scss";

export default function Nav() {
    return (
        <nav className="nav">
            <img
                src="./Netflix_logo.png"
                alt="Netflix logo"
                className="nav_logo"
                onClick={() => window.location.reload()}
            />
            <img src="./user-64.png" alt="User logged" className="nav_avatar" />
        </nav>
    );
}
