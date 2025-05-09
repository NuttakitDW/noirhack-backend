import Elysia, { t } from 'elysia';
import { TypeCompiler } from 'elysia/type-system';

import { transformKeysToCamelCase, tStringEnum } from '../utils';
import {
  aggregatePublicKeysExecute,
  decryptOneLayerExecute,
  genElgamalKeyPairExecute,
  shuffle4Execute,
  verifyCardMessageExecute,
} from '../zk/execute';
import { CircuitName } from '.';
import { circuitInputSchemas } from './schemas';

export const circuitExecutors = {
  [CircuitName.AggregatePublicKeys]: aggregatePublicKeysExecute,
  [CircuitName.GenElgamalKeyPair]: genElgamalKeyPairExecute,
  [CircuitName.DecryptOneLayer]: decryptOneLayerExecute,
  [CircuitName.Shuffle4]: shuffle4Execute,
  [CircuitName.VerifyCardMessage]: verifyCardMessageExecute,
} as const;

export const executeRoute = new Elysia({ name: 'execute-route' }).post(
  '/execute',
  async ({ body, set }) => {
    const { circuit_name, data } = body;

    if (!(circuit_name in circuitExecutors)) {
      set.status = 400;
      return {
        ok: false,
        message: `Unsupported circuit name: ${circuit_name}`,
      };
    }

    const schema = circuitInputSchemas[circuit_name as CircuitName];
    const compiled = TypeCompiler.Compile(schema);
    const errors = [...compiled.Errors(data)];

    if (errors.length > 0) {
      set.status = 400;
      return {
        ok: false,
        message: 'Invalid input data',
        debug: errors.map((e) => ({
          path: e.path,
          expected: e.message,
          actual: e.value,
        })),
      };
    }

    const executor = circuitExecutors[circuit_name as CircuitName];
    const result = await executor(transformKeysToCamelCase(data));

    return {
      ok: true,
      code: 200,
      data: {
        outputs: result.outputs,
        witness: '0x' + Buffer.from(result.witness).toString('hex'),
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
