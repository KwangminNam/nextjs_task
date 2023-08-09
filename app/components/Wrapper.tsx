"use client";

import { ReactElement } from "react";
import { styled } from "styled-components";

interface WrapperProps {
  children: React.ReactNode;
}

const WrapperContainter = styled.div`
  width: 900px;
  margin: 30px auto 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 30px;
`;

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <WrapperContainter>{children}</WrapperContainter>
    </>
  );
}
