const WebSocket = require('ws');
const P2P_PORT  = process.env.P2P_PORT || 5001;
const peers     = process.env.PEERS? process.env.PEERS.split(','):[];
const MESSAGE_TYPES = {chain: 'CHAIN', transaction: 'TRANSACTION'};

class P2pServer{
	constructor(blockchain, transactionPool) {
		this.transactionPool = transactionPool;
		this.blockchain      = blockchain;
		this.sockets         = [];
	}
	
	listen(){
		const server = new WebSocket.Server({port:P2P_PORT});
		server.on('connection', socket => this.connectSocket(socket));
		console.log(` listen for p2p ${P2P_PORT}`);
		this.connectToPeers();
	}
	
	connectToPeers(){
		peers.forEach(peer =>{
			const socket = new WebSocket(peer);
			socket.on('open', () => this.connectSocket(socket));
		})
	} 
	
	connectSocket(socket){
		this.sockets.push(socket);
		console.log("socket connecets");
		this.messageHandler(socket);
		socket.send(JSON.stringify(this.blockchain.chain));
		this.sendChain(socket);
	}
	
	messageHandler(socket){

		socket.on('message', message =>{
			const data = JSON.parse(message);
			console.log('data',data);
			switch(data.type){
				case MESSAGE_TYPES.chain:
					this.blockchain.replaceChain(data.chain);
					break;
				case MESSAGE_TYPES.transaction:
					this.transactionPool.updateOrAddTransaction(data.transaction);
					break;

			}
			this.blockchain.replaceChain(data)
		});
	}
	
	sendChain(socket){
   		socket.send(JSON.stringify({ 
   			type: MESSAGE_TYPES.chain, 
   			chain: this.blockchain.chain }));
	}
	
	syncChains(){
		this.sockets.forEach(socket => this.sendChain(socket));
	}
	
	sendTransaction(socket, transaction) {
   		socket.send(JSON.stringify({ type: MESSAGE_TYPES.transaction, transaction }));
	}

	broadcastTransaction(transaction) {
  		this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
	}
}
module.exports = P2pServer; 