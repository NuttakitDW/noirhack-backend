import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { type CircuitName, toHexProof } from 'routes';
import { circuitProvers } from 'routes/prove';
import { verifyRoute } from 'routes/verify';
import { transformKeysToCamelCase } from 'utils';

describe('POST /echo', () => {
  const app = new Elysia().use(verifyRoute);

  it('Should response verify data by json body', async () => {
    const prover_payload = {
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

    const prover = circuitProvers[prover_payload.circuit_name as CircuitName];
    const result = await prover(transformKeysToCamelCase(prover_payload.data));

    const payload = {
      circuit_name: 'shuffle4',
      data: {
        public_inputs: result.proofData.publicInputs,
        proof: toHexProof(result.proofData).proof,
      },
    };

    const response = await app.handle(
      new Request('http://localhost/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }),
    );

    const json: any = await response.json();

    expect(response.status).toBe(200);
    expect(json.verified).toBeTrue();
  });
});
