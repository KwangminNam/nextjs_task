"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { getData } from "@/app/utils/getData";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function EditClient({ params }: any) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData
  });
  const editData = data?.find((item) => item.id === +params.id);

  const addPost = (data: any) => {
    return axios
      .put(`http://localhost:3001/posts/${editData?.id}`, data)
      .then(() => {
        toast.success("수정 완료!");
      });
  };

  const createPost = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      toast.error("잠시후 다시 시도해주세요.");
    }
  });

  const createPostHandleSubmit = async (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      await createPost.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: editData?.title,
      content: editData?.content
    }
  });

  return (
    <form onSubmit={handleSubmit(createPostHandleSubmit)}>
      <Input id="title" register={register} />
      <Input id="content" register={register} />
      <Button label="수정하기" />
    </form>
  );
}
