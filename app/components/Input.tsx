"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

interface InputPropsI {
  id: string;
  type?: "text" | "textarea" | "password" | "number" | "hidden";
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}

const InputComponent = styled.input`
  padding: ${(props) =>
    props.type === "textarea" ? "20px 0 100px 20px" : "20px"};
  width: 100%;
  overflow-y: scroll;
`;

export default function Input({
  id,
  type = "text",
  placeholder,
  register
}: InputPropsI) {
  return (
    <InputComponent
      id={id}
      type={type}
      {...register(id)}
      placeholder={placeholder}
    />
  );
}
