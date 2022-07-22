const SHA256 = require('crypto-js/sha256')
class Block {
	constructor(timestamp, lastHash, hash, data) {
		this.timestamp = timestamp;
		this.lastHash  = lastHash;
		this.hash      = hash;
		this.data      = data;
	}
	static genesis(){
		return new this('Genesis time','-----','first-h45s',[]);
	}
	static mineBlock(lastBlock, data){
		const timestamp = Date.now();
		const lastHash  = lastBlock.hash;
		const hash      = Block.hash(timestamp, lastHash, data);
		return new this(timestamp,lastHash,hash,data);
	}
	static hash(timestamp, lastHash, data){
		return SHA256(`${timestamp}${lastHash}${data}`).toString();
	}
	toString() {
		return `Block -
			Timestamp: ${this.timestamp}
			Last Hash: ${this.lastHash}
			Hash     : ${this.hash}
			Data     : ${this.data}
		`;
	}

}
module.exports = Block;
