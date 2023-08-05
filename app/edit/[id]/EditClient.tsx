"use client";

import Button from "@/app/components/Button";
import Form from "@/app/components/Form";
import Input from "@/app/components/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiModules } from "@/app/utils/getData";

export default function EditClient({ params }: any) {
  const { getData, editData: editFn } = apiModules();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData
  });

  const editData = data?.find((item) => item.id === +params.id);
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: editData?.title,
      content: editData?.content
    }
  });
  console.log(editData);

  const editPost = useMutation(
    async (formData: FieldValues) => {
      // 실제로는 여기서 formData를 사용하여 API 호출을 하도록 수정해야 합니다.
      const response = await editFn(formData, editData?.id);
      return response.data;
    },
    {
      onSuccess: () => {
        router.push("/");
        toast.success("수정 완료!");
      },
      onError: () => {
        toast.error("잠시 후 다시 시도해주세요.");
      }
    }
  );
  const createPostHandleSubmit = async (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      await editPost.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(createPostHandleSubmit)}>
      <Input id="title" register={register} />
      <Input id="content" register={register} type="textarea" />
      <Button label="수정하기" />
    </Form>
  );
}
