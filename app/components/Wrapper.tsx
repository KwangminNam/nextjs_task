"use client";

import { ReactElement } from "react";
import { styled } from "styled-components";

const WrapperContainter = styled.div`
  width: 900px;
  margin: 120px auto 0;
  display: flex;
  justify-content: center;
  padding: 35px;
  border: 1px solid #ccc;
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
