import BaseService from "App/Base/Services/BaseService"
import TransactionRepository from "App/Repositories/Order/TransactionRepository"

export default class TransactionService extends BaseService {
  constructor() {
    super(new TransactionRepository())
  }

  public async getAll(options: any) {
    return this.repository.getAll(options)
  }

  public async getByRegistrantId(registrantId: string) {
    if (!registrantId) {
      throw new Error('registrantId is required')
    }
    return this.repository.getByRegistrantId(registrantId)
  }
}

    