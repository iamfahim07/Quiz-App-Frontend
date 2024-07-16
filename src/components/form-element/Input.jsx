import { forwardRef } from "react";

export default forwardRef(function Input(
  {
    customClass,
    type,
    name,
    placeholder,
    checked,
    value,
    onHandleInput,
    currentForm,
    Form_Types,
    isDisabled,
  },
  ref
) {
  let isRequired = true;

  if (type && type === "checkbox") {
    isRequired = false;
  } else if (currentForm && Form_Types && currentForm === Form_Types?.update) {
    isRequired = false;
  }

  return (
    <input
      className={`${customClass} w-full text-lg text-gray-800 dark:text-[#F6F7F9] font-normal bg-transparent dark:caret-white px-3 py-2 border-2 border-gray-300 focus:border-teal-600 transition-colors duration-300 rounded outline-none ${
        isDisabled && "opacity-50 cursor-not-allowed"
      }`}
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      {...(type === "checkbox" || type === "radio" ? { checked } : {})}
      onChange={onHandleInput}
      required={isRequired}
      disabled={isDisabled}
    />
  );
});
