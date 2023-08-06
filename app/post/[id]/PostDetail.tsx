"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { DetailParamsI } from "./page";
import Link from "next/link";
import { apiModules } from "@/app/utils/getData";
import { styled } from "styled-components";
import Input from "@/app/components/Input";
import Form from "@/app/components/Form";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useState } from "react";
import EditComment from "@/app/components/EditComment";

const EditLink = styled(Link)`
  color: #f04d4e;
  font-size: 15px;
`;

const DetailContainter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-around;
`;

const DetailContent = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding-top: 30px;
  width: 100%;
  min-height: 500px;
`;

const CommentWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
`;

export default function PostDetail({ params }: { params: DetailParamsI }) {
  const { getData, getComment, postCommentData, deleteCommentData } =
    apiModules();
  const router = useRouter();
  const [editComment, setEditComment] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData
  });
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComment
  });

  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      postId: +params.id
    }
  });
  const detailPost = data?.find((item) => item.id === +params.id);
  const commentPost = commentsData?.filter(
    (item) => item.postId === +params.id
  );

  console.log(commentPost);

  const createComment = useMutation({
    mutationFn: postCommentData,
    onSuccess: () => {
      toast.success("댓글등록완료 등록 완료!");
      router.refresh();
    },
    onError: () => {
      toast.error("잠시후 다시 시도해주세요.");
    }
  });

  const createCommentHandleSubmit = async (formData: FieldValues) => {
    try {
      // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
      await createComment.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const removeQuery = useMutation({
    mutationFn: deleteCommentData,
    onSuccess: () => {
      toast.success("댓글 삭제 완료!");
      router.refresh();
    },
    onError: () => {
      toast.error("잠시후 다시 시도해주세요.");
    }
  });

  const removeHandler = (id: number) => {
    try {
      removeQuery.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (!detailPost) {
    return <div>NO DETAIL PAGE</div>;
  }

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <DetailContainter>
      <DetailTitle>
        <span>제목:{detailPost.title}</span>
        <EditLink href={`/edit/${detailPost.id}`}>수정하기</EditLink>
      </DetailTitle>
      <DetailContent>내용:{detailPost.content}</DetailContent>
      <div style={{ width: "100%", padding: "10px" }}>
        <DetailTitle>
          <span>댓글</span>
        </DetailTitle>
        {commentPost?.map((item) => (
          <CommentWrapper
            key={item.id}
            onClick={() => {
              setEditComment(true);
            }}
          >
            {index !== item.id && (
              <>
                {item.content}
                <button onClick={() => setIndex(item.id)}>수정</button>
                <button onClick={() => removeHandler(item.id)}>삭제 </button>
              </>
            )}
            {index === item.id && (
              <EditComment
                contentValue={item.content}
                postIdValue={item.postId}
                postId={item.id}
                setEditComment={setIndex}
              />
            )}
          </CommentWrapper>
        ))}
      </div>
      <Form onSubmit={handleSubmit(createCommentHandleSubmit)}>
        <div style={{ display: "flex" }}>
          <Input id="content" register={register} />
          <Input id="postId" register={register} type="hidden" />
          <Button label="댓글 등록" />
        </div>
      </Form>
    </DetailContainter>
  );
}
