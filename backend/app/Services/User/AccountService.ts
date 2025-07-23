import BaseService from "App/Base/Services/BaseService"
import AccountRepository from "App/Repositories/User/AccountRepository"
import Hash from '@ioc:Adonis/Core/Hash'
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser"
import AmazonS3 from "App/Utils/AmazonS3"

export default class AccountService extends BaseService {
  constructor() {
    super(new AccountRepository())
  }

  async store(data: any, avatar?: MultipartFileContract) {
    try {
      if (data.password) {
        data.password = await Hash.make(data.password)
      }
      if (avatar) {
        data.avatar = await AmazonS3.uploadFile(avatar, 'avatars')
      }
      return await this.repository.store(data)
    } catch (error) {
      throw error
    }
  }

  async update(id: any, data: any) {
    try {
      if (data.password) {
        data.password = await Hash.make(data.password)
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }

  async findByEmail (email: string) {
    try {
      const akun = await this.repository.findByEmail(email)
      return akun
    } catch (error) {
      throw error
    }
  }

  async updateProfile(id: any, data: any, avatar?: MultipartFileContract) {
    try {
      if (avatar) {
        const account = await this.repository.find(id)
        if (account.avatar) {
          await AmazonS3.deleteFile(account.avatar)
        }
        data.avatar = await AmazonS3.uploadFile(avatar, 'avatars')
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }
}
