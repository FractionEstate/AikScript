type ByteArray = Uint8Array;
type Int = bigint;
export declare function calculateMerkleRoot(leaves: ByteArray[]): ByteArray;
export declare function verifyMerkleProof(root: ByteArray, leaf: ByteArray, proof: ByteArray[], index: Int): boolean;
export declare function getMerkleProof(leaves: ByteArray[], index: Int): ByteArray[];
export declare function combineMerkleProofs(proof1: ByteArray[], proof2: ByteArray[]): ByteArray[];
export {};
//# sourceMappingURL=helpers.d.ts.map