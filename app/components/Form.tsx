"use client";

import React from "react";
import { styled } from "styled-components";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
`;

export default function Form({onSubmit,children}:FormProps) {
  return (
    <FormContainer onSubmit={onSubmit}>
      {children}
    </FormContainer>
  )
  
}
