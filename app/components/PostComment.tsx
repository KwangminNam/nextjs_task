import React, { useEffect } from 'react'
import Form from './Form'
import Input from './Input'
import Button from './Button'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

interface PostCommentProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: () => void;
}

const CommentWrap = styled.div`
  width: 100%;
  display: flex;
`;

export default function PostComment({
  register,
  handleSubmit
}: PostCommentProps) {

  return (
    <Form onSubmit={handleSubmit}>
      <CommentWrap>
        <Input id="content" register={register} />
        <Input id="postId" register={register} type="hidden" />
        <Button label="댓글 등록" />
      </CommentWrap>
    </Form>
  )
}
