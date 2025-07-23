import BaseService from "App/Base/Services/BaseService"
import RegistrantStatusRepository from "App/Repositories/Order/RegistrantStatusRepository"

export default class RegistrantStatusService extends BaseService {
  constructor() {
    super(new RegistrantStatusRepository())
  }
}
    