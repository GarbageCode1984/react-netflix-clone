import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function DetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchdata() {
            const request = await axios.get(`/movie/${movieId}`);
            setMovie(request.data);
        }
        fetchdata();
    }, [movieId]);

    if (!movie) return <div>...loading</div>;

    return (
        <section>
            <img
                className="modal_poster_img"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="poster"
            />
        </section>
    );
}
