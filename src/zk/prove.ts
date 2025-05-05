import type { ProofData } from '@aztec/bb.js';

import {
  aggregatePublicKeysExecute,
  decryptOneLayerExecute,
  genElgamalKeyPairExecute,
  shuffle4Execute,
  verifyCardMessageExecute,
} from './execute';
import type {
  AggregatePublicKeysInputs,
  DecryptOneLayerInputs,
  GenElgamalKeyPairInputs,
  Shuffle4Inputs,
  VerifyCardMessageInputs,
} from './inputs';
import {
  aggregatePublicKeys,
  decryptOneLayer,
  genElgamalKeyPair,
  shuffle4,
  verifyCardMessage,
} from './instances';
import type {
  AggregatePublicKeysOutputs,
  DecryptOneLayerOutputs,
  GenElgamalKeyPairOutputs,
  Shuffle4Outputs,
  VerifyCardMessageOutputs,
} from './outputs';

export const aggregatePublicKeysProve = async (
  inputs: AggregatePublicKeysInputs,
): Promise<{
  proofData: ProofData;
  outputs: AggregatePublicKeysOutputs;
}> => {
  const executed = await aggregatePublicKeysExecute(inputs);
  const proved = await aggregatePublicKeys.generateProof(executed.witness);
  return {
    proofData: proved,
    outputs: executed.outputs,
  };
};

export const decryptOneLayerProve = async (
  inputs: DecryptOneLayerInputs,
): Promise<{
  proofData: ProofData;
  outputs: DecryptOneLayerOutputs;
}> => {
  const executed = await decryptOneLayerExecute(inputs);
  const proved = await decryptOneLayer.generateProof(executed.witness);
  return {
    proofData: proved,
    outputs: executed.outputs,
  };
};

export const genElgamalKeyPairProve = async (
  inputs: GenElgamalKeyPairInputs,
): Promise<{
  proofData: ProofData;
  outputs: GenElgamalKeyPairOutputs;
}> => {
  const executed = await genElgamalKeyPairExecute(inputs);
  const proved = await genElgamalKeyPair.generateProof(executed.witness);
  return {
    proofData: proved,
    outputs: executed.outputs,
  };
};

export const makeShuffleProve = <I, O>(
  execute: (inputs: I) => Promise<{ witness: Uint8Array; outputs: O }>,
  backend: { generateProof(witness: Uint8Array): Promise<ProofData> },
) => {
  return async (inputs: I): Promise<{ proofData: ProofData; outputs: O }> => {
    const executed = await execute(inputs);
    const proved = await backend.generateProof(executed.witness);
    return { proofData: proved, outputs: executed.outputs };
  };
};

export const shuffle4Prove = makeShuffleProve<Shuffle4Inputs, Shuffle4Outputs>(
  shuffle4Execute,
  shuffle4,
);

export const verifyCardMessageProve = async (
  inputs: VerifyCardMessageInputs,
): Promise<{
  proofData: ProofData;
  outputs: VerifyCardMessageOutputs;
}> => {
  const executed = await verifyCardMessageExecute(inputs);
  const proved = await verifyCardMessage.generateProof(executed.witness);
  return {
    proofData: proved,
    outputs: executed.outputs,
  };
};
