import { useState } from "react";
import Lottie from "react-lottie";
import IntroduceYourselfAnimation from "../assets/Introduce Yourself.json";
import Button from "../components/Button";
import InputField from "../components/form-element/InputField";
import { Spin_Animation } from "../components/SVG-Icons";
import { useAuthContext } from "../context";
import { Navigate } from "../router/CustomRouter";

export default function IntroduceYourself() {
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  // authentication function
  const { login, register, isLoading, isError, setIsError } = useAuthContext();

  // handle input function
  const handleInput = (e) => {
    if (e.target.name === "userName") {
      if (e.target.value.length <= 12) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = isRegister
      ? await register(input)
      : await login({ userName: input.userName, password: input.password });

    isSuccess ? Navigate("/guidelines", { replace: true }) : "";
  };

  // handle register
  const handleRegister = () => {
    setInput({
      fullName: "",
      userName: "",
      password: "",
    });
    setIsRegister(!isRegister);
    setIsError({
      status: false,
      message: "",
    });
  };

  // animation default options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: IntroduceYourselfAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="flex flex-col md:flex-row justify-between items-center gap-0 md:gap-5 mb-8 md:mb-0">
      <div className="flex justify-start items-center w-full md:w-[55%] -mt-12 md:-mt-0 pointer-events-none">
        <div className="w-full md:w-[630px] h-full md:h-[630px]">
          <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
        </div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          {isRegister ? "Introduce Yourself" : "Welcome Back!"}
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          {isRegister
            ? `Enjoy Hassle-Free Access: Simply Enter Your Details to Showcase Your Mastery on the Leaderboard!`
            : `Enjoy Hassle-Free Entry: Simply Enter Your Name & password to
            Showcase Your Mastery on the Leaderboard!`}
        </p>
        <p className="w-fit text-white font-semibold px-2 bg-sky-400 rounded mb-5 md:mb-8">
          Username cannot exceed 12 characters.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col gap-3">
              {isRegister && (
                <InputField
                  type="text"
                  name="fullName"
                  label="Enter Full name"
                  value={input.fullName}
                  onHandleInput={handleInput}
                  required
                />
              )}

              <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-[#F2F3F5] font-['Inter'] w-fit relative left-full -translate-x-full mb-1">
                <span className="font-bold">{12 - input.userName.length}</span>{" "}
                character left
              </p>

              <InputField
                type="text"
                name="userName"
                label="Enter User name"
                value={input.userName}
                onHandleInput={handleInput}
                required
              />

              <InputField
                type="password"
                name="password"
                label="Enter password"
                value={input.password}
                onHandleInput={handleInput}
                required
              />
            </div>
          </div>

          {isError.status && isError.message.length > 0 && (
            <p className="text-red-600 font-semibold">{isError.message}</p>
          )}

          <div className="w-fit relative left-full -translate-x-full">
            <div className="flex gap-2 items-center">
              <Button
                isGhostButton={true}
                handleButtonClick={handleRegister}
                isDisabled={isLoading}
              >
                {isRegister ? "LogIn" : "Register"}
              </Button>
              <span className="text-gray-800 dark:text-[#F6F7F9]">or</span>
              <Button type="submit" isDisabled={isLoading}>
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <Spin_Animation /> Processing...
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
