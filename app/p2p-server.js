const WebSocket = require('ws');
const P2P_PORT  = process.env.P2P_PORT || 5001;
const peers     = process.env.PEERS? process.env.PEERS.split(','):[];

class P2pServer{
	constructor(blockchain){
		this.blockchain = blockchain;
		this.sockets    = [];
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
	}
}
module.exports = P2pServer; 