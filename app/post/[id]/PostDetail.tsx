"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { DetailParamsI } from "./page";
import Link from "next/link";
import { apiModules } from "@/app/utils/api";
import { styled } from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import EditComment from "@/app/components/EditComment";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import PostComment from "@/app/components/PostComment";

const DetailContainter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const EditLink = styled(Link)`
  color: #333;
  font-size: 15px;
  position: absolute;
  right: 0;
  background-color: #4d8eff;
  color: #fff;
  border-radius: 12px;
  padding: 7px;
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
  min-height: 350px;
`;

const CommentWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
`;

const CommentBtnWrapper = styled.div<{ width: string }>`
  display: flex;
  padding-right: 15px;
  gap: 13px;
  width: ${(props) => props.width};
`;

const CommentButton = styled.button<{ backgroundColor: string }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
`;

export default function PostDetail({ params }: { params: DetailParamsI }) {
  const { getData, getComment, postCommentData, deleteCommentData } =
    apiModules();

  const router = useRouter();
  const [commentIndex, setCommentIndex] = useState<number | null>(null);
  const { handleSubmit, register, watch, setValue } = useForm<FieldValues>({
    defaultValues: {
      postId: +params.id
    }
  });

  const commentContent = watch("content");
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

  const detailPost = data?.find((item) => item.id === +params.id);
  const commentPost = commentsData?.filter(
    (item) => item.postId === +params.id
  );

  console.log(commentPost);

  const createComment = useMutation({
    mutationFn: postCommentData,
    onSuccess: () => {
      toast.success("댓글등록완료 등록 완료!");
      setValue("content", "");
      router.refresh();
    },
    onError: () => {
      toast.error("잠시후 다시 시도해주세요.");
    }
  });

  const createCommentHandleSubmit = useCallback(
    async (formData: FieldValues) => {
      try {
        if (!commentContent) {
          alert("댓글을 입력해주세요!");
          return;
        }
        // 여기서 formData를 사용하여 적절한 형태로 변환한 후 mutate 함수에 전달합니다.
        await createComment.mutateAsync(formData);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [commentContent, createComment]
  );

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
    const confirmRemove = confirm("삭제 하시겠습니까?");
    try {
      if (confirmRemove) {
        removeQuery.mutateAsync(id);
      }
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
          <CommentWrapper key={item.id}>
            {commentIndex !== item.id ? (
              <>
                {item.content}
                <CommentBtnWrapper width="unset">
                  <CommentButton
                    backgroundColor="#99df99"
                    onClick={() => setCommentIndex(item.id)}
                  >
                    <BiSolidEditAlt size={20} color="#fff" />
                  </CommentButton>
                  <CommentButton
                    backgroundColor="red"
                    onClick={() => removeHandler(item.id)}
                  >
                    <BsFillTrashFill size={20} color="#fff" />
                  </CommentButton>
                </CommentBtnWrapper>
              </>
            ) : (
              <CommentBtnWrapper width="100%">
                <EditComment
                  contentValue={item.content}
                  postIdValue={item.postId}
                  postId={item.id}
                  setEditComment={setCommentIndex}
                />
              </CommentBtnWrapper>
            )}
          </CommentWrapper>
        ))}
      </div>
      <PostComment
        register={register}
        handleSubmit={handleSubmit(createCommentHandleSubmit)}
      />
    </DetailContainter>
  );
}
