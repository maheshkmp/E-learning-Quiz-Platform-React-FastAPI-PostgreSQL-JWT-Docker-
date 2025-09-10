import { useEffect, useState } from "react";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch questions from backend
  useEffect(() => {
    fetch("http://localhost:8000/questions/")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    let tempScore = 0;

    questions.forEach((q) => {
      if (!q.correct_option) {
        console.warn(`Question ${q.id} has no correct_option`);
        return; // skip this question
      }

      const optionMap = {
        a: q.option_a,
        b: q.option_b,
        c: q.option_c,
        d: q.option_d,
      };

      const correctAnswer = optionMap[q.correct_option.toLowerCase()];

      if (answers[q.id] === correctAnswer) {
        tempScore += 1;
      }
    });

    setScore(tempScore);
    setSubmitted(true);

    try {
      await fetch("http://localhost:8000/scores/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, score: tempScore }),
      });
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  return (
    <div>
      <h2>Quiz Questions</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {questions.map((q) => {
            const options = [q.option_a, q.option_b, q.option_c, q.option_d];

            const optionMap = {
              a: q.option_a,
              b: q.option_b,
              c: q.option_c,
              d: q.option_d,
            };

            const correctAnswer = optionMap[q.correct_option.toLowerCase()];

            return (
              <li key={q.id} style={{ marginBottom: "20px" }}>
                <p style={{ fontWeight: "bold" }}>{q.question_text}</p>
                {options.map((opt) => {
                  const isCorrect = submitted && opt === correctAnswer;
                  const isWrong =
                    submitted && answers[q.id] === opt && opt !== correctAnswer;

                  return (
                    <label
                      key={opt}
                      style={{
                        display: "block",
                        cursor: "pointer",
                        backgroundColor: isCorrect
                          ? "#09580bff"
                          : isWrong
                          ? "rgb(211 84 96)"
                          : "transparent",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        marginBottom: "2px",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleSelect(q.id, opt)}
                        disabled={submitted} // prevent changes after submit
                        style={{ marginRight: "8px" }}
                      />
                      {opt}
                    </label>
                  );
                })}
              </li>
            );
          })}
        </ul>
      )}

      {!submitted && questions.length > 0 && (
        <button
          onClick={handleSubmit}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Submit Answers
        </button>
      )}

      {submitted && (
        <div style={{ marginTop: "16px" }}>
          <h3>
            You scored {score} / {questions.length}
          </h3>
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
