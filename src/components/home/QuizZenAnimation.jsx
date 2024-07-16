import Lottie from "react-lottie";
import QuizAnimation from "../../assets/QuizAnimation.json";

export default function QuizZenAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: QuizAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-start items-center w-full md:w-[55%] -mt-12 md:-mt-0 pointer-events-none">
      <div className="w-full md:w-[630px] h-full md:h-[630px]">
        <Lottie
          options={defaultOptions}
          // width={630}
          // height={630}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  );
}
