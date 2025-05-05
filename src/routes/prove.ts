import { Elysia, t } from 'elysia';
import { TypeCompiler } from 'elysia/type-system';

import { transformKeysToCamelCase, tStringEnum } from '../utils';
import {
  aggregatePublicKeysProve,
  decryptOneLayerProve,
  genElgamalKeyPairProve,
  shuffle4Prove,
  verifyCardMessageProve,
} from '../zk/prove';
import { CircuitName, toHexProof } from '.';
import { circuitInputSchemas } from './schemas';

export const circuitProvers = {
  [CircuitName.AggregatePublicKeys]: aggregatePublicKeysProve,
  [CircuitName.GenElgamalKeyPair]: genElgamalKeyPairProve,
  [CircuitName.DecryptOneLayer]: decryptOneLayerProve,
  [CircuitName.Shuffle4]: shuffle4Prove,
  [CircuitName.VerifyCardMessage]: verifyCardMessageProve,
} as const;

export const proveRoute = new Elysia({ name: 'prove-route' }).post(
  '/prove',
  async ({ body }) => {
    const { circuit_name, data } = body;

    if (!(circuit_name in circuitProvers)) {
      return {
        ok: false,
        code: 400,
        message: `Unsupported circuit name: ${circuit_name}`,
      };
    }

    const schema = circuitInputSchemas[circuit_name as CircuitName];
    const compiled = TypeCompiler.Compile(schema);
    const errors = [...compiled.Errors(data)];

    if (errors.length > 0) {
      return {
        ok: false,
        code: 400,
        message: 'Invalid input data',
        debug: errors.map((e) => ({
          path: e.path,
          expected: e.message,
          actual: e.value,
        })),
      };
    }

    const prover = circuitProvers[circuit_name as CircuitName];
    const result = await prover(transformKeysToCamelCase(data));

    return {
      ok: true,
      code: 200,
      data: {
        outputs: result.outputs,
        public_inputs: result.proofData.publicInputs,
        proof: toHexProof(result.proofData).proof,
      },
    };
  },
  {
    body: t.Object({
      circuit_name: tStringEnum(Object.values(CircuitName)),
      data: t.Unknown(),
    }),
  },
);
