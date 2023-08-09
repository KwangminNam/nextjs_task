'use client';

import { styled } from "styled-components";

interface PageTitleProps {
  title:string;
}

const PageTitleComponent = styled.h2`
  font-size: 32px;
  margin-bottom: 14px;
`

export default function PageTitle({title}:PageTitleProps) {
  return (
    <PageTitleComponent>{title}</PageTitleComponent>
  )
}
