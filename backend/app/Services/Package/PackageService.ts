import BaseService from "App/Base/Services/BaseService"
import PackageRepository from "App/Repositories/Package/PackageRepository"

export default class PackageService extends BaseService {
  constructor() {
    super(new PackageRepository())
  }
}
    