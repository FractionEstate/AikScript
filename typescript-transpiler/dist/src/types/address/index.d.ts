import { ByteArray } from '../basic/index';
export type Credential = {
    verificationKey: ByteArray;
} | {
    script: ByteArray;
};
export type PaymentCredential = Credential;
export type StakeCredential = Credential;
export interface Address {
    paymentCredential: PaymentCredential;
    stakeCredential?: StakeCredential;
}
//# sourceMappingURL=index.d.ts.map