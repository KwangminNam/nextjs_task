import getQueryClient from "@/app/getQueryClient";
import { getData } from "@/app/utils/getData";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import PostDetail from "./PostDetail";

export interface DetailParamsI {
  id: string;
}

export default async function Home({ params }: { params: DetailParamsI }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["posts"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PostDetail params={params} />
    </Hydrate>
  );
}
