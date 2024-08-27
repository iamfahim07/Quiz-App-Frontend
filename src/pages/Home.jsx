// import Button from "../components/Button";
// import Lottie from "react-lottie";
// import HomeAnimation from "../assets/HomeAnimation.json";
// import { Link } from "../router/CustomRouter";
// import { useAuthContext } from "../context";
import QuizZenAnimation from "../components/home/QuizZenAnimation";
import QuizZenDescription from "../components/home/QuizZenDescription";

export default function Home() {
  // const { currentUser } = useAuthContext();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: HomeAnimation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <main className="flex flex-col-reverse md:flex-row justify-between items-center gap-0 md:gap-5 mb-16 md:mb-0">
      {/* <div className="flex flex-col justify-center items-start gap-3 w-full md:w-[45%]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          QuizZen
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter'] mb-2 md:mb-8">
          Unlock knowledge, ignite curiosity, explore endlessly with our quiz
          app.
        </p>
        <Link
          to={`${
            currentUser?.userName ? "/guidelines" : "/introduce_yourself"
          }`}
        >
          <Button isPrimary={true}>Get Started</Button>
        </Link>
      </div> */}
      <QuizZenDescription />

      {/* <div className="flex justify-start items-center w-full md:w-[55%] -mt-12 md:-mt-0 pointer-events-none">
        <div className="w-full md:w-[630px] h-full md:h-[630px]">
          <Lottie
            options={defaultOptions}
            // width={630}
            // height={630}
            isStopped={false}
            isPaused={false}
          />
        </div>
      </div> */}
      <QuizZenAnimation />
    </main>
  );
}
