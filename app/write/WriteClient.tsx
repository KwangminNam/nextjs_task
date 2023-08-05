"use client";

import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function WriteClient() {

  const router = useRouter();

  const addPost = (data:any) =>{
    return axios.post('http://localhost:3001/posts',data).then(()=>{
      toast.success('등록 완료!');
      router.push('/');
    })
  }

  const createPost = useMutation({
    mutationFn:addPost
  })

  const createPostHandleSubmit = async (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      await createPost.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  const { handleSubmit, register } = useForm();


  return (
    <form onSubmit={handleSubmit(createPostHandleSubmit)}>
      <Input id="title" register={register} />
      <Input id="content" register={register} />
      <Button label="등록하기" />
    </form>
  );
}
