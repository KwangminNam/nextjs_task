## Project
* Next.js 13 (Latest version)
* Typescript
* Json-server
* React Query
* Styled-compoennts
* react-hook-form
* react-toast
* axios
* jest
* react-spinners
* react-icons

## Requirements
```sh
node >= 16
```

## Command line
```sh
npm install
```

```sh
npm run dev
```

### Json server

```sh
json-server --watch ./app/db/data.json --port 3001  
```

## Test
```sh
npm run test
```


## File structure
* app > page.tsx > MainList.tsx // 메인페이지
* app > wrtie > page.tsx > WriteClient.tsx // 게시글 작성 페이지
* app > post/[id] > page.tsx > PostDetail.tsx // 게시글 상세 페이지 (댓글 feature 및 컴포넌트 포함)
* app > edit/[id] > pages.tsx > EditClient.tsx // 게시글 수정 페이지

* app > components // 공통 컴포넌트
* app > utils > api.ts // 게시글 및 댓글 CRUD api 따로 관리

* app > db > data.json // json-server data




## Issue
* [Next.js13 에서 React-query 로 SSR 및 hydrate 구현 관련 블로그 포스트 보러가기](https://fe-kwangmin.tistory.com/46)
* [Next.js13 에서 Styled-components를 적용할때 생기는 이슈 해결 관련 블로그 포스트 보러가기](https://fe-kwangmin.tistory.com/47) 

* 보다 나은 UX를 위해 커서를 올리기전에, input focus를 주려고 했지만 , useRef 사용시 "'ref' is specified more than once, so this usage will be overwritten." 에러 발생
 생각해보니.. 당연하게도 react-hook-form에서 register로 이미 input의 ref에 접근 하고있어서 중복 에러. react-hook-form 에서 제공하는 setFocus 이용해서 focus event 해결완료!

* app-index.js:31 Warning: Prop `className` did not match 콘솔에 에러출력
 해결방법 2~3가지를 찾아서 시도해봤지만 콘솔에 여전히 에러출력..
 그러나 스타일 컴포넌트가 늦게적용되거나 하는경우는 없고 스타일 적용도 잘됨.

* jest로 api call 비동기 테스트를 시도, 데이터를 MSW mock데이터로 이용하려했으나 Next.js13에서 지원이 안되는거같다.. 
관련 ref:https://github.com/mswjs/msw/discussions/1498


## useMemo , useCallback
* [useCallback, useMemo reference](https://www.rinae.dev/posts/review-when-to-usememo-and-usecallback)

useMemo , useCallback 을 사용할때 항상 메모이제이션이 얼만큼 expensive 한 값 또는 함수인지 고려해야 해서 검색해보면서 React.memo 와 함께 적용 해봤습니다.

## Todo
* 게시글 CRUD 구현 : Done
* 댓글 CRUD 구현 : Done
* API 따로 관리하기 : Done
* 공통 컴포넌트화 : Done
* 공통 컴포넌트 스타일링 : Done
* useMemo , useCallback , memo 등 컴포넌트 최적화 렌더링 : Done
* Error 핸들링 = Done
* Jest testing 비동기 코드 위주의 테스트코드 예정 = Attempted failed

 ## 마치면서
 우선 다행히 next.js 13로 사이드프로젝트를 진행했어서 구현하는데 큰 어려움은 없었지만, 평소에 자주 사용하지 않았던 기술로 next.js13 에서 CRUD 구현 하는것에 재미있었습니다.
 
 이번 과제를 통해 react-query로 next.js13에서 어떻게 ssr 및 hydrate를 구현하는지 배우고 덕분에 블로그 포스팅도 했습니다. 
 
 jest를 써보면서, 아직 실제 프로젝트에서 어떤 코드를 테스트를 해야하는지 감이 잘 오진 않지만, jest도 평소에 관심이 있었던 라이브러리라서, 이번 기회에 공부하면서 쓸 수 있어서 좋았습니다.
 
 api 호출 하는 test 코드를 msw mock api가 아직 next.js13에 지원하지않은거같아서 아쉬웠지만 이번 과제로 많이 배우기도하고 복습 또한 된것같습니다.
 
 이상 마치면서, 감사합니다.
