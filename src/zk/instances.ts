import decryptOneLayerCircuit from '../../circuits/decrypt_one_layer/decrypt_one_layer.json';
import genElgamalKeyPairCircuit from '../../circuits/gen_elgamal_key_pair/gen_elgamal_key_pair.json';
import shuffle4Circuit from '../../circuits/shuffle4/shuffle4.json';
import verifyCardMessageCircuit from '../../circuits/verify_card_message/verify_card_message.json';
import { ThreadSafeCircuit } from './thread_safe_circuit';

export const decryptOneLayer = new ThreadSafeCircuit(decryptOneLayerCircuit);
export const genElgamalKeyPair = new ThreadSafeCircuit(genElgamalKeyPairCircuit);
export const shuffle4 = new ThreadSafeCircuit(shuffle4Circuit);
export const verifyCardMessage = new ThreadSafeCircuit(verifyCardMessageCircuit);
