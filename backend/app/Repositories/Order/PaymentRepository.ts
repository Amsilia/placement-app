import BaseRepository from "App/Base/Repositories/BaseRepository";
import Payment from "App/Models/Order/Payment";

export default class PaymentRepository extends BaseRepository {
  constructor() {
    super(Payment)
  }
}
    