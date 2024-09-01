import { forwardRef, useState } from "react";

export default forwardRef(function InputField(
  { type, name, label, value, onHandleInput, required, isDisabled },
  ref
) {
  const [isFocus, setisFocus] = useState(false);

  const handleBlur = () => {
    if (value.length === 0) {
      setisFocus(false);
    }
  };

  return (
    <label
      className={`w-full h-16 flex flex-col bg-transparent dark:caret-white px-3 py-1 border-2 border-gray-300 dark:border-gray-600 ${
        isFocus && "border-teal-600 dark:border-teal-600"
      } transition-colors duration-75 rounded outline-none cursor-pointer font-['Roboto']`}
      htmlFor={name}
      onClick={() => setisFocus(true)}
    >
      <span
        className={`${
          isFocus
            ? "text-sm text-teal-600 font-medium"
            : "text-xl text-gray-600 font-normal dark:text-gray-400 translate-y-[40%]"
        } transition-all duration-75 ease-linear`}
      >
        {label}
      </span>

      <input
        className={`w-full border-transparent outline-none bg-transparent text-lg text-gray-800 dark:text-[#F6F7F9] dark:caret-white font-['Roboto']`}
        ref={ref}
        type={type}
        id={name}
        name={name}
        value={value}
        onFocus={() => setisFocus(true)}
        onBlur={handleBlur}
        onChange={onHandleInput}
        required={required}
        disabled={isDisabled}
      />
    </label>
  );
});
