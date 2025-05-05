import type { BigNumberish } from 'ethers';

import { isValidFieldInput } from '../utils';
import type {
  DecryptOneLayerInputs,
  GenElgamalKeyPairInputs,
  Shuffle4Inputs,
  VerifyCardMessageInputs,
} from './inputs';
import { decryptOneLayer, genElgamalKeyPair, shuffle4, verifyCardMessage } from './instances';
import type {
  DecryptOneLayerOutputs,
  GenElgamalKeyPairOutputs,
  Shuffle4Outputs,
  VerifyCardMessageOutputs,
} from './outputs';

export const decryptOneLayerVerifyInputs = (input: DecryptOneLayerInputs) => {
  const valid =
    isValidFieldInput(input.g) &&
    isValidFieldInput(input.sk) &&
    input.card.every(isValidFieldInput);
  if (!valid) {
    throw new Error('decryptOneLayerExecute: invalid inputs');
  }
};

export const decryptOneLayerExecute = async (
  inputs: DecryptOneLayerInputs,
): Promise<{
  witness: Uint8Array;
  outputs: DecryptOneLayerOutputs;
}> => {
  decryptOneLayerVerifyInputs(inputs);

  const executed = await decryptOneLayer.execute({
    g: inputs.g.toString(),
    card: inputs.card.map((v) => v.toString()),
    sk: inputs.sk.toString(),
  });

  return {
    witness: executed.witness,
    outputs: {
      decryptedCard: [
        (executed.returnValue as any)[0][0] as BigNumberish,
        (executed.returnValue as any)[0][1] as BigNumberish,
      ],
      decryptComponent: (executed.returnValue as any)[1] as BigNumberish,
    },
  };
};

export const genElgamalKeyPairVerifyInputs = (input: GenElgamalKeyPairInputs) => {
  const validInputs = isValidFieldInput(input.g) && isValidFieldInput(input.r);
  if (!validInputs) {
    throw new Error('genElgamalKeyPairExecute: invalid inputs');
  }
};

export const genElgamalKeyPairExecute = async (
  inputs: GenElgamalKeyPairInputs,
): Promise<{
  witness: Uint8Array;
  outputs: GenElgamalKeyPairOutputs;
}> => {
  genElgamalKeyPairVerifyInputs(inputs);

  const executed = await genElgamalKeyPair.execute({
    g: inputs.g.toString(),
    r: inputs.r.toString(),
  });
  return {
    witness: executed.witness,
    outputs: {
      sk: (executed.returnValue as any)[0] as BigNumberish,
      pk: (executed.returnValue as any)[1] as BigNumberish,
    },
  };
};

const makeShuffleExecute = <
  I extends {
    g: BigNumberish;
    aggPk: BigNumberish;
    deck: any;
    rand: any;
    perm: any;
  },
  O,
>(
  name: string,
  noir: any,
) => {
  const verify = (input: I) => {
    const valid = isValidFieldInput(input.g) && isValidFieldInput(input.aggPk);
    if (!valid) throw new Error(`${name}Execute: invalid inputs`);
  };

  const execute = async (inputs: I): Promise<{ witness: Uint8Array; outputs: O }> => {
    verify(inputs);

    const executed = await noir.execute({
      g: inputs.g.toString(),
      agg_pk: inputs.aggPk.toString(),
      deck: inputs.deck.map((pair: BigNumberish[]) => pair.map((x) => x.toString())),
      rand: inputs.rand.map((x: BigNumberish) => x.toString()),
      perm: inputs.perm.map((row: BigNumberish[]) => row.map((x) => x.toString())),
    });

    return {
      witness: executed.witness,
      outputs: {
        shuffledDeck: executed.returnValue as any,
      } as O,
    };
  };

  return { verifyInputs: verify, execute };
};

export const { verifyInputs: shuffle4VerifyInputs, execute: shuffle4Execute } = makeShuffleExecute<
  Shuffle4Inputs,
  Shuffle4Outputs
>('shuffle4', shuffle4);

export const verifyCardMessageVerifyInputs = (input: VerifyCardMessageInputs) => {
  const valid =
    isValidFieldInput(input.deckSize) &&
    isValidFieldInput(input.numDecryptComponents) &&
    isValidFieldInput(input.numExpectedMessages) &&
    isValidFieldInput(input.nullifierSecret);
  if (!valid) {
    throw new Error('verifyCardMessageExecute: invalid inputs');
  }
};

export const verifyCardMessageExecute = async (
  inputs: VerifyCardMessageInputs,
): Promise<{
  witness: Uint8Array;
  outputs: VerifyCardMessageOutputs;
}> => {
  verifyCardMessageVerifyInputs(inputs);

  const executed = await verifyCardMessage.execute({
    deck: inputs.deck.map((pair) => pair.map((x) => x.toString())),
    deck_size: inputs.deckSize.toString(),
    card: inputs.card.map((x) => x.toString()),
    decrypt_components: inputs.decryptComponents.map((x) => x.toString()),
    num_decrypt_components: inputs.numDecryptComponents.toString(),
    expected_messages: inputs.expectedMessages.map((x) => x.toString()),
    num_expected_messages: inputs.numExpectedMessages.toString(),
    nullifier_secret: inputs.nullifierSecret.toString(),
  });

  return {
    witness: executed.witness,
    outputs: executed.returnValue as BigNumberish,
  };
};
