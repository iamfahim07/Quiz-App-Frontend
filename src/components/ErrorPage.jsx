import Lottie from "react-lottie";
import ErrorPageAnimation from "../assets/ErrorPage.json";
import { Link } from "../router/CustomRouter";
import Button from "./Button";
import BaseLayoutBox from "./shared-ui//user/BaseLayoutBox";

export default function ErrorPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ErrorPageAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <BaseLayoutBox>
      <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
        <p className="text-base sm:text-lg md:text-lg bg-red-400 text-white py-1 px-2 rounded font-['Inter']">
          Something went wrong! Please try again in a moment.
        </p>

        <div className="w-fit relative left-full -translate-x-full flex gap-3">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-3/5 py-4 sm:py-8 px-5 sm:px-10">
        <div className="w-full h-full pointer-events-none">
          <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
        </div>
      </div>
    </BaseLayoutBox>

    // <main className="w-full flex justify-center items-center pointer-events-none">
    //   <div className="w-full  h-full">
    //     <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
    //   </div>
    // </main>
  );
}
