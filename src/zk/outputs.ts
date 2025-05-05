import type { BigNumberish } from 'ethers';

export type AggregatePublicKeysOutputs = BigNumberish;

export interface DecryptOneLayerOutputs {
  decryptedCard: [BigNumberish, BigNumberish];
  decryptComponent: BigNumberish;
}

export interface GenElgamalKeyPairOutputs {
  sk: BigNumberish;
  pk: BigNumberish;
}

export interface Shuffle4Outputs {
  shuffledDeck: [
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
  ];
}

export type VerifyCardMessageOutputs = BigNumberish;
