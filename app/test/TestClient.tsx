"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/getData";

export default function TestClient() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getData });
  //비교를 위해 client side rendering 차이점은 , hydrate 로 된 ['post']키가 아님.
  const { data:clientData } = useQuery({ queryKey: ["postsClients"], queryFn: getData });

  return (
    <div style={{display:'flex'}}>
      <div>
        <h1>Server side render</h1>
        {data.map((item: any) => (
          <div>{item.title}</div>
        ))}
      </div>
      <div>
        <h1>Client side render</h1>
        {clientData?.map((item: any) => (
          <div>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
