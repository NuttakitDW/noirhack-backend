import { type ProofData, UltraHonkBackend } from '@aztec/bb.js';
import { type InputMap, Noir } from '@noir-lang/noir_js';
import { Mutex } from 'async-mutex';

export type UltraHonkBackendOptions = Parameters<UltraHonkBackend['generateProof']>[1];

export class ThreadSafeCircuit {
  private noir: Noir;
  private backend: UltraHonkBackend;
  private noirMutex = new Mutex();
  private backendMutex = new Mutex();

  constructor(private readonly circuitJson: any) {
    this.noir = new Noir(this.circuitJson);
    this.backend = new UltraHonkBackend(this.circuitJson.bytecode);
  }

  public async execute(inputs: InputMap) {
    return this.noirMutex.runExclusive(() => this.noir.execute(inputs));
  }

  public async generateProof(
    witness: Uint8Array,
    options?: UltraHonkBackendOptions,
  ): Promise<ProofData> {
    return this.backendMutex.runExclusive(() => this.backend.generateProof(witness, options));
  }

  public async verifyProof(
    proofData: ProofData,
    options?: UltraHonkBackendOptions,
  ): Promise<boolean> {
    return this.backendMutex.runExclusive(() => this.backend.verifyProof(proofData, options));
  }
}
