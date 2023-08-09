'use client';

import { styled } from "styled-components";
import {PiWarningDuotone} from 'react-icons/pi';

interface UnexpectedProps{
  title:string;
}

const UnexpectedWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const UnexpectedTitle = styled.strong<{fontSize:string}>`
  font-size: ${props => props.fontSize};
  text-align: center;
  display: block;
`

export default function Unexpected({title}:UnexpectedProps) {
  return (
    <UnexpectedWrapper>
      <PiWarningDuotone size={50} color='red'/>
      <UnexpectedTitle
        fontSize={title === '404' ? '32px' : '18px'}
      >{title}</UnexpectedTitle>
    </UnexpectedWrapper>
  )
}
