/**
 * Utility functions for AikScript contracts
 */

// Common validation helpers
export function validateSignature(tx: any, pubKeyHash: any): boolean {
  return tx.isSignedBy(pubKeyHash);
}

export function validateTimeRange(tx: any, startTime: any, endTime?: any): boolean {
  const currentTime = tx.validityRange.start;
  if (endTime) {
    return currentTime >= startTime && currentTime <= endTime;
  }
  return currentTime >= startTime;
}

// Common data constructors
export function createDatum(fields: Record<string, any>): any {
  return fields;
}

export function createRedeemer(action: string, data?: any): any {
  return data || action;
}
