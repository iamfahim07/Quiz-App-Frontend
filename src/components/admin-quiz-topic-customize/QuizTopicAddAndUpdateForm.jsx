import { useRef } from "react";
import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import Button from "../Button";
import Input from "../form-element/Input";
import Textarea from "../form-element/Textarea";
import { Spin_Animation } from "../SVG-Icons";

export default function QuizTopicAddAndUpdateForm({
  input,
  setInput,
  clearInput,
  currentForm,
  Form_Types,
  setFormState,
  setTopics,
}) {
  // file referance
  const fileRef = useRef(null);

  const [setData, { isLoading, isError, errorMessage }] =
    useSetDataMutation("topics");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileData = fileRef.current.files[0];

    if (!fileData && currentForm === Form_Types.add) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("id", input.id);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("quiz-image", fileData);

    try {
      const updatedTopics =
        currentForm === Form_Types.add
          ? await setData(formData)
          : await setData(formData, { method: "PUT" });

      if (Array.isArray(updatedTopics)) {
        setTopics(updatedTopics);
      }

      fileRef.current.value = null;

      setFormState({ isActive: false, currentForm: "" });
      clearInput();
    } catch (err) {
      console.error("An error occurred while updating topics:", err);
    }
  };

  // handle input function
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="flex flex-col gap-4 px-5 md:px-10 py-7 md:py-10 rounded bg-gray-200 dark:bg-gray-900"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-end gap-2">
        <Input
          type="text"
          name="title"
          placeholder="Enter quiz topic title"
          value={input.title}
          onHandleInput={handleInput}
          isDisabled={isLoading}
        />

        <Textarea
          name="description"
          placeholder="Enter quiz topic description"
          value={input.description}
          onHandleInput={handleInput}
          isDisabled={isLoading}
        />

        <Input
          type="file"
          name="quiz-image"
          ref={fileRef}
          currentForm={currentForm}
          Form_Types={Form_Types}
          isDisabled={isLoading}
        />
      </div>

      {isError && errorMessage.length > 0 && (
        <p className="text-red-600 font-semibold">{errorMessage}</p>
      )}

      <div className="flex justify-end items-center gap-2">
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
    </form>
  );
}
