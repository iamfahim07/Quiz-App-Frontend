import { Suspense, useState } from "react";
// import useGetDataQuery from "../hooks/api/useGetDataQuery";
// import Button from "../components/Button";
// import { Link } from "../router/CustomRouter";
// import { useQuizTopicContext } from "../context";
// import { Down_arrow, Info_Sign, Up_arrow } from "../components/SVG-Icons";
import { useEffect } from "react";
import ChooseOptionNotification from "../components/quiz-options/ChooseOptionNotification";
import ChooseQuiz from "../components/quiz-options/ChooseQuiz";
import ChooseYourQuest from "../components/quiz-options/ChooseYourQuest";
import SelectedTopicInformation from "../components/quiz-options/SelectedTopicInformation";
import { useQuizTopicContext } from "../context";

export default function QuizOptions() {
  const [isFocus, setIsFocus] = useState(false);
  // const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const { setQuizTopic } = useQuizTopicContext();

  useEffect(() => {
    setQuizTopic({});
  }, [setQuizTopic]);

  // const { isLoading, isError, data: topics } = useGetDataQuery("topics");

  // const handleTopicClick = (topic) => {
  //   setSelectedTopic(topic);
  //   setInput(topic.title);
  //   setIsFocus(false);
  // };

  // const { setQuizTopic } = useQuizTopicContext();

  // const filterByTopic = (topic) => {
  //   const inputText = input.trim();
  //   const matchedText = RegExp(inputText, "i");

  //   return inputText.length > 0 ? topic.title.match(matchedText) : topic;
  // };

  return (
    <main
      className="mt-7 md:mt-10"
      onClick={() => isFocus && setIsFocus(false)}
    >
      <ChooseYourQuest />

      {/* <div className="w-1/2 lg:w-1/3 relative left-full -translate-x-full">
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
              {isLoading && !isError && (
                <p className="px-3 py-1 hover:bg-gray-300 rounded">
                  Loading...
                </p>
              )}

              {!isLoading && isError && (
                <p className="px-3 py-1 bg-red-400 rounded">
                  There was an Error
                </p>
              )}

              {!isLoading && !isError && topics.length === 0 && (
                <p className="px-3 py-1 hover:bg-gray-300 rounded">
                  No quiz topic found...
                </p>
              )}

              {!isLoading &&
                !isError &&
                topics.length > 0 &&
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
      </div> */}

      <Suspense fallback={<h1>Loading...</h1>}>
        <ChooseQuiz allProps={{ isFocus, setIsFocus, setSelectedTopic }} />
      </Suspense>

      <div className="w-full h-72 my-3">
        {selectedTopic === null && (
          // <div className="flex items-center gap-2 bg-sky-400  px-2 py-1 rounded w-fit mt-6">
          //   <div className="w-5 sm:w-7 h-5 sm:h-7">
          //     <Info_Sign />
          //   </div>
          //   <p className="text-white text-base sm:text-lg md:text-2xl">
          //     Please choose an option to play quiz.
          //   </p>
          // </div>

          <ChooseOptionNotification />
        )}

        {selectedTopic !== null && typeof selectedTopic === "object" && (
          // <div className="w-full h-72 flex gap-2 bg-gray-100 dark:bg-gray-900 rounded">
          //   <div className="w-full md:w-1/2 flex flex-col gap-2 py-5 px-7">
          //     <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Inter']">
          //       {selectedTopic.title}
          //     </h3>

          //     <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          //       {selectedTopic.description}
          //     </p>

          //     <div className="flex gap-2 items-center">
          //       <Link to="/gameplay">
          //         <Button
          //           handleButtonClick={() => setQuizTopic(selectedTopic.title)}
          //         >
          //           Start quiz
          //         </Button>
          //       </Link>

          //       <span className="text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          //         or
          //       </span>

          //       <Link to={`/leaderboard/${selectedTopic.title}`}>
          //         <Button isGhostButton={true}>Leaderboard</Button>
          //       </Link>
          //     </div>
          //   </div>

          //   <div className="w-1/2 hidden md:block">
          //     <img
          //       className="w-full h-72 rounded"
          //       src={selectedTopic.img_link}
          //       alt={selectedTopic.img_ref}
          //     />
          //   </div>
          // </div>
          <SelectedTopicInformation selectedTopic={selectedTopic} />
        )}
      </div>
    </main>
  );
}
