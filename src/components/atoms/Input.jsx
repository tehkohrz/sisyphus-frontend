import React from 'react';

export default function Input({
  className,
  changeHandler,
  placeholder,
  value,

  id,
}) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onInput={changeHandler}
      value={value}
      id={id}
    ></input>
  );
}
