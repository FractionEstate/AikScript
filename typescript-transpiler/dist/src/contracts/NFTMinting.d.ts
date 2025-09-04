import { Bool, ByteArray, PubKeyHash, ScriptContext } from '../types';
export declare class NFTMintingContract {
    [key: string]: unknown;
    mintDatum: {
        owner: PubKeyHash;
        tokenName: ByteArray;
        metadata: ByteArray;
    };
    mint(datum: {
        owner: PubKeyHash;
        tokenName: ByteArray;
        metadata: ByteArray;
    }, redeemer: void, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=NFTMinting.d.ts.map