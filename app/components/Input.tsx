"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

interface InputPropsI {
  id: string;
  type?: "text" | "textarea" | "password" | "number" | "hidden";
  register: UseFormRegister<FieldValues>;
}

const InputComponent = styled.input`
  padding: ${(props) => (props.type === "textarea" ? "100px" : "20px")};
`;

export default function Input({
  id,
  type = "text",
  register
}: InputPropsI) {
  return <InputComponent id={id} type={type} {...register(id)} />;
}
