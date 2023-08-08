import { DetailParamsI } from '@/app/post/[id]/page'
import EditClient from './EditClient'
import getQueryClient from '@/app/getQueryClient';
import { apiModules } from '@/app/utils/api';
import { Hydrate, dehydrate } from '@tanstack/react-query';

export default async function page({params}:{params :DetailParamsI}) {
  const { getData } = apiModules();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["posts"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <EditClient params={params}/>
    </Hydrate>
  )
}
