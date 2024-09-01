import { useState } from "react";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import use from "../../hooks/use";
import { Down_arrow, Up_arrow } from "../SVG-Icons";

export default function ChooseQuiz({
  allProps: { isFocus, setIsFocus, setSelectedTopic },
}) {
  const [input, setInput] = useState("");

  const topics = use(useGetDataQuery("topics"));

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setInput(topic.title);
    setIsFocus(false);
  };

  const filterByTopic = (topic) => {
    const inputText = input.trim();
    const matchedText = RegExp(inputText, "i");

    return inputText.length > 0 ? topic.title.match(matchedText) : topic;
  };

  return (
    <div className="w-1/2 lg:w-1/3 relative left-full -translate-x-full z-50">
      <div className="mb-2">
        <label className="text-base sm:text-lg md:text-2xl text-gray-800 dark:text-[#F6F7F9] font-medium">
          Choose a quiz
        </label>
        <div
          className={`flex justify-around items-center gap-2 w-full px-2 py-1 border-2 ${
            isFocus ? "border-teal-600" : "border-gray-300"
          } transition-colors duration-300 rounded`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="w-11/12 md:px-1 md:py-1 text-base md:text-lg text-gray-800 dark:text-[#F6F7F9] font-normal bg-transparent dark:caret-white outline-none"
            type="text"
            placeholder="-Select-"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocus(true)}
          />
          <div
            className="flex justify-center items-center w-5 h-5 cursor-pointer"
            onClick={() => setIsFocus((prev) => !prev)}
          >
            {isFocus ? <Up_arrow /> : <Down_arrow />}
          </div>
        </div>
      </div>

      {isFocus && (
        <div className="w-full text-base absolute bg-gray-200 rounded drop-shadow-sm">
          <div className="w-2 h-2 absolute bg-gray-200 translate-x-6 -translate-y-2/4 rotate-45 -z-10"></div>
          <div className="px-1 py-1">
            {/* No topic handling */}
            {topics.length === 0 && (
              <p className="px-3 py-1 hover:bg-gray-300 rounded">
                No quiz topic found...
              </p>
            )}

            {/* Topic handling */}
            {topics.length > 0 &&
              (topics.filter(filterByTopic).length > 0 ? (
                topics
                  .sort()
                  .filter(filterByTopic)
                  .map((topic) => {
                    return (
                      <p
                        key={topic._id}
                        className="px-3 py-1 cursor-pointer hover:bg-gray-300 rounded"
                        onClick={() => handleTopicClick(topic)}
                      >
                        {topic.title}
                      </p>
                    );
                  })
              ) : (
                <p className="px-3 py-1 cursor-pointer bg-red-400 rounded">
                  Search text doesen&apos;t match any topic!
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
