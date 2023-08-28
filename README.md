# 사전과제 7days

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


## Todo
* 게시글 CRUD 구현 : Done
* 댓글 CRUD 구현 : Done
* API 따로 관리하기 : Done
* 공통 컴포넌트화 : Done
* 공통 컴포넌트 스타일링 : Done
* useMemo , useCallback , memo 등 컴포넌트 최적화 렌더링 : Done
* Error 핸들링 = Done
* Jest testing 비동기 코드 위주의 테스트코드 예정 = Attempted failed


