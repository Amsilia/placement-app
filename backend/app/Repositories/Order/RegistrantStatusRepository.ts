import BaseRepository from "App/Base/Repositories/BaseRepository";
import RegistrantStatus from "App/Models/Order/RegistrantStatus";

export default class RegistrantStatusRepository extends BaseRepository {
  constructor() {
    super(RegistrantStatus)
  }
}
    