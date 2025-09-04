// Value and asset type definitions for AikScript
// Following aiken-lang patterns for modular organization

import { Ada, PolicyId, AssetName } from '../basic/index';

// Value type for representing Cardano values
export interface Value {
  ada: Ada;
  assets: Map<PolicyId, Map<AssetName, bigint>>;
}
