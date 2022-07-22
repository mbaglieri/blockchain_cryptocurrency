Class Miner {
	constructor(blockchain, transactionPool, wallet, p2pServer){
		this.blockchain      = blockchain;
		this.transactionPool = transactionPool;
		this.wallet          = wallet;
		this.p2pServer       = p2pServer;
	}
	mine(){
		const validTransactions = this.transactionPool.validTransactions();
		// includ a reward for the miner
		// create a block consisting the valid transaction
		// syncronize the chains in the peer-to-peer
		// clear the transaction pool
		// broadcast to every miner to clear their transaction pools
	}
}