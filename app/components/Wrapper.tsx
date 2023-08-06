"use client";

import { ReactElement } from "react";
import { styled } from "styled-components";

const WrapperContainter = styled.div`
  width: 900px;
  margin: 30px auto 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 30px;
`;
interface WrapperPropsI {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperPropsI) {
  return (
    <>
      <WrapperContainter>{children}</WrapperContainter>
    </>
  );
}
