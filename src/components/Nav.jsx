import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    return (
        <nav className={`nav ${show && "nav_black"}`}>
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
