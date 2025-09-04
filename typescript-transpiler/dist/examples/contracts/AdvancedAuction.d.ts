type PubKeyHash = string;
/**
 * Advanced AikScript example demonstrating all major Aiken features
 * This contract implements a sophisticated NFT marketplace with auctions
 */
export type AuctionId = string;
export type BidAmount = number;
export type AuctionState = 'Active' | 'Ended' | 'Cancelled';
export interface Auction<T> {
    id: AuctionId;
    seller: PubKeyHash;
    asset: T;
    startingPrice: BidAmount;
    currentBid?: BidAmount;
    highestBidder?: PubKeyHash;
    endTime: number;
    state: AuctionState;
}
export declare const AUCTION_FEE_PERCENTAGE: number;
export declare const MINIMUM_BID_INCREMENT: BidAmount;
export declare function createAuction<T>(seller: PubKeyHash, asset: T, startingPrice: BidAmount, duration: number): Auction<T>;
export declare function placeBid<T>(auction: Auction<T>, bidder: PubKeyHash, bidAmount: BidAmount): Auction<T> | string;
export declare function endAuction<T>(auction: Auction<T>): Auction<T> | string;
export declare function calculateFee(amount: BidAmount): BidAmount;
export declare function testCreateAuction(): boolean;
export declare function testPlaceBidSuccess(): boolean;
export declare function testPlaceBidTooLow(): boolean;
export {};
//# sourceMappingURL=AdvancedAuction.d.ts.map