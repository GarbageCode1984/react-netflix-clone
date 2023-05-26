import React, { useRef } from "react";
import "./MovieModal.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export default function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen,
    adult,
    popularity,
}) {
    const ref = useRef();

    useOnClickOutside(ref, () => {
        setModalOpen(false);
    });
    return (
        <div className="presentation">
            <div className="wrapper_modal">
                <div className="modal" ref={ref}>
                    <span
                        onClick={() => setModalOpen(false)}
                        className="modal_close"
                    >
                        X
                    </span>
                    <img
                        className="modal_poster_img"
                        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                        alt="modal_poster_img"
                    />
                    <div className="modal_content">
                        <p className="modal_details">
                            {release_date ? release_date : first_air_date}
                        </p>
                        <span className={adult ? "r-rated" : "g-rated"}>
                            {adult ? "🔺R-rated" : "✔️G-rated"}
                        </span>
                        <span> 👥{popularity}</span>
                        <span className="modal_overview">
                            {" "}
                            👍{vote_average}
                        </span>
                        <h2 className="modal_title">{title ? title : name}</h2>
                        <p className="modal_overview">{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
