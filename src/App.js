import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    isModalOpen,
    questions,
    index,
    correct,
    changeQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];

  const answers = [...incorrect_answers, correct_answer];
  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className="btn-container">
            {shuffle(answers).map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="answer-btn"
                ></button>
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={() => changeQuestion()}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
