// Cardano types (will be imported from transpiler)
type PubKeyHash = string;
type POSIXTime = number;
type Bool = boolean;
type Int = number;
type ByteArray = Uint8Array;
type String = string;

/**
 * Advanced AikScript example demonstrating all major Aiken features
 * This contract implements a sophisticated NFT marketplace with auctions
 */

// Opaque types for type safety (using TypeScript type aliases)
export type AuctionId = string; // Will be transpiled to opaque ByteArray
export type BidAmount = number; // Will be transpiled to Int
export type AuctionState = 'Active' | 'Ended' | 'Cancelled';

// Generic types
export interface Auction<T> {
  id: AuctionId;
  seller: PubKeyHash;
  asset: T;
  startingPrice: BidAmount;
  currentBid?: BidAmount;
  highestBidder?: PubKeyHash;
  endTime: number; // POSIXTime
  state: AuctionState;
}

// Constants
export const AUCTION_FEE_PERCENTAGE: number = 5;
export const MINIMUM_BID_INCREMENT: BidAmount = 1000000; // 1 ADA in lovelace

// Public functions
export function createAuction<T>(
  seller: PubKeyHash,
  asset: T,
  startingPrice: BidAmount,
  duration: number
): Auction<T> {
  return {
    id: generateAuctionId(seller, asset),
    seller,
    asset,
    startingPrice,
    currentBid: undefined,
    highestBidder: undefined,
    endTime: Date.now() + duration,
    state: 'Active',
  };
}

export function placeBid<T>(
  auction: Auction<T>,
  bidder: PubKeyHash,
  bidAmount: BidAmount
): Auction<T> | string {
  if (auction.state !== 'Active') {
    return 'Auction not active';
  }

  if (auction.currentBid !== undefined) {
    if (bidAmount > auction.currentBid + MINIMUM_BID_INCREMENT) {
      return {
        ...auction,
        currentBid: bidAmount,
        highestBidder: bidder,
      };
    } else {
      return 'Bid too low';
    }
  } else {
    if (bidAmount >= auction.startingPrice) {
      return {
        ...auction,
        currentBid: bidAmount,
        highestBidder: bidder,
      };
    } else {
      return 'Bid below starting price';
    }
  }
}

export function endAuction<T>(auction: Auction<T>): Auction<T> | string {
  if (Date.now() >= auction.endTime) {
    return {
      ...auction,
      state: 'Ended',
    };
  } else {
    return 'Auction not ended yet';
  }
}

export function calculateFee(amount: BidAmount): BidAmount {
  return (amount * AUCTION_FEE_PERCENTAGE) / 100;
}

// Private helper functions
function generateAuctionId<T>(seller: PubKeyHash, asset: T): AuctionId {
  // Simplified ID generation - in real Aiken this would use cryptographic functions
  return `auction_${seller}_${JSON.stringify(asset)}`;
}

// Test functions
export function testCreateAuction(): boolean {
  const seller: PubKeyHash = '00112233445566778899aabbccddeeff00112233445566778899aabbcc';
  const asset = 'NFT-001';
  const startingPrice = 5000000;
  const duration = 86400; // 1 day in seconds

  const auction = createAuction(seller, asset, startingPrice, duration);

  return auction.seller === seller &&
         auction.asset === asset &&
         auction.startingPrice === startingPrice &&
         auction.state === 'Active';
}

export function testPlaceBidSuccess(): boolean {
  const auction = createAuction(
    '00112233445566778899aabbccddeeff00112233445566778899aabbcc',
    'NFT-001',
    5000000,
    86400
  );

  const bidder: PubKeyHash = 'ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433';
  const bidAmount = 6000000;

  const result = placeBid(auction, bidder, bidAmount);

  if (typeof result === 'string') {
    return false;
  }

  return result.currentBid === bidAmount &&
         result.highestBidder === bidder;
}

export function testPlaceBidTooLow(): boolean {
  const auction = createAuction(
    '00112233445566778899aabbccddeeff00112233445566778899aabbcc',
    'NFT-001',
    5000000,
    86400
  );

  const bidder: PubKeyHash = 'ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433';
  const bidAmount = 5100000; // Only 0.1 ADA increment, too low

  const result = placeBid(auction, bidder, bidAmount);

  return typeof result === 'string' && result === 'Bid too low';
}
