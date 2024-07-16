import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/form-element/Input";

export default function AdminLogin() {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

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

  return (
    <main className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-0 md:gap-5 mb-8 md:mb-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
        Welcome Back
      </h1>

      <form className="w-[50%] flex flex-col gap-4">
        <div className="w-full flex flex-col gap-3">
          <Input
            type="text"
            name="userName"
            placeholder="Enter User name"
            value={input.userName}
            onHandleInput={handleInput}
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={input.password}
            onHandleInput={handleInput}
          />
        </div>

        {/* {isError && (
            <p className="text-red-600 font-semibold">
              Wrong username or password
            </p>
          )} */}

        <div className="w-fit relative left-full -translate-x-full">
          <div className="flex gap-2 items-center">
            {/* <Button
                isGhostButton={true}
                handleButtonClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "LogIn" : "Register"}
              </Button> */}
            {/* <span className="text-gray-800 dark:text-[#F6F7F9]">or</span> */}
            <Button>Continue</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
