import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { input, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <section className="quiz quiz-small">
      <form className="setup-form">
        <h2>setup quiz</h2>
        {/* amount */}
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={input.amount}
            className="form-input"
            onChange={handleChange}
            min={1}
            max={50}
          />
        </div>
        {/* category  */}
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            value={input.category}
            onChange={handleChange}
          >
            <option value="sports"> sports</option>
            <option value="history"> history</option>
            <option value="geography"> geography</option>
          </select>
        </div>
        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="difficulty">select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            value={input.difficulty}
            onChange={handleChange}
          >
            <option value="easy"> easy</option>
            <option value="medium"> medium</option>
            <option value="hard"> hard</option>
          </select>
        </div>
        {error && (
          <p className="error">
            can't generate questions, please try different option
          </p>
        )}
        <button className="submit-btn" onClick={handleSubmit}>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
