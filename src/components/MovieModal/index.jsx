import React, { useRef, useState } from "react";
import "./MovieModal.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { CgCloseR } from "react-icons/cg";
import YouTube from "react-youtube";

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
    movie,
}) {
    const ref = useRef();
    const [isClicked, setIsClicked] = useState(false);

    useOnClickOutside(ref, () => {
        setModalOpen(false);
    });
    if (!isClicked) {
        return (
            <div className="presentation">
                <div className="wrapper_modal">
                    <div className="modal" ref={ref}>
                        <span
                            onClick={() => setModalOpen(false)}
                            className="modal_close"
                        >
                            <CgCloseR size="24" />
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

                            <h2 className="modal_title">
                                {title ? title : name}
                            </h2>
                            <p className="modal_overview">{overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="modal_containner">
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
            </div>
        );
    }
}
