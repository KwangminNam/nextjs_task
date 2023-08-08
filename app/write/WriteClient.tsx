"use client";

import React, { RefObject, useEffect, useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Form from "../components/Form";
import { apiModules } from "../utils/getData";

export default function WriteClient() {
  const { handleSubmit, register , watch , setFocus} = useForm();
  const postTitle = watch('title');
  const postContent = watch('content');

  useEffect(()=>{
    setFocus('title');
  },[])

  const {postData} = apiModules();
  const router = useRouter();

  const createPost = useMutation({
    mutationFn:postData,
    onSuccess: ()=>{
      toast.success('등록 완료')
      router.push('/')
    },
    onError: ()=>{
      toast.error('잠시후 다시 시도해주세요.')
    }
  })

  const createPostHandleSubmit = async (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      if(!postTitle || !postContent) {
        alert(`${!postTitle ? '제목을 입력해주세요!' : '내용을 입력해주세요!'}`)
        return;
      }
      await createPost.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  
  return (
    <Form onSubmit={handleSubmit(createPostHandleSubmit)}>
      <Input id="title" register={register} placeholder="제목을 입력해주세요."/>
      <Input id="content" register={register}  type="textarea" placeholder="내용을 입력해주세요."/>
      <Button label="등록하기" />
    </Form>
  );
}
