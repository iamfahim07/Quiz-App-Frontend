import { useState } from "react";
import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import { useParamsContext } from "../../router/custom-router-context";
import Button from "../Button";
import Input from "../form-element/Input";
import { Spin_Animation } from "../SVG-Icons";

export default function QuizQuestionAddAndUpdateForm({
  input,
  setInput,
  clearInput,
  currentForm,
  Form_Types,
  setFormState,
  setQuizzes,
}) {
  // sort quiz state
  const [isSortQuiz, setIsSortQuiz] = useState(input?.isSortQuiz || false);

  // current quiz topic
  const { topic_id } = useParamsContext();

  // sending a post request to update or add the quiz question
  const [setData, { isLoading, isError, errorMessage }] = useSetDataMutation(
    `quizzes/${topic_id}`
  );

  // check isMultiple
  const checkIsMultiple = () => {
    let count = 0;

    for (let x in input) {
      if (typeof input[x] === "boolean" && input[x] === true) {
        count++;
      }
    }

    return count > 1 ? true : false;
  };

  // handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      question: input.question,
      isMultiple: isSortQuiz ? false : checkIsMultiple(),
      isSortQuiz: isSortQuiz,
      options: [
        {
          value: input.firstOptionText,
          isCorrect: input.firstOptionCheckbox,
          position: isSortQuiz ? 1 : null,
        },
        {
          value: input.secondOptionText,
          isCorrect: input.secondOptionCheckbox,
          position: isSortQuiz ? 2 : null,
        },
        {
          value: input.thirdOptionText,
          isCorrect: input.thirdOptionCheckbox,
          position: isSortQuiz ? 3 : null,
        },
        {
          value: input.fourthOptionText,
          isCorrect: input.fourthOptionCheckbox,
          position: isSortQuiz ? 4 : null,
        },
      ],
    };

    try {
      const updatedQuizzes =
        currentForm === Form_Types.add
          ? await setData(quizData)
          : await setData({ id: input.id, quizData }, { method: "PUT" });

      setQuizzes(updatedQuizzes);

      setFormState({ isActive: false, currentForm: "" });
      clearInput();
    } catch (err) {
      console.error("An error occurred while updating question:", err);
    }
  };

  // handle input function
  const handleInput = (e) => {
    const inputState =
      e.target.type === "text" ? e.target.value : e.target.checked;

    setInput({
      ...input,
      [e.target.name]: inputState,
    });
  };

  return (
    <form
      className="flex flex-col gap-4 p-5 md:p-10 rounded bg-gray-200 dark:bg-gray-900"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-end gap-4">
        <Input
          type="text"
          name="question"
          placeholder="Enter the question"
          value={input.question}
          onHandleInput={handleInput}
          isDisabled={isLoading}
        />

        <div className="w-full flex flex-col gap-2">
          {/* first option */}
          <div className="w-full flex gap-4">
            <div className="w-2/3">
              <Input
                type="text"
                name="firstOptionText"
                placeholder="Enter the first option"
                value={input.firstOptionText}
                onHandleInput={handleInput}
                isDisabled={isLoading}
              />
            </div>

            <div className="w-1/3 flex items-center gap-2">
              {!isSortQuiz && (
                <div className="w-6 h-6 *:cursor-pointer">
                  <Input
                    customClass="w-6 h-6"
                    type="checkbox"
                    name="firstOptionCheckbox"
                    checked={input.firstOptionCheckbox}
                    onHandleInput={handleInput}
                    isDisabled={isLoading}
                  />
                </div>
              )}

              <label className="text-base sm:text-xl font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {isSortQuiz ? "First Position" : "Is correct?"}
              </label>
            </div>
          </div>

          {/* second option */}
          <div className="w-full flex gap-4">
            <div className="w-2/3">
              <Input
                type="text"
                name="secondOptionText"
                placeholder="Enter the second option"
                value={input.secondOptionText}
                onHandleInput={handleInput}
                isDisabled={isLoading}
              />
            </div>

            <div className="w-1/3 flex items-center gap-2">
              {!isSortQuiz && (
                <div className="w-6 h-6 *:cursor-pointer">
                  <Input
                    customClass="w-6 h-6"
                    type="checkbox"
                    name="secondOptionCheckbox"
                    checked={input.secondOptionCheckbox}
                    onHandleInput={handleInput}
                    isDisabled={isLoading}
                  />
                </div>
              )}

              <label className="text-base sm:text-xl font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {isSortQuiz ? "Second Position" : "Is correct?"}
              </label>
            </div>
          </div>

          {/* third option */}
          <div className="w-full flex gap-4">
            <div className="w-2/3">
              <Input
                type="text"
                name="thirdOptionText"
                placeholder="Enter the third option"
                value={input.thirdOptionText}
                onHandleInput={handleInput}
                isDisabled={isLoading}
              />
            </div>

            <div className="w-1/3 flex items-center gap-2">
              {!isSortQuiz && (
                <div className="w-6 h-6 *:cursor-pointer">
                  <Input
                    customClass="w-6 h-6"
                    type="checkbox"
                    name="thirdOptionCheckbox"
                    checked={input.thirdOptionCheckbox}
                    onHandleInput={handleInput}
                    isDisabled={isLoading}
                  />
                </div>
              )}

              <label className="text-base sm:text-xl font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {isSortQuiz ? "Third Position" : "Is correct?"}
              </label>
            </div>
          </div>

          {/* fourth option */}
          <div className="w-full flex gap-4">
            <div className="w-2/3">
              <Input
                type="text"
                name="fourthOptionText"
                placeholder="Enter the fourth option"
                value={input.fourthOptionText}
                onHandleInput={handleInput}
                isDisabled={isLoading}
              />
            </div>

            <div className="w-1/3 flex items-center gap-2">
              {!isSortQuiz && (
                <div className="w-6 h-6 *:cursor-pointer">
                  <Input
                    customClass="w-6 h-6"
                    type="checkbox"
                    name="fourthOptionCheckbox"
                    checked={input.fourthOptionCheckbox}
                    onHandleInput={handleInput}
                    isDisabled={isLoading}
                  />
                </div>
              )}

              <label className="text-base sm:text-xl font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {isSortQuiz ? "Fourth  Position" : "Is correct?"}
              </label>
            </div>
          </div>
        </div>
      </div>

      {isError && errorMessage.length > 0 && (
        <p className="text-red-600 font-semibold">{errorMessage}</p>
      )}

      <div className="flex justify-between">
        {/* is sort button */}
        <Button
          isGhostButton={true}
          handleButtonClick={() => {
            setIsSortQuiz(!isSortQuiz);
            clearInput();
          }}
          isDisabled={isLoading || currentForm === Form_Types.update}
        >
          {isSortQuiz ? "T/F" : "Sort"}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            isGhostButton={true}
            handleButtonClick={() => {
              setFormState({ isActive: false, currentForm: "" });
              clearInput();
            }}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" isDisabled={isLoading}>
            {isLoading ? (
              <span className="flex justify-center items-center">
                <Spin_Animation /> Processing...
              </span>
            ) : currentForm === Form_Types.add ? (
              "Add"
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
