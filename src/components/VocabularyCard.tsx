type TData = {
  word: string;
  pronunciation: string;
  when_to_say: string;
};

type TResponse = {
  data: TData;
};

const VocabularyCard: React.FC<TResponse> = ({ data }) => {
  const { word, pronunciation, when_to_say } = data;

  const handlePronunciation = () => {
    const value = new SpeechSynthesisUtterance(word);
    value.lang = "ja-JP";
    window.speechSynthesis.speak(value);
  };
  return (
    <div
      className="card bg-primaryColor text-white w-96 cursor-pointer"
      onClick={handlePronunciation}
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">{word}</h2>
        <p>{pronunciation}</p>
        <p>{when_to_say}</p>
      </div>
    </div>
  );
};

export default VocabularyCard;
