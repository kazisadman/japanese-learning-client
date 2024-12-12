import { Link } from "react-router-dom";
import { TData } from "../pages/Lessons";

export type TCard = {
  data: TData;
};

const LessonCard: React.FC<TCard> = ({ data }) => {
  const { name, number } = data;
  return (
    <Link to={`/lessons/${number}`}>
      <div className="card bg-primaryColor text-white w-[500px]">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;
