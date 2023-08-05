"use client";

import { useQuery } from "@tanstack/react-query";
import { DetailParamsI } from "./page";
import Link from "next/link";
import { apiModules } from "@/app/utils/getData";

export default function PostDetail({ params }: { params: DetailParamsI }) {
  const { getData } = apiModules();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData
  });

  const detailPost = data?.find((item) => item.id === +params.id);

  if (!detailPost) {
    return <div>NO DETAIL PAGE</div>;
  }

  if (isLoading) {
    return <div>LOADING</div>;
  }

  const { title, id, comment } = detailPost;

  return (
    <>
      아이디:{id}제목:{title}
      {!comment ? (
        <div>댓글이 없습니다.</div>
      ) : (
        comment.map((item) => <div>{item.content}</div>)
      )}
      <Link href={`/edit/${id}`}>수정하기</Link>
    </>
  );
}
