import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    return (
        <nav className={`nav ${show && "nav_black"}`}>
            <img
                src="./Netflix_logo.png"
                alt="Netflix logo"
                className="nav_logo"
                onClick={() => window.location.reload()}
            />
            <input
                value={searchValue}
                onChange={handleChange}
                className="nav_input"
                type="text"
                placeholder="영화를 검색해주세요."
            />
            <img src="./user-64.png" alt="User logged" className="nav_avatar" />
        </nav>
    );
}
