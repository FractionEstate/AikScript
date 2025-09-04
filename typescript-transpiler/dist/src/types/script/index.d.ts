import { Transaction, TxOutRef } from '../transaction/index';
import { Credential } from '../address/index';
export interface ScriptContext {
    transaction: Transaction;
    purpose: ScriptPurpose;
    spendingTxOutRef?: TxOutRef;
}
export type ScriptPurpose = {
    type: 'spend';
    txOutRef: TxOutRef;
} | {
    type: 'mint';
    policyId: string;
} | {
    type: 'withdraw';
    stakeCredential: Credential;
} | {
    type: 'publish';
};
//# sourceMappingURL=index.d.ts.map