export declare function keccak256(input: Uint8Array): Uint8Array;
export declare function bytesToHex(bytes: Uint8Array): `0x${string}`;
export declare function keccak256Hex(input: string | Uint8Array): `0x${string}`;
/** First four bytes of keccak256 of a canonical function signature, e.g. `isAllowed(address)`. */
export declare function functionSelector(signature: string): `0x${string}`;
/** EIP-55 mixed-case checksum of a 20-byte hex address. Throws on malformed input. */
export declare function checksumAddress(address: string): `0x${string}`;
