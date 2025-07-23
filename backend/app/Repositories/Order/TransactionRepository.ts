import BaseRepository from "App/Base/Repositories/BaseRepository";
import Transaction from "App/Models/Order/Transaction";

export default class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction)
  }

async getByRegistrantId(registrantId: string) {
  if (!registrantId) {
    throw new Error('registrantId is required')
  }

  const transactions = await Transaction
    .query()
    .where('registrant_id', registrantId) // field sesuai di tabel
    .preload('registrant')
    .orderBy('created_at', 'desc')

  return transactions
}

}
