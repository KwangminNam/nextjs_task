## Prject 
* Next.js 13 (Latest version)
* Typescript
* Json-server
* React Query
* Styled-compoennts
* react-hook-form
* react-toast
* axios
* jest

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


## Issue
* Next.js13 에서 React-query 로 SSR 및 hydrate 구현 관련 블로그

* Next.js13 에서 Styled-components를 적용할때 생기는 이슈 해결 관련 블로그

* react-hook-form을 사용하여 input focus를 주려고 했지만 , useRef 사용시 "'ref' is specified more than once, so this usage will be overwritten." 에러
 생각해보니.. 당연하게도 react-hook-form에서 register로 이미 input의 ref에 접근 하고있어서 중복 에러. react-hook-form 에서 제공하는 setFocus 이용해서 focus event 해결완료!

* jest로 fetching 해오는 데이터를 MSW mock데이터로 이용하려했으나 Next.js13에서 지원이 안되는거같다.. 
https://mswjs.io/
https://github.com/mswjs/msw/discussions/1498
-- youtuber 발견:https://www.youtube.com/watch?v=Q-Sg4p_iQvw&t=469s


## Todo

* 게시글 CRUD 구현 = Done
* 댓글 CRUD 구현 = Done
* 공통 컴포넌트화 = Ing
* 공통 컴포넌트 스타일링 = Ing
* useMemo , useCallback , memo 등 컴포넌트 최적화 렌더링 = Ing
* Jest testing 비동기 코드 위주의 테스트코드 예정 = Ing
* Error 핸들링 = Ing
