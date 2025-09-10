import { useState } from "react";
import "./App.css";
import QuestionsList from "./components/QuestionsList";
import LoginForm from "./components/LoginForm";
import QuizForm from "./components/QuizForm";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="onPage">
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <div className="onPageChild">
          <h1>This is IQ Testing Site</h1>
          <div className="question-area">
            <QuestionsList />
            {user.role === "teacher" && ( // Only show QuizForm to teachers
              <div>
                <QuizForm />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
