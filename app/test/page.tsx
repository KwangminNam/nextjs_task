import { Hydrate, dehydrate } from "@tanstack/react-query";
import TestClient from "./TestClient";
import getQueryClient from "../getQueryClient";
import { getData } from "../utils/getData";

export default async function Test() {

  const queryClinet = getQueryClient();
  await queryClinet.prefetchQuery(['posts'],getData);
  const dehydratedState = dehydrate(queryClinet);

  /*
  서버 컴퐅넌트에서 queryClient를 이용해서,
  pre-fetch 해온 데이터를 TestClient클라이언트 컴포넌트에게 전달
  Hydarte state 의 dehydratedState 값을 전달해주면 리액트쿼리에서 fetch 해온 posts 키의
  데이터는 pre-fetch 된 데이터기 때문에 SSR이 가능
  */
  return (
    <Hydrate state={dehydratedState}>
      <TestClient/>
    </Hydrate>
  )
}
