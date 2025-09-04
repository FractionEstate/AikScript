"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_BID_INCREMENT = exports.AUCTION_FEE_PERCENTAGE = void 0;
exports.createAuction = createAuction;
exports.placeBid = placeBid;
exports.endAuction = endAuction;
exports.calculateFee = calculateFee;
exports.testCreateAuction = testCreateAuction;
exports.testPlaceBidSuccess = testPlaceBidSuccess;
exports.testPlaceBidTooLow = testPlaceBidTooLow;
// Constants
exports.AUCTION_FEE_PERCENTAGE = 5;
exports.MINIMUM_BID_INCREMENT = 1000000; // 1 ADA in lovelace
// Public functions
function createAuction(seller, asset, startingPrice, duration) {
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
function placeBid(auction, bidder, bidAmount) {
    if (auction.state !== 'Active') {
        return 'Auction not active';
    }
    if (auction.currentBid !== undefined) {
        if (bidAmount > auction.currentBid + exports.MINIMUM_BID_INCREMENT) {
            return {
                ...auction,
                currentBid: bidAmount,
                highestBidder: bidder,
            };
        }
        else {
            return 'Bid too low';
        }
    }
    else {
        if (bidAmount >= auction.startingPrice) {
            return {
                ...auction,
                currentBid: bidAmount,
                highestBidder: bidder,
            };
        }
        else {
            return 'Bid below starting price';
        }
    }
}
function endAuction(auction) {
    if (Date.now() >= auction.endTime) {
        return {
            ...auction,
            state: 'Ended',
        };
    }
    else {
        return 'Auction not ended yet';
    }
}
function calculateFee(amount) {
    return (amount * exports.AUCTION_FEE_PERCENTAGE) / 100;
}
// Private helper functions
function generateAuctionId(seller, asset) {
    // Simplified ID generation - in real Aiken this would use cryptographic functions
    return `auction_${seller}_${JSON.stringify(asset)}`;
}
// Test functions
function testCreateAuction() {
    const seller = '00112233445566778899aabbccddeeff00112233445566778899aabbcc';
    const asset = 'NFT-001';
    const startingPrice = 5000000;
    const duration = 86400; // 1 day in seconds
    const auction = createAuction(seller, asset, startingPrice, duration);
    return auction.seller === seller &&
        auction.asset === asset &&
        auction.startingPrice === startingPrice &&
        auction.state === 'Active';
}
function testPlaceBidSuccess() {
    const auction = createAuction('00112233445566778899aabbccddeeff00112233445566778899aabbcc', 'NFT-001', 5000000, 86400);
    const bidder = 'ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433';
    const bidAmount = 6000000;
    const result = placeBid(auction, bidder, bidAmount);
    if (typeof result === 'string') {
        return false;
    }
    return result.currentBid === bidAmount &&
        result.highestBidder === bidder;
}
function testPlaceBidTooLow() {
    const auction = createAuction('00112233445566778899aabbccddeeff00112233445566778899aabbcc', 'NFT-001', 5000000, 86400);
    const bidder = 'ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433';
    const bidAmount = 5100000; // Only 0.1 ADA increment, too low
    const result = placeBid(auction, bidder, bidAmount);
    return typeof result === 'string' && result === 'Bid too low';
}
//# sourceMappingURL=AdvancedAuction.js.map