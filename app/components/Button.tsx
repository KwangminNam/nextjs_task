'use client';

import React from "react";
import { styled } from "styled-components";

interface ButtonPropsI {
  label: string;
}

const ButtonComponent = styled.button`
  width: 100px;
  padding: 10px;
  background-color: blue;
`;

export default function Button({ label }: ButtonPropsI) {
  return (
    <ButtonComponent>
      <span>{label}</span>
    </ButtonComponent>
  );
}
