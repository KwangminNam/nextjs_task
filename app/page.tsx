import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";
import MainList from "./components/MainList";
import { apiModules } from "./utils/getData";

export default async function Home() {
  const { getData, deletePost } = apiModules();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["posts"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainList />
    </Hydrate>
  );
}
