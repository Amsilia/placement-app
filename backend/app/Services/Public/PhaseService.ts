import BaseService from "App/Base/Services/BaseService"
import PhaseRepository from "App/Repositories/Public/PhaseRepository"

export default class PhaseService extends BaseService {
  constructor() {
    super(new PhaseRepository())
  }
}
    