'use client';
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

interface InputPropsI {
  id:string;
  register:UseFormRegister<FieldValues>
}

const InputComponent = styled.input`
  padding: 20px;
`

export default function Input({id,register}:InputPropsI) {
  return (
    <InputComponent
      id={id}
      {...register(id)}
    />
  )
}
