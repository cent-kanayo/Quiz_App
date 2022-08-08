import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchQuiz = async (url) => {
    setWaiting(false);
    setLoading(true);
    const resp = await axios(url).catch((error) => console.log(error));
    if (resp) {
      let data = resp.data.results;
      console.log(data);
      if (data.length > 1) {
        setQuestions(data);
        setWaiting(false);
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };
  const changeQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldAns) => oldAns + 1);
    }

    changeQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = input.amount;
    let category = input.category;

    let difficulty = input.difficulty;
    const tempUrl = `https://opentdb.com/api.php?amount=${amount}&
    category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuiz(tempUrl);
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        input,
        changeQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
