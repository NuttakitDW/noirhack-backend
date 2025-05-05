import { Kind, type StringOptions, type TSchema, Type, TypeRegistry } from '@sinclair/typebox';
import type { BigNumberish } from 'ethers';
import { isHexString } from 'ethers';

const BN254_PRIME = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

export const isValidFieldInput = (v: BigNumberish): boolean => {
  if (typeof v === 'bigint') return v >= 0n && v < BN254_PRIME;
  if (typeof v === 'number') return v >= 0 && v < 2 ** 53;
  if (typeof v === 'string') {
    if (v.startsWith('0x') || v.startsWith('0X')) return isHexString(v) && BigInt(v) < BN254_PRIME;
    return BigInt(v) < BN254_PRIME;
  }
  return false;
};

export function makeTuple(length: number, item: any) {
  return Type.Tuple(Array.from({ length }, () => item));
}

export function makeMatrix(size: number) {
  return makeTuple(size, makeTuple(size, Type.String()));
}

export function makeDeck(size: number) {
  return makeTuple(size, Type.Tuple([Type.String(), Type.String()]));
}

export function makeRand(size: number) {
  return makeTuple(size, Type.String());
}

export type TStringEnum = TSchema &
  StringOptions & {
    [Kind]: 'StringEnum';
    static: string;
    type: 'string';
    enum: string[];
  };

export const tStringEnum = (enumStrings: string[], options: StringOptions = {}): TStringEnum => {
  return {
    ...options,
    enum: enumStrings,
    type: 'string',
    [Kind]: 'StringEnum',
    error: `Invalid enum value. Expected one of: [${enumStrings.join(', ')}]`,
  } as TStringEnum;
};

TypeRegistry.Set<TStringEnum>(
  'StringEnum',
  (schema, value) => typeof value === 'string' && schema.enum.includes(value),
);

export function hexToUint8Array(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function transformKeysToCamelCase(input: any): any {
  if (Array.isArray(input)) {
    return input.map(transformKeysToCamelCase);
  } else if (input !== null && typeof input === 'object') {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = transformKeysToCamelCase(value);
      return acc;
    }, {} as any);
  } else {
    return input;
  }
}
