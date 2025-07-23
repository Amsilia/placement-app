import BaseService from "App/Base/Services/BaseService";
import RegistrantRepository from "App/Repositories/Order/RegistrantRepository";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser"
import AmazonS3 from "App/Utils/AmazonS3";
import Price from "App/Models/Package/Price";
import { DateTime } from "luxon";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RegistrantService extends BaseService {
  constructor() {
    super(new RegistrantRepository());
  }

  async getRegistrantBatch(options: any, batch: string, packageId: string, status: string) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results = await this.repository.getAllPerBatch(batch, packageId, status, options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  async store(data: any, document?: MultipartFileContract) {
    try {
      if (document) {
        data.document = await AmazonS3.uploadFile(document, 'registrants');
      }
      return await this.repository.store(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id: any, data: any, transfer_proof?: MultipartFileContract) {
    try {
      if (transfer_proof) {
        const registrant = await this.repository.find(id)
        if (registrant.transfer_proof) {
          await AmazonS3.deleteFile(registrant.transfer_proof)
        }

        data.transfer_proof = await AmazonS3.uploadFile(transfer_proof, 'registrants/transfer_proof')
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }

  public async getCountData(
    filters: { batch_id?: string; year?: number } = {}
  ) {
    try {
      const { batch_id, year } = filters;
      const total = await this.repository.getTotalRegistrants();
      const byStatus = await this.repository.getRegistrantsByStatus();
      const byBatch = await this.repository.getRegistrantsByBatch(batch_id);
      const byYearMonth = await this.repository.getRegistrantsByYearMonth(year);

      return {
        total,
        byStatus,
        byBatch,
        byYearMonth,
      };
    } catch (error) {
      console.log("Error at this Services", error);
      throw error;
    }
  }

  async showAuthRegistrant(id: any, options: any = {}) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results = await this.repository.showAuthRegistrant(id, options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  async checkRegistrantOwnership(user_id: any) {
    try {
      return await this.repository.checkRegistrantOwnership(user_id)
    } catch (error) {
      throw error
    }
  }

  async getRegistrantsBatch(batchId: string, status: string, options: any = {}) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      return await this.repository.getRegistrantsBatch(batchId, status, options.pagination, options.sort, options.filter, options.fields, options.search)
    } catch (error) {
      throw error
    }
  }

  async checkActiveBatch(price_id: string) {
    try {
      return await Price.query().where('id', price_id).andWhereHas('batch', (query) => {
        query.where('is_active', true)
      }).first()
    } catch (error) {
      throw error
    }
  }

  async checkOpenBatch(id: string) {
    try {
      const now = DateTime.now().toISO()
      const price = await Price.findOrFail(id)
      return await price.related('batch').query().where('open_at', '<=', now).where('close_at', '>=', now).first()
    } catch (error) {
      throw error
    }
  }

  async checkRegistrantPerBatch(priceId: string, userId: any) {
    try {
      const price = await Price.findOrFail(priceId)
      await price.load('batch')
      const batchId = price.batch_id

      return await Database.from('order.registrants as reg')
        .select('reg.user_id', 'pr.batch_id')
        .count('reg.user_id as total')
        .join('package.prices as pr', 'reg.price_id', 'pr.id')
        .where('reg.user_id', userId)
        .where('pr.batch_id', batchId)
        .groupBy('reg.user_id', 'pr.batch_id')
        .havingRaw('COUNT(reg.user_id) >= 1')
        .first();
    } catch (error) {
      throw error
    }
  }
}
