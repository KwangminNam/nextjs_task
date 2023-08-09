'use client';

import { PulseLoader } from 'react-spinners';
import { styled } from 'styled-components';


const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`

export default function Loading() {
  return (
    <LoadingWrapper>
      <PulseLoader color='#4d8eff' />
    </LoadingWrapper>
  )
}
