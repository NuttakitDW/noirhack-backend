import type { BigNumberish } from 'ethers';

export type AggregatePublicKeysInputs = {
  pks: [
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
  ];
  numPks: BigNumberish;
};

export type DecryptOneLayerInputs = {
  g: BigNumberish;
  card: [BigNumberish, BigNumberish];
  sk: BigNumberish;
};

export type GenElgamalKeyPairInputs = {
  g: BigNumberish;
  r: BigNumberish;
};

export type Shuffle4Inputs = {
  g: BigNumberish;
  aggPk: BigNumberish;
  deck: [
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
  ];
  rand: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
  perm: [
    [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
  ];
};

export type VerifyCardMessageInputs = {
  deck: [
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
    [BigNumberish, BigNumberish],
  ];
  deckSize: BigNumberish;
  card: [BigNumberish, BigNumberish];
  decryptComponents: [
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
  ];
  numDecryptComponents: BigNumberish;
  expectedMessages: [
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
    BigNumberish,
  ];
  numExpectedMessages: BigNumberish;
  nullifierSecret: BigNumberish;
};
