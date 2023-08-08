import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import PostDetail from "./PostDetail";
import { apiModules } from "@/app/utils/api";

//TODO: 공통 타입으로 따로 관리하기.
export interface DetailParamsI {
  id: string;
}

export default async function Home({ params }: { params: DetailParamsI }) {
  const { getData , getComment } = apiModules();

  // 서버사이드 렌더링을위해 포스트글 , 댓글 총 두개 hydrate를 해서 SSR 구현.
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["posts"], getData);
  await queryClient.prefetchQuery(["comments"], getComment);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PostDetail params={params} />
    </Hydrate>
  );
}
