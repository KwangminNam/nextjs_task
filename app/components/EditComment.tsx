"use client";

import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import { apiModules } from "../utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { memo, useEffect } from "react";

interface EditCommentProps {
  contentValue: string;
  postIdValue: number;
  postId: number;
  setEditComment: React.Dispatch<React.SetStateAction<number | null>>
}

function EditComment({
  contentValue,
  postIdValue,
  postId,
  setEditComment
}: EditCommentProps) {
  const router = useRouter();
  const { editCommentData } = apiModules();
  const { handleSubmit, register, setFocus } = useForm<FieldValues>({
    defaultValues: {
      content: contentValue,
      postId: postIdValue
    }
  });

  useEffect(() => {
    setFocus('content');
  }, [])

  const editCommentQuery = useMutation(
    async (formData: FieldValues) => {
      const response = await editCommentData(formData, postId);
      console.log(response);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("댓글 수정완료!");
        router.refresh();
        setEditComment(null);
      },
      onError: (error: {
        message: string;
      }) => {
        toast.error(`${error.message}
      Json Server가 정상적으로 켜져있는지 확인하세요.`);
      }
    }
  );

  const editCommentHandler = (formData: FieldValues) => {
    try {
      editCommentQuery.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(editCommentHandler)}>
      <div style={{ display: "flex", width: '100%' }}>
        <Input id="content" register={register} />
        <Input id="postId" register={register} type="hidden" />
        <Button label="댓글 수정" />
      </div>
    </Form>
  );
}

export default memo(EditComment);