"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import { PostType, apiModules } from "../utils/getData";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostListItem = styled.li`
  border-radius: 20px;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  width: 500px;
  padding-right:20px;
  margin-bottom: 19px;
`;

const RemoveButton = styled.button`
  background-color: #f04d4e;;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    border: 1px solid black;
  }
`

export default function MainList() {
  const { getData, deleteData } = apiModules();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getData
  });

  console.log(data);

  const removeQuery = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      toast.success("삭제 완료!");
      router.refresh();
    },
    onError: () => {
      toast.error("잠시 후 다시 시도해주세요.");
    }
  });

  const removeHandler = (id: number) => {
    const confirmRemove = confirm('삭제 하시겠습니까?');
    try {
      if(confirmRemove){
        removeQuery.mutate(id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <PostList>
        {data?.map((item) => (
          <PostListItem key={item.id}>
            <Link
              href={`/post/${item.id}`}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                padding: "25px"
              }}
            >
              <span>
                <strong>제목:</strong>
                {item.title}
              </span>
            </Link>
            <RemoveButton
              onClick={() => {
                removeHandler(item.id);
              }}
            >
              <BsFillTrashFill size={30} color='#fff' />
            </RemoveButton>
          </PostListItem>
        ))}
      </PostList>
    </main>
  );
}
