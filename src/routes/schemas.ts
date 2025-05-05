import { Type } from '@sinclair/typebox';

import { makeDeck, makeMatrix, makeRand } from '../utils';
import { CircuitName } from '.';

export const circuitInputSchemas = {
  [CircuitName.GenElgamalKeyPair]: Type.Object({
    g: Type.String(),
    r: Type.String(),
  }),
  [CircuitName.DecryptOneLayer]: Type.Object({
    g: Type.String(),
    card: Type.Tuple([Type.String(), Type.String()]),
    sk: Type.String(),
  }),
  [CircuitName.Shuffle4]: Type.Object({
    g: Type.String(),
    agg_pk: Type.String(),
    deck: makeDeck(4),
    rand: makeRand(4),
    perm: makeMatrix(4),
  }),
  [CircuitName.VerifyCardMessage]: Type.Object({
    deck: makeDeck(10),
    deck_size: Type.String(),
    card: Type.Tuple([Type.String(), Type.String()]),
    decrypt_components: makeRand(10),
    num_decrypt_components: Type.String(),
    expected_messages: makeRand(10),
    num_expected_messages: Type.String(),
    nullifier_secret: Type.String(),
  }),
} as const;
