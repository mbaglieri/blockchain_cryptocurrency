const TransactionPool = require('./transaction-pool');
const Transaction     = require('./transaction');
const Wallet          = require('./index');

describe('TransactionPool', () => {
  	let tp, wallet, recipient;
	beforeEach(() => {
		tp          = new TransactionPool();
		wallet      = new Wallet();
		amount      = 50;
		recipient   = 'r3c1p13nt';
		transaction = Transaction.newTransaction(wallet, 'rand-4dr355', 30);
		tp.updateOrAddTransaction(transaction);
	});

	it('adds a transaction to the pool', () => {
		expect(tp.transactions.find(t => t.id === transaction.id))
			.toEqual(transaction);
	});

	it('updates a transaction to the pool', () => {
		const oldTransaction = JSON.stringify(transaction);
		const newTransaction = transaction.update(wallet, 'foo-add', 40)
		tp.updateOrAddTransaction(newTransaction);
		expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
			.not.toEqual(oldTransaction);
	});

});