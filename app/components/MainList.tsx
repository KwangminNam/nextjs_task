"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import { PostType, apiModules } from "../utils/getData";
import { useRouter } from "next/navigation";
// import { deletePost, getData } from "../utils/getData";

const List = styled.li`
  border-radius: 20px;
  border: 1px solid #555;
  display: flex;
  width: 500px;
  margin-bottom: 19px;
`;

export default function MainList() {
  const {getData,deleteData} = apiModules();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ['posts'],
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

  const removeHandler = async (id: number) => {
    try {
      await removeQuery.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <ul>
        {data?.map((item) => (
          <List>
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
            <button
              onClick={() => {
                removeHandler(item.id);
              }}
            >
              DELETE
            </button>
          </List>
        ))}
      </ul>
    </main>
  );
}
