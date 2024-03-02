import DbService from '@services/DbService';

export type Coin = {
	id?: string;
	symbol: string;
	name: string;
	image?: string;
	portfolio_id: string;
	amount?: number;
};

export class CoinModel extends DbService {
	private readonly tableName = 'coin';
	private readonly junctionTableName = 'portfolio_coin';

	constructor() {
		super();
	}

	addCoin(coin: Coin) {
		let stmt = this.db.prepare(
			`INSERT INTO ${this.tableName} (symbol, name, image) VALUES (?, ?, ?)`
		);
		const coinId = stmt.run(coin.symbol, coin.name, coin.image).lastInsertRowid;

		stmt = this.db.prepare(
			`INSERT INTO ${this.junctionTableName} (portfolio_id, coin_id) VALUES (?, ?)`
		);
		stmt.run(coin.portfolio_id, coinId);
	}

	getAllPortfolioCoins(portfolioId: string): Coin[] {
		const stmt = this.db.prepare(
			`SELECT * FROM ${this.junctionTableName} JOIN ${this.tableName} ON ${this.junctionTableName}.coin_id = ${this.tableName}.id WHERE ${this.junctionTableName}.portfolio_id = ?`
		);
		return stmt.all(portfolioId) as Coin[];
	}
}

const coinModel = new CoinModel();
export default coinModel;
