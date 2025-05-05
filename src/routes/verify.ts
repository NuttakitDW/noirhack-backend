import Elysia, { t } from 'elysia';
import {
  aggregatePublicKeys,
  decryptOneLayer,
  genElgamalKeyPair,
  shuffle4,
  verifyCardMessage,
} from 'zk/instances';

import { hexToUint8Array, tStringEnum } from '../utils';
import { CircuitName } from '.';

const circuitVerifiers = {
  [CircuitName.AggregatePublicKeys]: aggregatePublicKeys.verifyProof.bind(aggregatePublicKeys),
  [CircuitName.GenElgamalKeyPair]: genElgamalKeyPair.verifyProof.bind(genElgamalKeyPair),
  [CircuitName.DecryptOneLayer]: decryptOneLayer.verifyProof.bind(decryptOneLayer),
  [CircuitName.Shuffle4]: shuffle4.verifyProof.bind(shuffle4),
  [CircuitName.VerifyCardMessage]: verifyCardMessage.verifyProof.bind(verifyCardMessage),
} as const;

export const verifyRoute = new Elysia({ name: 'verify-route' }).post(
  '/verify',
  async ({ body }) => {
    const { circuit_name, data } = body;

    if (!(circuit_name in circuitVerifiers)) {
      return {
        ok: false,
        code: 400,
        message: `Unsupported circuit name: ${circuit_name}`,
      };
    }

    const parsedProof = {
      publicInputs: data.public_inputs,
      proof: hexToUint8Array(data.proof.replace(/^0x/, '')),
    };

    const verifier = circuitVerifiers[circuit_name as CircuitName];

    try {
      const verified = await verifier(parsedProof);

      return {
        ok: true,
        code: 200,
        verified,
      };
    } catch (e) {
      console.warn(`Verification failed for circuit ${circuit_name}:`, (e as Error).message);

      return {
        ok: true,
        code: 200,
        verified: false,
      };
    }
  },
  {
    body: t.Object({
      circuit_name: tStringEnum(Object.values(CircuitName)),
      data: t.Object({
        public_inputs: t.Array(t.String()),
        proof: t.String(),
      }),
    }),
  },
);
