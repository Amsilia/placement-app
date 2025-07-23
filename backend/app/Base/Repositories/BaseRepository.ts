import { DateTime } from "luxon"

export default class BaseRepository {
  protected model: any
  protected mainModel: any
  protected isSoftDelete: boolean
  protected RELATIONS: string[]
  protected RELATION_OPTIONS: any

  /**
   * Constructor
   * @param {any} model - Model to use as main model
   */
  constructor(model: any) {
    this.model = model
    this.mainModel = model
    this.isSoftDelete = model.softDelete
  }

  /**
   * Get all records in database
   * @param {any} pagination - Pagination data (page and limit)
   * @param {any} sort - Sort data (field and order)
   * @param {any} whereClauses - Where clauses to use in query
   * @param {any} fields - Fields to select
   * @param {any} search - Search data (field and value)
   * @returns {Promise<any>} - Query result
   */
  async getAll(pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseWhere(this.model, whereClauses)
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
   * Get all records in database
   * @param {any} data - Query data (sort)
   * @returns {Promise<any>} - Query result
   */
  async get(data: any = {}) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      if (data.sort) {
        this.model = this.parseSort(this.model, data.sort)
      }
      return await this.model
    } catch (error) {
      throw error
    }
  }

/**
 * Store a new record in the database.
 *
 * @param {any} data - The data to be stored
 * @returns {Promise<any>} - The created record
 */
  async store(data: any) {
    try {
      this.model = this.mainModel
      return await this.model.create(data)
    } catch (error) {
      throw error
    }
  }

    /**
     * Store multiple records in the database.
     *
     * @param {any[]} data - The data to be stored
     * @returns {Promise<any[]>} - The created records
     */
  async multiInsert(data: any[]) {
    try {
      this.model = this.mainModel
      return await this.model.createMany(data)
    } catch (error) {
      throw error
    }
  }

    /**
     * Get a record by its id.
     *
     * @param {any} id - The id of the record to be retrieved
     * @param {any} fields - The fields to be selected
     * @returns {Promise<any>} - The retrieved record
     */
  async show(id: any, fields: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query().where(this.model.primaryKey, id)
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseRelation(this.model)
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      return await this.model.first()
    } catch (error) {
      throw error
    }
  }

    /**
     * Update a record in the database.
     *
     * @param {any} id - The id of the record to be updated
     * @param {any} data - The data to be updated
     * @returns {Promise<any>} - The updated record
     */
  async update(id: any, data: any) {
    try {
      this.model = this.mainModel
      if (! await this.model.find(id)) {
        return null
      }
      data.updated_at = DateTime.now()
      if (Object.keys(data).length) {
        await this.model.query().where(this.model.primaryKey, id).update(data)
      }
      return await this.model.find(id)
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
      this.model = this.mainModel
      const result = await this.model.find(id)
      if (this.isSoftDelete) {
        await this.model.query().where(this.model.primaryKey, id).update({ deleted_at: DateTime.local() })
      } else {
        await this.model.query().where(this.model.primaryKey, id).delete()
      }
      return result
    } catch (error) {
      throw error
    }
  }

  async multiDelete(id: any) {
    try {
      return await this.model.query().whereIn('id', id).delete()
    } catch (error) {
      throw error
    }
  }

  /**
   * Deletes all records from the database.
   *
   * If soft delete is enabled, it updates the `deleted_at` field with the current timestamp for all records.
   * Otherwise, it permanently removes all records from the database.
   *
   * @returns {Promise<any>} - The result of the deletion operation
   * @throws Will throw an error if the operation fails
   */
  async deleteAll() {
    try {
      this.model = this.mainModel
      if (this.isSoftDelete) {
        return await this.model.query().whereNull('deleted_at').update({ deleted_at: DateTime.local() })
      } else {
        return await this.model.query().delete()
      }
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
      this.model = this.mainModel
      this.model = this.model.query()
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      return await this.model.first()
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves a record from the database by its id.
   *
   * If soft delete is enabled, it only returns records that have not been deleted.
   * Otherwise, it returns the record regardless of its deleted status.
   *
   * @param {any} id - The id of the record to retrieve
   * @returns {Promise<any>} - The record with the given id, or null if no matching record exists
   * @throws Will throw an error if the operation fails
   */
  async find(id: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query().where(this.model.primaryKey, id)
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      return await this.model.first()
    } catch (error) {
      throw error
    }
  }

  /**
   * Set the relations to be included in the results.
   *
   * @param {string[]} relation - The relations to include
   * @returns {void}
   */
  setRelation(relation: string[]) {
    this.RELATIONS = relation
  }

    /**
     * Set the options for the relations to be included in the results.
     *
     * @param {any} relationOptions - The options for the relations to include
     * @returns {void}
     */
  setRelationOptions(relationOptions: any) {
    this.RELATION_OPTIONS = relationOptions
  }

  /**
   * Selects the specified fields from the database.
   *
   * If the "fields" parameter is null or undefined, all fields are selected.
   *
   * @param {any} model - The model to select from
   * @param {any} fields - The fields to select
   * @returns {any} - The modified model with the selected fields
   */
  parseSelectedFields(model: any, fields: any) {
    if (fields) {
      model = model.select(fields)
    }
    return model
  }

/**
 * Parses the where clauses and applies them to the given model.
 *
 * The method applies filters to the query based on the provided where clauses.
 * It supports both 'and' and 'or' operations for combining multiple conditions.
 *
 * If the operation is 'and', all conditions must be met. If the operation is 'or',
 * at least one condition must be met. The method supports conditions with operators
 * such as 'between', 'null', and attribute checks with nested relations.
 *
 * @param {any} model - The model to which the where clauses are applied.
 * @param {any} whereClauses - The where clauses containing conditions to filter the query.
 * @returns {any} - The modified model with the applied where clauses.
 */
  parseWhere(model: any, whereClauses: any) {
    if (whereClauses.data) {
      const { data, operation } = whereClauses;

      // Iterate through the whereClauses data array
      data.forEach((whereClause: any, index: number) => {
        const { attribute, operator, value } = whereClause;

        // Ensure the necessary fields are present
        if (!attribute || !operator) {
          console.error('Invalid whereClause, missing attribute or operator', whereClause);
          return; // Skip this clause if it's invalid
        }

        // Handle `between` operator separately
        if (operator === 'between') {
          if (Array.isArray(value) && value.length === 2) {
            model = model.whereBetween(attribute, value);
          } else {
            console.error('Invalid value for "between" operator', whereClause);
          }
        } else {
          // Handle null values
          if (value === null || value === 'null') {
            model = model.whereNull(attribute);
          } else if (value === undefined) {
            console.error('Undefined value for attribute:', attribute);
          } else {
            // Handle attributes with dot notation (e.g., "user.profile.name")
            if (attribute.includes('.')) {
              const [relation, field] = attribute.split('.');
              model = model.whereHas(relation, (builder: any) => {
                builder.where(field, operator, value);
              });
            } else {
              // Apply the where condition for regular attributes
              if (index === 0 || operation === 'and') {
                model = model.where(attribute, operator, value);
              } else if (operation === 'or') {
                model = model.orWhere(attribute, operator, value);
              }
            }
          }
        }
      });
    } else {
      console.error('No whereClauses data provided');
    }
    return model;
  }


/**
 * Preloads the specified relations into the model based on the RELATIONS and RELATION_OPTIONS.
 *
 * For each relation in RELATIONS, it preloads the relation into the model. If the relation has nested
 * relations, it recursively preloads them as well. It also applies relation options if available.
 *
 * @param {any} model - The model to preload relations into
 * @returns {any} - The model with preloaded relations
 */
  parseRelation(model: any) {
    if (this.RELATIONS) {
      this.RELATIONS.forEach((relation) => {
        if (relation.split('.').length > 1) {
          const firstRelation = relation.substr(0, relation.indexOf('.'))
          model = model.preload(firstRelation, (query) => {
            if (this.RELATION_OPTIONS) {
              let relationOption = this.RELATION_OPTIONS.find((item: any) => { return item.relation == firstRelation })
              this.parseRelationOption(query, relationOption)
            }
            this.parseNestedRelation(query, relation.substr(relation.indexOf('.') + 1), firstRelation)
          })
        } else {
          model = model.preload(relation, (query) => {
            if (this.RELATION_OPTIONS) {
              let relationOption = this.RELATION_OPTIONS.find((item: any) => { return item.relation == relation })
              this.parseRelationOption(query, relationOption)
            }
          })
        }
      })
    }
    return model
  }

  /**
   * Recursively preloads nested relations into the model. If the relation has multiple nested levels, it
   * recursively preloads them as well. It also applies relation options if available.
   *
   * @param {any} query - The query instance to preload the relation into
   * @param {string} relation - The relation to preload
   * @param {string} firstRelation - The first relation in the nested relation
   * @returns {any} - The query with preloaded nested relation
   */
  parseNestedRelation(query: any, relation: string, firstRelation: string) {
    let relations = this.RELATIONS.filter(d => { return typeof d == 'string' })
    relations = relations.filter(d => { return d.includes(firstRelation + '.') })
    if (relations.length > 1) {
      relations.map(data => {
        this.parseNestedRelation(query, data.substr(data.indexOf('.') + 1), relation.substr(0, data.indexOf('.')))
      })
    } else {
      if (relation.indexOf('.') > 0) {
        let subRelation = relation.substr(0, relation.indexOf('.'))
        query.preload(subRelation, (subQuery) => {
          if (this.RELATION_OPTIONS) {
            let relationOption = this.RELATION_OPTIONS.find((item: any) => { return item.relation == subRelation })
            this.parseRelationOption(subQuery, relationOption)
          }
          this.parseNestedRelation(subQuery, relation.substr(relation.indexOf('.') + 1), subRelation)
        })
      } else {
        query.preload(relation, (subQuery) => {
          if (this.RELATION_OPTIONS) {
            let relationOption = this.RELATION_OPTIONS.find((item: any) => { return item.relation == relation })
            this.parseRelationOption(subQuery, relationOption)
          }
        })
      }
    }
  }

    /**
     * Applies relation options into the query. Relation options are applied to the relation preload method.
     * Relation options allow you to specify which fields to select, sort options, filters, and search options
     * for the relation.
     *
     * @param {any} query - The query instance to apply relation options to.
     * @param {any} relationOption - The relation option to apply to the query.
     * @returns {any} - The query with applied relation options.
     */
  parseRelationOption(query: any, relationOption: any) {
    if (relationOption) {
      if (relationOption.fields) {
        query = query.select(relationOption.fields)
      }
      if (relationOption.sort) {
        query = query.orderBy(relationOption.sort, relationOption.order)
      }
      if (relationOption.filter) {
        query = this.parseWhere(query, relationOption.filter)
      }
      if (relationOption.limit) {
        query = query.limit(relationOption.limit)
      }
      if (relationOption.search) {
        relationOption.filter = relationOption.filter || { operation: 'and', data: [] }
        query = this.parseSearch(query, relationOption.filter, relationOption.search)
      }
    }
    return query
  }

  /**
   * Applies sort options into the query. Sort options are applied to the model's orderBy method.
   * Sort options allow you to specify which fields to sort by and the order of the sort.
   *
   * @param {any} model - The model to apply sort options to.
   * @param {any[]} sort - The sort options to apply to the model.
   * @returns {any} - The modified model with the applied sort options.
   */
  parseSort(model: any, sort: any[]) {
    if (sort) {
      sort.forEach((sort: any) => {
        model = model.orderBy(sort.attribute, sort.order)
      });
    }
    return model
  }

  /**
   * Parses the search data and filters the model based on the search attributes.
   *
   * The method applies search filters to the query based on the provided search data.
   * It supports applying search filters with nested relations and different operators.
   *
   * @param {any} model - The model to which the search filters are applied.
   * @param {any} whereClauses - The where clauses containing conditions to filter the query.
   * @param {any} search - The search data containing attributes and values to filter the query.
   * @returns {any} - The modified model with the applied search filters.
   */
  parseSearch(model: any, whereClauses: any, search: any) {
    if (search) {
      const data = search.data.toLowerCase()
      const attributes = search.attributes
      const operator = search.operator || '='
      if (attributes) {
        model = model.where((query) => {
          if (whereClauses.data.length > 0) {
            attributes.forEach((attribute: string) => {
              if (attribute.includes('.')) {
                const attr = attribute.split('.')
                const field = attr[attr.length - 1]
                const relations = attr.slice(0, attr.length - 1)
                query.whereHas(relations[0], (query: any) => {
                  this.parseNestedSearch(query, relations.slice(1), field, data, operator)
                })
              } else {
                query.orWhereRaw(`LOWER(${attribute}) ${operator} ?`, [data])
              }
            });
          } else {
            attributes.forEach((attribute: any, index: number) => {
              if (index == 0) {
                if (attribute.includes('.')) {
                  const attr = attribute.split('.')
                  const field = attr[attr.length - 1]
                  const relations = attr.slice(0, attr.length - 1)
                  query.whereHas(relations[0], (query: any) => {
                    this.parseNestedSearch(query, relations.slice(1), field, data, operator)
                  })
                } else {
                  query.whereRaw(`LOWER(${attribute}) ${operator} ?`, [data])  // Case-insensitive exact match
                }
              } else {
                if (attribute.includes('.')) {
                  const attr = attribute.split('.')
                  const field = attr[attr.length - 1]
                  const relations = attr.slice(0, attr.length - 1)
                  query.orWhereHas(relations[0], (query: any) => {
                    this.parseNestedSearch(query, relations.slice(1), field, data, operator)
                  })
                } else {
                  query.orWhereRaw(`LOWER(${attribute}) ${operator} ?`, [data])  // Case-insensitive exact match
                }
              }
            });
          }
        })
      }
    }
    return model
  }

  /**
   * Parses the nested search query and applies it to the model.
   *
   * The method is used to parse the nested search query and apply it to the model.
   * It is used by the parseSearch method to apply search filters on the query.
   *
   * @param {any} model - The model to which the search query is applied.
   * @param {any[]} relations - The nested relations to apply the search query to.
   * @param {any} field - The field to search.
   * @param {any} value - The value to search for.
   * @param {any} operator - The operator to use for the search. Defaults to 'ilike'.
   * @returns {any} - The modified model with the applied search query.
   */
  parseNestedSearch(model: any, relations: any, field: any, value: any, operator: any = '=') {
    if (relations.length > 0) {
      model = model.whereHas(relations[0], (query: any) => {
        this.parseNestedSearch(query, relations.slice(1), field, value, operator)
      })
    } else {
      model = model.whereRaw(`LOWER(${field}) ${operator} ?`, [value.toLowerCase()])
    }
    return model
  }
}
