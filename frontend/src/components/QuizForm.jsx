import { useState } from "react";

function QuizForm({ user }) {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("a");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:8000/questions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // attach token
        },
        body: JSON.stringify({
          question_text: question,
          option_a: optionA,
          option_b: optionB,
          option_c: optionC,
          option_d: optionD,
          correct_option: correctOption,
        }),
      });

      if (res.ok) {
        alert("Question added successfully!");
        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrectOption("a");
      } else {
        const data = await res.json();
        alert(data.detail || "Error adding question");
      }
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Add New Question</h3>
      <input
        type="text"
        placeholder="Question text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Option A"
        value={optionA}
        onChange={(e) => setOptionA(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Option B"
        value={optionB}
        onChange={(e) => setOptionB(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Option C"
        value={optionC}
        onChange={(e) => setOptionC(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Option D"
        value={optionD}
        onChange={(e) => setOptionD(e.target.value)}
        required
      />
      <select
        value={correctOption}
        onChange={(e) => setCorrectOption(e.target.value)}
      >
        <option value="a">Correct Option A</option>
        <option value="b">Correct Option B</option>
        <option value="c">Correct Option C</option>
        <option value="d">Correct Option D</option>
      </select>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuizForm;
