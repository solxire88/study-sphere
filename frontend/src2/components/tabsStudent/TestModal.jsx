import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";

const TestModal = ({ isOpen, onRequestClose, test, mode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setSelectedAnswers({});
      setSubmitted(false);
      setScore(0);
    }
  }, [isOpen]);

  const handleAnswerSelect = (questionIndex, choiceIndex) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: choiceIndex }));
    }
  };

  const handleSubmit = () => {
    const correctAnswers = test.questions.reduce((acc, question, index) => {
      return acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <Card
        className="py-4"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "80vh",
          borderRadius: "10px",
          border: "2px solid rgba(166, 225, 250, 0.3)",
          background: "linear-gradient(145deg, #04091C, #0A0F24)",
          color: "white",
          transform: isOpen ? "translateY(30px)" : "translateY(100px)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(166, 225, 250, 0.2)",
        }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h2 className="text-lg font-semibold mb-2 text-white">
            {mode === "view" ? "Take Test" : mode === "edit" ? "Edit Test" : "Add New Test"}
          </h2>
        </CardHeader>
        <CardBody className="overflow-visible py-2" style={{ padding: "24px" }}>
          {test && (
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "#A6E1FA" }}>
                {test.title}
              </h3>
              <div className="space-y-6">
                {test.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-[#0A0F24] p-6 rounded-lg transition-all duration-300 hover:bg-[#0E142A]"
                  >
                    <p className="font-semibold mb-4">{question.question}</p>
                    <ul className="space-y-3">
                      {question.choices.map((choice, choiceIndex) => (
                        <li
                          key={choiceIndex}
                          className={`flex items-center space-x-3 ${
                            submitted && choiceIndex === question.correctAnswer
                              ? "text-green-300"
                              : submitted && selectedAnswers[questionIndex] === choiceIndex
                              ? "text-red-300"
                              : "text-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            className="form-radio h-4 w-4 text-blue-500 transition-all duration-200 hover:scale-110"
                            checked={selectedAnswers[questionIndex] === choiceIndex}
                            onChange={() => handleAnswerSelect(questionIndex, choiceIndex)}
                            disabled={submitted}
                          />
                          <span>{choice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!submitted && (
            <div className="mt-8">
              <Button
                color="primary"
                variant="bordered"
                onClick={handleSubmit}
                className="w-full transition-all duration-300 hover:bg-[#A6E1FA] hover:text-[#04091C]"
                style={{ borderColor: "#A6E1FA" }}
              >
                Submit
              </Button>
            </div>
          )}
          {submitted && (
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold" style={{ color: "#A6E1FA" }}>
                Your Score: {score} / {test.questions.length}
              </p>
            </div>
          )}
          <div className="mt-8">
            <Button
              color="primary"
              variant="bordered"
              onClick={onRequestClose}
              className="w-full transition-all duration-300 hover:bg-[#A6E1FA] hover:text-[#04091C]"
              style={{ borderColor: "#A6E1FA" }}
            >
              Close
            </Button>
          </div>
        </CardBody>
      </Card>

      <style>
        {`
          ::-webkit-scrollbar {
            width: 6px;
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(166, 225, 250, 0.4);
            border-radius: 10px;
            border: 1px solid rgba(166, 225, 250, 0.2);
            transition: background 0.3s ease-out, border 0.3s ease-out;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(166, 225, 250, 0.6);
            border: 1px solid rgba(166, 225, 250, 0.4);
          }
          ::-webkit-scrollbar-track {
            background: transparent;
            margin: 8px;
          }
          ::-webkit-scrollbar-corner {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default TestModal;