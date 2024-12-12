import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import VocabularyCard from "../components/VocabularyCard";
import Paginarion from "../components/Paginarion";

const Vocabulary = () => {
  const [data, setData] = useState([]);
  const { lesson_no } = useParams();

  const [cureentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 1;

  useEffect(() => {
    axiosInstance
      .get(`/lesson/${lesson_no}`)
      .then((data) => setData(data.data.data[0].words))
      .catch((err) => console.log(err));
  }, [lesson_no]);

  const lastPostIndex = cureentPage * postPerPage;
  const fistPostIndex = lastPostIndex - postPerPage;
  const cureentPosts = data.slice(fistPostIndex, lastPostIndex);

  return (
    <div className="font-outFit max-w-[1440px] mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-3 items-center">
          {cureentPosts?.map((item) => (
            <VocabularyCard key={item?._id} data={item}></VocabularyCard>
          ))}

          <Paginarion
            totalPosts={data.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          ></Paginarion>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
