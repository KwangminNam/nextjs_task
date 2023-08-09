"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import { PostType, apiModules } from "../utils/api";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";
import Unexpected from "./Unexpected";
import Loading from "./Loading";
import PageTitle from "./PageTitle";

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostListItem = styled.li`
  border-radius: 20px;
  position: relative;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  width: 500px;
  padding-right:20px;
  margin-bottom: 19px;
`;

const PostListItemTitle = styled.strong`
  font-size:18px;
  font-weight: bold;
`;

const PostListItemLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
  padding: 25px;
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
`;

const DetailText = styled.span`
  position: absolute;
  font-size: 12px;
  right: 75px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`;

export default function MainList() {
  const { getData, deleteData } = apiModules();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getData
  });


  const removeQuery = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      toast.success("삭제 완료!");
      router.refresh();
    },
    onError: (error:{
      message:string;
    })=>{
      toast.error(`${error.message}
      Json Server가 정상적으로 켜져있는지 확인하세요.`);
    }
  });

  const removeHandler = (id: number) => {
    const confirmRemove = confirm('삭제 하시겠습니까?');
    try {
      if (confirmRemove) {
        removeQuery.mutate(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data?.length === 0) {
    return <Unexpected title="등록된 게시글이 없습니다." />
  };

  if (isLoading) {
    return <Loading />
  };

  if (isError) {
    return <Unexpected title="잠시 후 다시 시도해주세요/" />
  };

  return (
    <main>
      <PageTitle title="리스트"/>
      <PostList>
        {data?.map((item) => (
          <PostListItem key={item.id}>
            <PostListItemLink
              href={`/post/${item.id}`}
            >
              <PostListItemTitle>제목:{item.title}</PostListItemTitle>
            </PostListItemLink>
            <RemoveButton
              onClick={() => {
                removeHandler(item.id);
              }}
            >
              <BsFillTrashFill size={30} color='#fff' />
            </RemoveButton>
            <DetailText>자세히 보기</DetailText>
          </PostListItem>
        ))}
      </PostList>
    </main>
  );
}
