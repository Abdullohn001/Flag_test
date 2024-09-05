import React, { useEffect, useState } from "react";

function App() {
  const [langs, setLangs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/quiz-product/quizzes")
      .then((response) => response.json())
      .then((data) => {
        const questions = data.data;

        for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        setLangs(questions);
        setCurrentQuestion(questions[0]);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSubmit = (ans) => {
    if (!isAnswered) {
      setSelectedAnswer(ans);
      setIsAnswered(true);
    }
  };

  return (
    <div className="p-10 flex mx-auto bg-blue-200 mt-[15%] border rounded-lg bg-natural h-[400px] w-[800px]">
      <h1 className="absolute text-3xl">Where does this flag belong ?</h1>
      {currentQuestion && (
        <div className="flex my-auto w-full gap-[100px]">
          <div className="w-[400px] h-full rounded-lg overflow-hidden mt-12 max-h-[300px]">
            <img src={currentQuestion.question} alt="flag" />
          </div>
          <div className="flex gap-12 flex-col">
            {currentQuestion.options.map((answ, index) => (
              <button
                onClick={() => handleSubmit(answ)}
                className={`text-xl h-10 border rounded-lg w-[250px] ${
                  selectedAnswer === answ
                    ? answ === currentQuestion.answer
                      ? "bg-green-300 "
                      : "bg-red-300 "
                    : "bg-yellow-200 "
                }`}
                key={index}
              >
                {answ}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
