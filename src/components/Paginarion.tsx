import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

type TData = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
};

const Paginarion: React.FC<TData> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width } = window.innerWidth;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const increamentPageNumber = () => {
    setPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, totalPages);
      setCurrentPage(nextPage);
      return nextPage;
    });
  };

  const decreamentPageNumber = () => {
    setPage((prevPage) => {
      const prev = Math.max(prevPage - 1, 1);
      setCurrentPage(prev);
      return prev;
    });
  };

  const completeBtn = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate("/lessons");
    }, 3000);
  };

  return (
    <div>
      {showConfetti && <ReactConfetti width={width}></ReactConfetti>}
      <div className="flex items-center gap-7">
        <button
          id="previousButton"
          className={`btn ${page === 1 ? "btn-disabled" : ""}`}
          onClick={decreamentPageNumber}
        >
          Previous
        </button>
        {page === totalPages && (
          <button className="btn" onClick={completeBtn}>
            Complete
          </button>
        )}
        <button
          id="nextButton"
          className={`btn ${page === totalPages ? "btn-disabled" : ""}`}
          onClick={increamentPageNumber}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginarion;
