"use client";

import { styled } from "styled-components";

interface InnerWrapperProps {
  children: React.ReactNode;
}

const InnerWrapperComponent = styled.div`
  padding: 20px;
`;

export default function InnerWrapper({ children }: InnerWrapperProps) {
  return <InnerWrapperComponent>{children}</InnerWrapperComponent>;
}
