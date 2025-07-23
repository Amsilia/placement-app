import BaseRepository from "App/Base/Repositories/BaseRepository";
import Package from "App/Models/Package/Package";

export default class PackageRepository extends BaseRepository {
  constructor() {
    super(Package)
  }
}
    