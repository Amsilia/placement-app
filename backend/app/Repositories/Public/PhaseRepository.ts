import BaseRepository from "App/Base/Repositories/BaseRepository";
import Phase from "App/Models/Public/Phase";

export default class PhaseRepository extends BaseRepository {
  constructor() {
    super(Phase)
  }
}
    