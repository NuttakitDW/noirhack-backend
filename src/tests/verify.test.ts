// // test/index.test.ts
// import { describe, expect, it } from 'bun:test';
// import { Elysia } from 'elysia';

// export const echoRoute = new Elysia().post('/echo', ({ body }) => {
//   return {
//     message: 'Received',
//     data: body,
//   };
// });

// // describe('Elysia', () => {
// //   it('return a response', async () => {
// //     const app = new Elysia().get('/', () => 'hi');

// //     const response = await app.handle(new Request('http://localhost/')).then((res) => res.text());

// //     expect(response).toBe('hi');
// //   });
// // });

// describe('POST /echo', () => {
//   const app = new Elysia().use(echoRoute);

//   it('should respond with the posted JSON body', async () => {
//     const payload = { name: 'Elysia', cool: true };

//     const response = await app.handle(
//       new Request('http://localhost/echo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }),
//     );

//     expect(response.status).toBe(200);
//     const json = await response.json();

//     expect(json).toEqual({
//       message: 'Received',
//       data: 'a',
//     });
//   });
// });
