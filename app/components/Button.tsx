'use client';

import React from "react";
import { styled } from "styled-components";

interface ButtonPropsI {
  label: string;
}

const ButtonComponent = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #4d8eff;
  border: none;
  outline: none;
  color: #fff;
  border-radius:10px;
  font-size: 15px;
  cursor: pointer;
  &:hover{
    
  }
`;

export default function Button({ label }: ButtonPropsI) {
  return (
    <ButtonComponent>
      <span>{label}</span>
    </ButtonComponent>
  );
}
