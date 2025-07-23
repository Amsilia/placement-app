// app/Repositories/Order/RegistrantRepository.ts
import BaseRepository from "App/Base/Repositories/BaseRepository";
import Registrant from "App/Models/Order/Registrant";
import Database from "@ioc:Adonis/Lucid/Database";
import Account from "App/Models/User/Account";

interface YearMonthCount {
  year: number;
  month: number;
  count: number;
}
interface StatusCount {
  registrant_status: string;
  count: number;
}

export default class RegistrantRepository extends BaseRepository {
  constructor() {
    super(Registrant);
  }

  // NOTE: Method ini (getAllPerBatch) sepertinya TIDAK DIPANGGIL oleh frontend Anda (yang memanggil getRegistrantsByBatch)
  // Namun, perbaikan select clause di sini juga penting jika ada bagian lain yang memanggilnya.
  async getAllPerBatch(batch: string, packageId: string, status: string, pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = Database.from('package.batches as b')
        .select(
          'reg.id', // <<< PASTIKAN INI, ID REGISTRANT
          'b.id as batch_id', // <<< BERI ALIAS UNTUK ID BATCH
          'reg.created_at as registered_date',
          'reg.fullname',
          'rs.name as status',
          'pr.name as price'
          // Tambahkan kolom lain dari 'reg' yang ingin Anda sertakan di list data (misal: 'reg.no_handphone', 'reg.email', 'reg.document')
        )
        .join('package.prices as pr', 'b.id', 'pr.batch_id')
        .join('order.registrants as reg', 'pr.id', 'reg.price_id')
        .join('order.registrant_statuses as rs', 'reg.status_id', 'rs.id')
        .groupBy('b.id', 'b.batch_number', 'b.package_id', 'reg.id', 'reg.fullname', 'rs.name', 'pr.name')
        .having('b.batch_number', '=', `${batch}`)
        if (packageId) {
          this.model = this.model.andHaving('b.package_id', '=', `${packageId}`)
        }
        if (status) {
          this.model = this.model.andHaving(Database.raw('LOWER(rs.name)'), '=', `${status.toLowerCase()}`)
        }
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseSearch(this.model, whereClauses, search)
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort)
      if (pagination.page && pagination.limit) {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit)
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      } else {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at')
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Get total number of registrants
   */
  public async getTotalRegistrants(): Promise<number> {
    const result = await Registrant.query().count("* as total").first();
    return result?.$extras.total ?? 0;
  }

  /**
   * Get number of registrants grouped by status
   */
  public async getRegistrantsByStatus(): Promise<StatusCount[]> {
    const results = await Registrant.query()
      .select(
        "order.registrants.status_id",
        "order.registrant_statuses.name as registrant_status_name"
      )
      .count("order.registrants.id as count")
      .join(
        "order.registrant_statuses",
        "order.registrants.status_id",
        "order.registrant_statuses.id"
      )
      .groupBy("order.registrants.status_id", "order.registrant_statuses.name");

    return results.map((r: any) => ({
      registrant_status: r.registrant_status_name,
      count: Number(r.count) ,
    }));
  }

  /**
   * Get number of registrants grouped by batch, with optional batch filter
   */
  public async getRegistrantsBatch(batchId: string, status: string, pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = Database.from('package.batches as b')
        .select(
          'reg.id', // <<< ID REGISTRANT (INI YANG PALING PENTING)
          'b.id as batch_id', // ID BATCH (Jika Anda ingin tetap menyertakannya)
          'reg.created_at as registered_date',
          'reg.fullname',
          'rs.name as status',
          'pr.name as price',
          'pr.name as price_type', // Menambahkan price_type agar konsisten dengan frontend
          'reg.no_handphone', // Tambahkan ini agar tidak perlu fetch detail untuk no HP/email
          'reg.user_id', // Tambahkan ini agar bisa join ke tabel user untuk email
          'reg.document', // Tambahkan path dokumen
          'reg.transfer_proof' // Tambahkan path bukti transfer
          // Tambahkan kolom lain dari 'reg' yang mungkin relevan untuk tampilan list awal
        )
        .join('package.prices as pr', 'b.id', 'pr.batch_id')
        .join('order.registrants as reg', 'pr.id', 'reg.price_id')
        .join('order.registrant_statuses as rs', 'reg.status_id', 'rs.id')
        // Tambahkan join ke tabel users jika Anda ingin email di list
        // .join('users as u', 'reg.user_id', 'u.id')
        // .select('u.email as email') // Tambahkan ini di klausa select di atas

        .where('b.id', '=', `${batchId}`)
        if (status) {
          this.model = this.model.whereRaw('LOWER(rs.name) = ?', [status.toLowerCase()])
        }
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseSearch(this.model, whereClauses, search) // Search harusnya di reg.fullname
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort) // Sorting harusnya di reg.fullname atau reg.created_at

      // Pastikan GROUP BY menyertakan semua kolom yang di SELECT
      this.model = this.model.groupBy('reg.id', 'b.id', 'reg.created_at', 'reg.fullname', 'rs.name', 'pr.name', 'reg.no_handphone', 'reg.user_id', 'reg.document', 'reg.transfer_proof'); // Dan kolom lain dari SELECT

      if (pagination.page && pagination.limit) {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit)
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      } else {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at')
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Get number of registrants grouped by year and month
   */
  public async getRegistrantsByYearMonth(
    year?: number
  ): Promise<YearMonthCount[]> {
    const query = Registrant.query()
      .select(
        Database.raw("EXTRACT(YEAR FROM created_at) as year"),
        Database.raw("EXTRACT(MONTH FROM created_at) as month")
      )
      .count("id as count")
      .groupByRaw("year, month")
      .orderByRaw("year ASC, month ASC");

    if (year) {
      query.whereRaw("EXTRACT(YEAR FROM created_at) = ?", [year]);
    }

    const results = await query;
    return results.map((r: any) => ({
      year: Number(r.year) ,
      month: Number(r.month) || 0,
      count: Number(r.count) || 0,
    }));
  }

  async showAuthRegistrant(id: any, pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseWhere(this.model, whereClauses)
      this.model = this.parseSearch(this.model, whereClauses, search)
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort)
      this.model = this.model.where('user_id', id)
      if (pagination.page && pagination.limit) {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit)
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      } else {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at')
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }

  async checkRegistrantOwnership(user_id: any) {
    try {
      const result = await Account.query().where('id', user_id).first()
      await result!.load('registrants')
      if (result!.registrants.length > 0) {
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }
}