"use client";

import React from "react";
import { styled } from "styled-components";

interface FormPropsI {
  children: React.ReactNode;
  onSubmit: () => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

export default function Form({onSubmit,children}:FormPropsI) {
  return (
    <FormContainer onSubmit={onSubmit}>
      {children}
    </FormContainer>
  )
  
}
