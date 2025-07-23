import BaseService from "App/Base/Services/BaseService"
import PaymentRepository from "App/Repositories/Order/PaymentRepository"

export default class PaymentService extends BaseService {
  constructor() {
    super(new PaymentRepository())
  }
}
    