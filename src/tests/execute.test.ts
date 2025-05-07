import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { executeRoute } from 'routes/execute';

describe('POST /echo', () => {
  const app = new Elysia().use(executeRoute);

  it('Should response prove data by json body', async () => {
    const payload = {
      circuit_name: 'genElgamalKeyPair',
      data: {
        g: '5',
        r: '123456',
      },
    };

    const response = await app.handle(
      new Request('http://localhost/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
    );

    const json: any = await response.json();
    expect(response.status).toBe(200);
    console.log(json);
  });
});
