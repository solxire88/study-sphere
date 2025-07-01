import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Input, Textarea } from "@heroui/react";

const initialQuestion = { question: "", choices: ["", "", ""], correctAnswer: 0 };

const TestFormModal = ({ isOpen, onRequestClose, onSubmit, test, mode = "add" }) => {
  const [form, setForm] = useState({ title: "", questions: [initialQuestion] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: mode === "edit" && test ? test.title : "",
        questions: mode === "edit" && test
          ? test.questions.map(q => ({
              ...q,
              choices: [...q.choices]
            }))
          : [{ ...initialQuestion }]
      });
      setErrors({});
    }
  }, [isOpen, mode, test]);

  const handleChange = (type, index, value, choiceIndex) => {
    setForm(prev => {
      const newForm = JSON.parse(JSON.stringify(prev));
      if (type === "title") newForm.title = value;
      else if (type === "question") newForm.questions[index].question = value;
      else if (type === "choice") newForm.questions[index].choices[choiceIndex] = value;
      else if (type === "correct") newForm.questions[index].correctAnswer = choiceIndex;
      return newForm;
    });

    const errorKey =
      type === "title"
        ? "title"
        : type === "question"
        ? `question-${index}`
        : `choice-${index}-${choiceIndex}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const questionAction = (action, index) => {
    if (action === "add") {
      setForm(prev => ({
        ...prev,
        questions: [...prev.questions, { ...initialQuestion }]
      }));
    } else {
      setForm(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`question-${index}`) || key.startsWith(`choice-${index}`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Test title is required";

    form.questions.forEach((q, qIndex) => {
      if (!q.question.trim()) newErrors[`question-${qIndex}`] = "Question text is required";

      q.choices.forEach((choice, cIndex) => {
        if (!choice.trim()) newErrors[`choice-${qIndex}-${cIndex}`] = "Choice cannot be empty";
      });

      if (q.choices.every(c => !c.trim())) {
        newErrors[`choices-${qIndex}`] = "At least one choice is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit(mode === "edit" ? { ...test, ...form } : form);
    }
  };

  if (!isOpen || (mode === "edit" && !test)) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <Card
        className="py-4 w-[95%] max-w-[700px] max-h-[70vh] overflow-y-auto"
        style={{
          borderRadius: "10px",
          border: "2px solid rgba(166, 225, 250, 0.3)",
          background: "linear-gradient(145deg, #04091C, #0A0F24)",
          transform: isOpen ? "translateY(30px)" : "translateY(100px)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          boxShadow: "0 4px 20px rgba(166, 225, 250, 0.2)"
        }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h2 className="text-3xl font-bold mb-6 text-[#A6E1FA]">
            {mode === "edit" ? "Edit Test" : "Add New Test"}
          </h2>
        </CardHeader>
        <CardBody className="overflow-visible py-2 px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Input
                label="Test Title"
                value={form.title}
                onChange={e => handleChange("title", 0, e.target.value)}
                placeholder="Enter test title"
                variant="bordered"
                className="w-full hover:border-[#A6E1FA]"
                classNames={{
                  input: "text-white",
                  label: "text-white",
                  inputWrapper: errors.title ? "border-red-500" : "bg-[#0A0F24] border-[#004493]"
                }}
                isInvalid={!!errors.title}
                errorMessage={errors.title}
              />
            </div>

            {form.questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#A6E1FA]">
                    Question {qIndex + 1}
                  </h3>
                  <Button
                    onClick={() => questionAction("remove", qIndex)}
                    color="danger"
                    variant="bordered"
                    className="hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Remove Question
                  </Button>
                </div>

                <Textarea
                  label="Question Text"
                  value={q.question}
                  onChange={e => handleChange("question", qIndex, e.target.value)}
                  placeholder="Enter question text"
                  variant="bordered"
                  minRows={2}
                  className="w-full hover:border-[#A6E1FA]"
                  classNames={{
                    input: "text-white",
                    label: "text-white",
                    inputWrapper:
                      errors[`question-${qIndex}`] ? "border-red-500" : "bg-[#0A0F24] border-[#004493]"
                  }}
                  isInvalid={!!errors[`question-${qIndex}`]}
                  errorMessage={errors[`question-${qIndex}`]}
                />

                <div className="space-y-4 mt-4">
                  {q.choices.map((choice, cIndex) => (
                    <div key={cIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`correctAnswer-${qIndex}`}
                        checked={q.correctAnswer === cIndex}
                        onChange={() => handleChange("correct", qIndex, null, cIndex)}
                        className="form-radio h-4 w-4 text-blue-500 hover:scale-110 transition-all duration-200"
                        disabled={!choice.trim()}
                      />
                      <Input
                        value={choice}
                        onChange={e => handleChange("choice", qIndex, e.target.value, cIndex)}
                        placeholder={`Enter choice ${cIndex + 1}`}
                        variant="bordered"
                        className="w-full hover:border-[#A6E1FA]"
                        classNames={{
                          input: "text-white",
                          inputWrapper:
                            errors[`choice-${qIndex}-${cIndex}`]
                              ? "border-red-500"
                              : "bg-[#0A0F24] border-[#004493]"
                        }}
                        isInvalid={!!errors[`choice-${qIndex}-${cIndex}`]}
                        errorMessage={errors[`choice-${qIndex}-${cIndex}`]}
                      />
                    </div>
                  ))}
                  {errors[`choices-${qIndex}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`choices-${qIndex}`]}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-8">
              <Button
                onClick={() => questionAction("add")}
                color="primary"
                variant="bordered"
                className="w-full hover:bg-[#A6E1FA] hover:text-[#04091C] transition-all duration-300"
                style={{ borderColor: "#A6E1FA" }}
              >
                Add Question
              </Button>
            </div>

            <div className="mt-8 flex space-x-4">
              <Button
                type="submit"
                color="primary"
                variant="bordered"
                className="flex-1 hover:bg-[#A6E1FA] hover:text-[#04091C] transition-all duration-300"
                style={{ borderColor: "#A6E1FA" }}
              >
                {mode === "edit" ? "Update" : "Submit"}
              </Button>
              <Button
                onClick={onRequestClose}
                color="primary"
                variant="bordered"
                className="flex-1 hover:bg-[#A6E1FA] hover:text-[#04091C] transition-all duration-300"
                style={{ borderColor: "#A6E1FA" }}
              >
                Close
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default TestFormModal;
