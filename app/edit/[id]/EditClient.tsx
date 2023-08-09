"use client";

import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Input from "@/app/components/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiModules } from "@/app/utils/api";
import { useEffect, useRef } from "react";
import { DetailParamsProps } from "@/app/post/[id]/page";
import Loading from "@/app/components/Loading";
import Unexpected from "@/app/components/Unexpected";
import PageTitle from "@/app/components/PageTitle";

export default function EditClient({ params }: {params :DetailParamsProps}) {
  const { getData, editData: editFn } = apiModules();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData
  });

  const editData = data?.find((item) => item.id === +params.id);

  const { register, handleSubmit , setFocus} = useForm<FieldValues>({
    defaultValues: {
      title: editData?.title,
      content: editData?.content
    }
  });

  useEffect(()=>{
    setFocus('title')
  },[])

  const editPost = useMutation(
    async (formData: FieldValues) => {
      const response = await editFn(formData, editData?.id);
      return response.data;
    },
    {
      onSuccess: () => {
        router.push("/");
        toast.success("수정 완료!");
      },
      onError: (error:{
        message:string;
      })=>{
        toast.error(`${error.message}
        Json Server가 정상적으로 켜져있는지 확인하세요.`);
      }
    }
  );
  const createPostHandleSubmit = (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      editPost.mutate(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if(isLoading){
    return <Loading/>;
  }
  
  if(isError){
    return <Unexpected title="잠시 후 다시 시도해주세요."/>
  }

  return (
    <Form onSubmit={handleSubmit(createPostHandleSubmit)}>
      <PageTitle title="수정"/>
      <Input id="title" register={register} />
      <Input id="content" register={register} type="textarea" />
      <Button label="수정하기" />
    </Form>
  );
}
