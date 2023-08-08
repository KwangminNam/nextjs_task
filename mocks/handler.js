import { rest } from "msw";

export const handlers = [
  rest.get('http://localhost:3001/posts', (req, res, ctx) => {
    return res(ctx.status(200)),
      ctx.json([
        {
          title: 'test',
          id: '1',
          content: 'test content1'
        },
        {
          title: 'test2',
          id: '2',
          content: 'test content2'
        },
        {
          title: 'test3',
          id: '3',
          content: 'test content3'
        },
      ])
  })
]