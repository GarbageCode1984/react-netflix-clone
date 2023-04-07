import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const request = await axios.get(requests.fetchNowPlaying);

        const movieId =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;

        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            prams: { append_to_response: "vidoes" },
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    if (!isClicked) {
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }}
            >
                <div className="banner_contents">
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner_buttons">
                        <button
                            className="banner_button play"
                            onClick={() => setIsClicked(true)}
                        >
                            Play
                        </button>
                        <button className="banner_button info">
                            More Information
                        </button>
                    </div>
                    <h1 className="banner_description">
                        {truncate(movie?.overview, 100)}
                    </h1>
                </div>

                <div className="banner_fadeBottom" />
            </header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>clicked</HomeContainer>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Srlp8fAXz8c"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
`;
