import React, { useEffect } from "react";
import axios from "../api/axios";

export default function Row({ title, id, fetchUrl, isLargeRow }) {
    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        console.log(request);
    };

    return <div>Row</div>;
}
