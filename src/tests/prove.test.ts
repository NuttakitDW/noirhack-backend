// import { describe, expect, it } from 'bun:test';
// import { Elysia } from 'elysia';
// import { proveRoute } from 'routes/prove';

// export const echoRoute = new Elysia().post('/echo', ({ body }) => {
//   return {
//     message: 'Received',
//     data: body,
//   };
// });

// describe('POST /echo', () => {
//   const app = new Elysia().use(echoRoute).use(proveRoute);

//   // it('should respond with the posted JSON body', async () => {
//   //   const payload = { name: 'Elysia', cool: true };

//   //   const response = await app.handle(
//   //     new Request('http://localhost/echo', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(payload),
//   //     }),
//   //   );

//   //   expect(response.status).toBe(200);
//   //   const json = await response.json();
//   //   console.log(json);

//   //   expect(json).toEqual({
//   //     message: 'Received',
//   //     data: payload,
//   //   });
//   // });

//   it('Should response prove data by json body', async () => {
//     const payload = {
//       circuit_name: 'shuffle4',
//       data: {
//         g: 3,
//         agg_pk: 17,
//         deck: [
//           [1, 1111],
//           [1, 2222],
//           [1, 3333],
//           [1, 4444],
//         ],
//         rand: [77, 88, 99, 111],
//         perm: [
//           [1, 0, 0, 0],
//           [0, 1, 0, 0],
//           [0, 0, 1, 0],
//           [0, 0, 0, 1],
//         ],
//       },
//     };

//     const response = await app.handle(
//       new Request('http://localhost/prove', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }),
//     );

//     const json: any = await response.json();
//     expect(response.status).toBe(400);
//     console.log(json);
//   });
// });
