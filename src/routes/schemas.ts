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
    aggPk: Type.String(),
    deck: makeDeck(4),
    rand: makeRand(4),
    perm: makeMatrix(4),
  }),
  [CircuitName.VerifyCardMessage]: Type.Object({
    deck: makeDeck(10),
    deckSize: Type.String(),
    card: Type.Tuple([Type.String(), Type.String()]),
    decryptComponents: makeRand(10),
    numDecryptComponents: Type.String(),
    expectedMessages: makeRand(10),
    numExpectedMessages: Type.String(),
    nullifierSecret: Type.String(),
  }),
} as const;
