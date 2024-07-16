import Lottie from "react-lottie";
import PageNotFound from "../assets/PageNotFound.json";

export default function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PageNotFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <main className="w-full flex justify-center items-center pointer-events-none">
      <div className="w-full  h-full">
        <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
      </div>
    </main>
  );
}
