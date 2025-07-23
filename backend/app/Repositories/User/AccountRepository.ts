import BaseRepository from "App/Base/Repositories/BaseRepository";
import Account from "App/Models/User/Account";

export default class AccountRepository extends BaseRepository {
  constructor() {
    super(Account)
  }

  async findByEmail(email: string) {
    console.log(email, "==Email")
    if (!email) {
      throw new Error("Email is required")
    }
    try {
      return await this.model.query().where('email', email).first()
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    console.log(username, "==Username")
    if (!username) {
      throw new Error("Username is required");
    }
    try {
      return await this.model.query().where('username', username).first();
    } catch (error) {
      console.log(error, "ERROR AT REPOSITORY");
      throw error;
    }
  }
  
}
    