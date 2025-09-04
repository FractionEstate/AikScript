import { Ada, PolicyId, AssetName } from '../basic/index';
export interface Value {
    ada: Ada;
    assets: Map<PolicyId, Map<AssetName, bigint>>;
}
//# sourceMappingURL=index.d.ts.map