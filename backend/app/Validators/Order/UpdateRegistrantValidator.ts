import { schema, validator, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateRegistrantValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  // Definisikan daftar opsi yang valid (sesuai DB, HARUS SESUAI CASE-SENSITIVE DARI DB)
  // DAN sama persis dengan apa yang AKAN DIKIRIM OLEH CONTROLLER SETELAH TRANSFORMASI
  private readonly VALID_EMPLOYMENT_STATUSES = [
    'belum bekerja',        // Pastikan ini sama persis dengan DB, huruf kecil
    'pelajar/mahasiswa',    // Pastikan ini sama persis dengan DB, huruf kecil
    'bekerja',              // Pastikan ini sama persis dengan DB, huruf kecil
    // Tambahkan semua nilai valid lainnya dari CHECK CONSTRAINT Anda (harus sesuai case-sensitive DB)
  ]

  public schema = schema.create({
    status_id: schema.string([
      rules.uuid(),
      rules.exists({ table: 'order.registrant_statuses', column: 'id' })
    ]),

    transfer_proof: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'pdf'],
    }),

    fullname: schema.string.optional([rules.maxLength(255)]), // rules.trim() mungkin juga tidak ada
    no_handphone: schema.string.optional([rules.maxLength(20)]),
    age: schema.number.optional([rules.range(0, 120)]),
    
    // --- PERBAIKAN UNTUK EMPLOYMENT_STATUS ---
    // Gunakan schema.enum.optional dengan daftar yang sudah dikonfirmasi (case-sensitive DB)
    employment_status: schema.enum.optional(this.VALID_EMPLOYMENT_STATUSES),
    // --- AKHIR PERBAIKAN UNTUK EMPLOYMENT_STATUS ---

    institution: schema.string.optional([rules.maxLength(255)]),
    last_education: schema.string.optional([rules.maxLength(50)]),
  })

  public messages: CustomMessages = {
    'status_id.required': 'Status is required',
    'transfer_proof.size': 'Transfer proof size must be less than 2mb',
    'transfer_proof.extnames': 'Transfer proof must be an image or pdf',
    'employment_status.required': 'Status Pekerjaan is required', // Jika nanti Anda ubah ke required
    'employment_status.enum': 'Status Pekerjaan tidak valid. Pilih dari opsi yang tersedia.', // Pesan error untuk schema.enum
    'fullname.maxLength': 'Fullname must be less than 255 characters',
    'age.number': 'Age must be a number',
  }
}