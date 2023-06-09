import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import axios from "../api/axios";
import "./Banner.css";
import styled from "styled-components";
import YouTube from "react-youtube";
import MovieModal from "./MovieModal";

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

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
            params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    console.log("movie", movie);
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
                        <button
                            className="banner_button info"
                            onClick={() => handleClick(movie)}
                        >
                            More Information
                        </button>
                    </div>
                    <h1 className="banner_description">
                        {truncate(movie?.overview, 100)}
                    </h1>
                </div>
                {modalOpen && (
                    <MovieModal
                        {...movieSelected}
                        setModalOpen={setModalOpen}
                    />
                )}
                <div className="banner_fadeBottom" />
            </header>
        );
    } else {
        return (
            <Container>
                <YouTube
                    videoId={movie.videos.results[0]?.key}
                    opts={{
                        width: "1500",
                        height: "800",
                        playerVars: {
                            autoplay: 1, //자동재생 O
                            rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                        },
                    }}
                    //이벤트 리스너
                    onEnd={(e) => {
                        e.target.stopVideo(0);
                    }}
                />
                <button
                    className="close_button"
                    onClick={() => setIsClicked(false)}
                >
                    close
                </button>
            </Container>

            /* <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="autoplay; fullscreen;"
                        allowfullscreen
                    ></Iframe>
                </HomeContainer>
            </Container> */
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
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;
