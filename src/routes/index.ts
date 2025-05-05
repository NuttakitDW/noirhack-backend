export enum CircuitName {
  GenElgamalKeyPair = 'genElgamalKeyPair',
  DecryptOneLayer = 'decryptOneLayer',
  Shuffle4 = 'shuffle4',
  VerifyCardMessage = 'verifyCardMessage',
}

export function toHexProof(proof: { publicInputs: string[]; proof: Uint8Array }): {
  publicInputs: string[];
  proof: string;
} {
  return {
    publicInputs: proof.publicInputs,
    proof: '0x' + Buffer.from(proof.proof).toString('hex'),
  };
}
