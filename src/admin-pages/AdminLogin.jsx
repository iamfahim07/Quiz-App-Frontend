import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/form-element/Input";
import { Spin_Animation } from "../components/SVG-Icons";
import { useAuthContext } from "../context";
import { Navigate } from "../router/CustomRouter";

export default function AdminLogin() {
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const { login, isLoading, isError } = useAuthContext();

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

    const isSuccess = await login({
      userName: input.userName,
      password: input.password,
    });

    isSuccess ? Navigate("/admin/quiz_topic_customize", { replace: true }) : "";
  };

  return (
    <main className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-0 md:gap-5 mb-8 md:mb-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto'] mb-4">
        Welcome Back
      </h1>

      <form
        className="w-4/5 md:w-[50%] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
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

        <div className="w-fit relative left-full -translate-x-full">
          <div className="flex gap-2 items-center">
            {isError && (
              <p className="text-red-600 font-semibold">
                Wrong username or password
              </p>
            )}

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
    </main>
  );
}
