export default class BaseService {
  repository: any

  /**
   * Constructor
   * @param {any} repository - Repository instance
   */
  constructor(repository: any) {
    this.repository = repository
  }

  /**
   * Retrieves all records using the specified options.
   * 
   * @param {any} options - An object containing query options:
   *   - `pagination`: Pagination data (page and limit)
   *   - `sort`: Sort data (field and order)
   *   - `filter`: Filter conditions to apply
   *   - `fields`: Fields to select
   *   - `search`: Search criteria (field and value)
   *   - `relation`: Relations to preload
   *   - `relationOptions`: Options for the relations
   * @returns {Promise<any>} - The retrieved records
   * @throws Will throw an error if the retrieval process fails.
   */
  async getAll(options: any) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results = await this.repository.getAll(options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  /**
   * Stores a new record in the repository.
   * 
   * @param {any} data - The data to be stored.
   * @returns {Promise<any>} - The promise resolving to the created record.
   * @throws Will throw an error if the storage process fails.
   */
  async store(data: any) {
    try {
      return await this.repository.store(data)
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves a record with the specified id using the specified options.
   * 
   * @param {any} id - The id of the record to be retrieved.
   * @param {any} options - An object containing query options:
   *   - `relation`: Relations to preload
   *   - `relationOptions`: Options for the relations
   *   - `fields`: Fields to select
   * @returns {Promise<any>} - The retrieved record
   * @throws Will throw an error if the retrieval process fails.
   */
  async show(id: any, options: any = {}) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      return await this.repository.show(id, options.fields)
    } catch (error) {
      throw error
    }
  }

/**
 * Retrieves a record by its id.
 * 
 * @param {any} id - The id of the record to be retrieved.
 * @returns {Promise<any>} - The retrieved record or null if no matching record exists.
 * @throws Will throw an error if the retrieval process fails.
 */
  async find(id: any) {
    try {
      return await this.repository.find(id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves the first record from the database.
   * 
   * If soft delete is enabled, it only returns records that have not been deleted.
   * Otherwise, it returns the first record regardless of its deleted status.
   * 
   * @returns {Promise<any>} - The first record from the database, or null if the table is empty
   * @throws Will throw an error if the operation fails
   */
  async first() {
    try {
      return await this.repository.first()
    } catch (error) {
      throw error
    }
  }

/**
 * Updates a record in the repository with the specified id and data.
 * 
 * @param {any} id - The id of the record to be updated.
 * @param {any} data - The data to update the record with.
 * @returns {Promise<any>} - The updated record.
 * @throws Will throw an error if the update process fails.
 */
  async update(id: any, data: any) {
    try {
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }

  /**
   * Deletes a record by its id.
   * 
   * If soft delete is enabled, it updates the `deleted_at` field with the current timestamp.
   * Otherwise, it permanently removes the record from the database.
   * 
   * @param {any} id - The id of the record to be deleted
   * @returns {Promise<any>} - The deleted record, or null if not found
   * @throws Will throw an error if the operation fails
   */
  async delete(id: any) {
    try {
      return await this.repository.delete(id)
    } catch (error) {
      throw error
    }
  }

  async multiDelete(id: any) {
    try {
      return await this.repository.multiDelete(id)
    } catch (error) {
      throw error
    }
  }

/**
 * Deletes all records from the repository.
 * 
 * If soft delete is enabled, it updates the `deleted_at` field with the current timestamp for all records.
 * Otherwise, it permanently removes all records from the repository.
 * 
 * @returns {Promise<any>} - The result of the deletion operation
 * @throws Will throw an error if the operation fails
 */
  async deleteAll() {
    try {
      return await this.repository.deleteAll()
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves all deleted records from the repository with the specified options.
   * 
   * @param {any} options - An object containing query options:
   *   - `relation`: Relations to preload
   *   - `relationOptions`: Options for the relations
   *   - `fields`: Fields to select
   *   - `pagination`: Pagination data (page and limit)
   *   - `sort`: Sort data (field and order)
   *   - `filter`: Where clauses to use in query
   *   - `search`: Search data (field and value)
   * @returns {Promise<any>} - The retrieved records
   * @throws Will throw an error if the retrieval process fails.
   */
  async getDeletedAll(options: any) {
    try {
      this.repository.setRelation(options.relation)
      const results = await this.repository.getDeletedAll(options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves a deleted record from the repository by its id.
   * 
   * @param {any} id - The id of the record to retrieve
   * @param {any} options - An object containing query options:
   *   - `relation`: Relations to preload
   *   - `relationOptions`: Options for the relations
   *   - `fields`: Fields to select
   * @returns {Promise<any>} - The deleted record with the given id, or null if no matching record exists
   * @throws Will throw an error if the retrieval process fails.
   */
  async showDeleted(id: any, options: any = {}) {
    try {
      this.repository.setRelation(options.relation)
      return await this.repository.showDeleted(id, options.fields)
    } catch (error) {
      throw error
    }
  }

  /**
   * Restore a deleted record from the repository by its id.
   * 
   * @param {any} id - The id of the record to restore
   * @returns {Promise<any>} - The restored record
   * @throws Will throw an error if the restoration process fails.
   */
  async restore(id: any) {
    try {
      return await this.repository.restore(id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Restore all deleted records from the repository.
   * 
   * @returns {Promise<any[]>} - The restored records
   * @throws Will throw an error if the restoration process fails.
   */
  async restoreAll() {
    try {
      return await this.repository.restoreAll()
    } catch (error) {
      throw error
    }
  }

  /**
   * Permanently delete a record from the repository by its id.
   * 
   * @param {any} id - The id of the record to permanently delete
   * @returns {Promise<any>} - The deleted record
   * @throws Will throw an error if the deletion process fails.
   */
  async permanentDelete(id: any) {
    try {
      return await this.repository.permanentDelete(id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Permanently delete all records from the repository.
   * 
   * This operation will permanently remove all records from the repository.
   * 
   * @returns {Promise<any>} - The result of the deletion operation
   * @throws Will throw an error if the operation fails
   */
  async permanentDeleteAll() {
    try {
      return await this.repository.permanentDeleteAll()
    } catch (error) {
      throw error
    }
  }
}
