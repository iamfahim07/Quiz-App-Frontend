import { useState } from "react";
import useGetDataQuery from "../hooks/useGetDataQuery";
import Button from "../components/Button";
import { Link } from "../router/CustomRouter";
import { useQuizTopicContext } from "../context";

export default function QuizOptions() {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const { isLoading, isError, data: topics } = useGetDataQuery("topics");

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setInput(topic.title);
    setIsFocus(false);
  };

  const { setQuizTopic } = useQuizTopicContext();

  const filterByTopic = (topic) => {
    const inputText = input.trim();
    const matchedText = RegExp(inputText, "i");

    return inputText.length > 0 ? topic.title.match(matchedText) : topic;
  };

  return (
    <main className="mt-7 md:mt-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          Choose Your Quest
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter'] mb-2 md:mb-8">
          Welcome! In this interactive space, you&apos;re invited to explore a
          variety of quiz topics tailored to your preferences. Take your time to
          peruse and select a quiz topic that resonates with you the most or
          feels comfortably within your realm of interest.
        </p>
      </div>

      <div className="w-1/2 lg:w-1/3 relative left-full -translate-x-full">
        <div className="mb-2">
          <label className="text-base sm:text-lg md:text-2xl text-gray-800 dark:text-[#F6F7F9] font-medium">
            Choose a quiz
          </label>
          <div
            className={`flex justify-around items-center gap-2 w-full px-2 py-1 border-2 ${
              isFocus ? "border-teal-600" : "border-gray-300"
            } transition-colors duration-300 rounded`}
          >
            <input
              className="w-11/12 md:px-1 md:py-1 text-base md:text-lg text-gray-800 dark:text-[#F6F7F9] font-normal bg-transparent dark:caret-white outline-none"
              type="text"
              placeholder="-Select-"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
            />
            <div
              className="flex justify-center items-center w-5 h-5 cursor-pointer"
              onClick={() => setIsFocus((prev) => !prev)}
            >
              {isFocus ? (
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path
                      d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm2,0A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"
                      fill="#0d9488"
                    />
                    <path
                      d="M10.41,19.87,16,14.29l5.59,5.58a1,1,0,0,0,1.41,0h0a1,1,0,0,0,0-1.41L16.64,12.1a.91.91,0,0,0-1.28,0L9,18.46a1,1,0,0,0,0,1.41H9A1,1,0,0,0,10.41,19.87Z"
                      fill="#0d9488"
                    />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path
                      d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z"
                      fill="#d1d5db"
                    />
                    <path
                      d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z"
                      fill="#d1d5db"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>

        {isFocus && (
          <div className="w-full text-base absolute bg-gray-200 rounded drop-shadow-sm">
            <div className="w-2 h-2 absolute bg-gray-200 translate-x-6 -translate-y-2/4 rotate-45 -z-10"></div>
            <div className="px-1 py-1">
              {/* Loading state... */}
              {isLoading && !isError && (
                <p className="px-3 py-1 hover:bg-gray-300 rounded">
                  Loading...
                </p>
              )}

              {/* Error handling... */}
              {!isLoading && isError && (
                <p className="px-3 py-1 bg-red-400 rounded">
                  There was an Error
                </p>
              )}

              {/* No topic handling */}
              {!isLoading && !isError && topics.length === 0 && (
                <p className="px-3 py-1 hover:bg-gray-300 rounded">
                  No quiz topic found...
                </p>
              )}

              {/* Topic handling */}
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
      </div>

      <div className="w-full h-72 my-3">
        {selectedTopic === null && (
          <div className="flex items-center gap-2 bg-sky-400  px-2 py-1 rounded w-fit mt-6">
            <div className="w-5 sm:w-7 h-5 sm:h-7">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                  fill="#ffffff"
                />
              </svg>
            </div>
            <p className="text-white text-base sm:text-lg md:text-2xl">
              Please choose an option to play quiz.
            </p>
          </div>
        )}

        {selectedTopic !== null && typeof selectedTopic === "object" && (
          <div className="w-full h-72 flex gap-2 bg-gray-100 dark:bg-gray-900 rounded">
            <div className="w-full md:w-1/2 flex flex-col gap-2 py-5 px-7">
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Inter']">
                {selectedTopic.title}
              </h3>

              <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
                {/* -30 word max- Test your football knowledge with our interactive
                quiz! From legendary players to iconic moments, challenge
                yourself and see how much you really know about the beautiful
                game. */}
                {selectedTopic.description}
              </p>

              <div className="flex gap-2 items-center">
                <Link to="/gameplay">
                  <Button
                    handleButtonClick={() => setQuizTopic(selectedTopic.title)}
                  >
                    Start quiz
                  </Button>
                </Link>

                <span className="text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
                  or
                </span>

                <Link to={`/leaderboard/${selectedTopic.title}`}>
                  <Button isGhostButton={true}>Leaderboard</Button>
                </Link>
              </div>
            </div>

            <div className="w-1/2 hidden md:block">
              <img
                className="w-full h-72 rounded"
                src={selectedTopic.img_link}
                alt={selectedTopic.img_ref}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
