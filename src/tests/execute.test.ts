import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import type { CircuitName } from 'routes';
import { circuitExecutors, executeRoute } from 'routes/execute';
import { transformKeysToCamelCase } from 'utils';

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

    const executor = circuitExecutors[payload.circuit_name as CircuitName];
    const result = await executor(transformKeysToCamelCase(payload.data));

    const json: any = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual({
      ...result,
      witness: '0x' + Buffer.from(result.witness).toString('hex'),
    });
  });
});
