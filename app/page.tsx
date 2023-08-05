import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient"
import { getData } from "./utils/getData";
import MainList from "./components/MainList";

export default async function Home() {

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'],getData);
  const dehydratedState = dehydrate(queryClient);


  return (
    <Hydrate state={dehydratedState}>
      <MainList/>
    </Hydrate>
  )
}
