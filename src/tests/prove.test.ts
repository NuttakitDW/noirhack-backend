import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { type CircuitName, toHexProof } from 'routes';
import { circuitProvers, proveRoute } from 'routes/prove';
import { transformKeysToCamelCase } from 'utils';

describe('POST /echo', () => {
  const app = new Elysia().use(proveRoute);

  it('Should response prove data by json body', async () => {
    const payload = {
      circuit_name: 'shuffle4',
      data: {
        g: '3',
        agg_pk: '17',
        deck: [
          ['1', '10'],
          ['1', '20'],
          ['1', '30'],
          ['1', '40'],
        ],
        rand: ['77', '88', '99', '111'],
        perm: [
          ['1', '0', '0', '0'],
          ['0', '1', '0', '0'],
          ['0', '0', '1', '0'],
          ['0', '0', '0', '1'],
        ],
      },
    };

    const response = await app.handle(
      new Request('http://localhost/prove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
    );

    const prover = circuitProvers[payload.circuit_name as CircuitName];
    const result = await prover(transformKeysToCamelCase(payload.data));

    const json: any = await response.json();

    const data = {
      outputs: result.outputs,
      public_inputs: result.proofData.publicInputs,
      proof: toHexProof(result.proofData).proof,
    };

    expect(response.status).toBe(200);
    expect(json.data).toEqual(data);
  });
});
