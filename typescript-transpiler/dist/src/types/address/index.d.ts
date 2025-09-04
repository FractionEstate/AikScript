import { PubKeyHash, ScriptHash } from '../basic/index';
export type Address = string & {
    __brand: 'Address';
};
export type Credential = VerificationKeyCredential | ScriptCredential;
export interface AddressDetails {
    paymentCredential: Credential;
    stakeCredential?: Credential;
}
export interface VerificationKeyCredential {
    __brand: 'VerificationKeyCredential';
    hash: PubKeyHash;
}
export interface ScriptCredential {
    __brand: 'ScriptCredential';
    hash: ScriptHash;
}
//# sourceMappingURL=index.d.ts.map