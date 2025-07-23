export default class ParseParamService {
  LIKE = 'like';
  EQUAL = 'eq';
  NOT_EQUAL = 'ne';
  GREATER_THAN = 'gt';
  GREATER_THAN_EQUAL = 'gte';
  LESS_THAN = 'lt';
  LESS_THAN_EQUAL = 'lte';
  BETWEEN = 'between';

  OPERATOR_LIKE = 'ILIKE';
  OPERATOR_EQUAL = '=';
  OPERATOR_NOT_EQUAL = '!=';
  OPERATOR_GREATER_THAN = '>';
  OPERATOR_GREATER_THAN_EQUAL = '>=';
  OPERATOR_LESS_THAN = '<';
  OPERATOR_LESS_THAN_EQUAL = '<=';

  OPERATION_DEFAULT = "and";

  /**
   * Parse the params from the request to be used in the model query.
   *
   * @param {Object} data - The request data containing the params to be parsed.
   * @param {Object} data.sort - The sort param to be parsed.
   * @param {Object} data.fields - The fields param to be parsed.
   * @param {Object} data.embed - The embed param to be parsed.
   * @param {Object} data.search - The search param to be parsed.
   * @param {number} data.page - The page param to be parsed.
   * @param {number} data.limit - The limit param to be parsed.
   * @returns {Object} - The parsed params.
   */
  parse(data: { sort: any; fields: any; embed: any; search: any; page: any; limit: any; }) {
    const paginateParams = this.parsePaginateParams(data)
    const sortParams = this.parseSortParams(data.sort)
    const filterParams = this.parseFilterParams(data)
    const projectionParams = this.parseProjectionParams(data.fields)
    const relationParams = this.parseRelationParams(data.embed)
    const relationOptionParams = this.parseRelationOptionParams(data)
    const searchParams = this.parseSearch(data.search)

    const results = {
      pagination: paginateParams,
      sort: sortParams,
      filter: filterParams,
      fields: projectionParams,
      relation: relationParams,
      search: searchParams,
      relationOptions: relationOptionParams
    }

    return results
  }

  /**
   * Parse the pagination params from the request.
   *
   * @param {Object} data - The request data containing the pagination params to be parsed.
   * @param {number} data.page - The page param to be parsed.
   * @param {number} data.limit - The limit param to be parsed.
   * @returns {Object} - The parsed pagination params with the page and limit.
   */
  parsePaginateParams(data: { page: any; limit: any; }) {
    return {
      page: data.page ?? null,
      limit: data.limit ?? null
    }
  }

  /**
   * Parse the sort params from the request.
   *
   * @param {string} data - The request data containing the sort params to be parsed.
   * @returns {Object[]} - The parsed sort params with the order and attribute.
   */
  parseSortParams(data: string) {
    if (data) {
      const sorts = data.split(',')
      const parsedSort: any[] = []

      sorts.forEach((sort: string) => {
        if (sort.includes('-')) {
          parsedSort.push({
            order: 'desc',
            attribute: sort.split('-')[1]
          })
        } else {
          parsedSort.push({
            order: 'asc',
            attribute: sort
          })
        }
      });

      return parsedSort
    }
  }

  /**
   * Parse the filter params from the request.
   *
   * @param {Object} data - The request data containing the filter params to be parsed.
   * @param {Object} data[key] - The filter params to be parsed with the attribute as the key.
   * @param {string|string[]} data[key][k] - The value of the filter param.
   * @param {string} data.operation - The operation to use when combining multiple conditions. Defaults to 'and'.
   * @returns {Object} - The parsed filter params with the operation and filters.
   */
  parseFilterParams(data: { [x: string]: { [x: string]: any; }; operation?: any; }) {
    const filters: any[] = []

    Object.keys(data).forEach(key => {
      if (key != 'page' && key != 'limit' && key != 'sort' && key != 'fields' && key != 'embed' && key != 'operation' && key != 'search' && !key.includes('.')) {
        Object.keys(data[key]).forEach(k => {
          if (k == 'between') {
            const values = data[key][k].split(',')
            if (values.length != 2) {
              return
            } else {
              filters.push({
                attribute: key,
                operator: this.BETWEEN,
                value: values
              })
            }
          } else {
            if (data[key][k].includes(',')) {
              const values = data[key][k].split(',')
              values.forEach((val: any) => {
                filters.push(this.parseFilter(key, k, val))
              });
            } else {
              filters.push(this.parseFilter(key, k, data[key][k]))
            }
          }
        })
      }
    })

    return {
      operation: data.operation || 'and',
      data: filters
    }
  }

  /**
   * Parses the projection params and returns an array of fields to be selected.
   *
   * @param {string} data - The projection params to be parsed.
   * @returns {string[]} - An array of fields to be selected.
   */
  parseProjectionParams(data: string) {
    if (data) {
      return data.split(',')
    }
  }


  /**
   * Parses the relation params and returns an array of relations to be preloaded.
   *
   * @param {string} data - The relation params to be parsed.
   * @returns {string[]} - An array of relations to be preloaded.
   */
  parseRelationParams(data: string) {
    if (data) {
      return data.split(',')
    }
  }

  /**
   * Parses the relation options from the request data.
   *
   * @param {Object} data - The request data containing the relation options to be parsed.
   * @param {string} data.embed - The relation options to be parsed with the relation as the key.
   * @param {string|string[]} data[relation].fields - The fields to select for the relation.
   * @param {string} data[relation].sort - The sort attribute for the relation.
   * @param {string} data[relation].operation - The operation to use when combining multiple filters for the relation. Defaults to 'and'.
   * @param {Object} data[relation].filter - The filter params with the attribute as the key and the operator as the value.
   * @param {number} data[relation].limit - The limit for the relation.
   * @param {string} data[relation].search - The search value for the relation.
   * @returns {Object[]} - The parsed relation options with the relation, fields, sort, filter, and limit.
   */
  parseRelationOptionParams(data: { [x: string]: any; embed: any; }) {
    const relationOptions: any[] = []
    if (data.embed) {
      data.embed.replace(/\./g, ',').split(',').forEach((relation: string) => {
        const option: any = {}
        option.relation = relation

        if (data[`${relation}.fields`]) {
          option.fields = data[`${relation}.fields`].split(',')
        }

        if (data[`${relation}.sort`]) {
          option.sort = data[`${relation}.sort`].replace('-', '')
          option.order = data[`${relation}.sort`].includes('-') ? 'desc' : 'asc'
        }

        const filterParams = Object.keys(data).filter((key: string) => key.split('.')[0] == relation && key != `${relation}.operation` && key != `${relation}.limit` && key != `${relation}.search` && key != `${relation}.fields` && key != `${relation}.sort`).map(key => {
          const filter: any = {}
          const operator: any = Object.keys(data[key])[0]
          filter.attribute = key.split('.')[1]
          filter.operator = this.parseOperator(operator)
          filter.value = data[key][operator]
          return filter
        })

        if (filterParams.length > 0) {
          option.filter = {
            operation: data[`${relation}.operation`] || 'and',
            data: filterParams
          }
        }

        if (data[`${relation}.limit`]) {
          option.limit = data[`${relation}.limit`]
        }

        if (data[`${relation}.search`]) {
          option.search = this.parseSearch(data[`${relation}.search`])
        }

        relationOptions.push(option)
      })
    }
    return relationOptions
  }

/**
 * Parses the search parameters and constructs a search object.
 *
 * This method processes the provided search data and constructs an object
 * containing search attributes, the search data formatted with wildcard
 * characters, and the operator to be used for searching.
 *
 * @param {Object} data - The search parameters with attributes as keys and search values.
 * @returns {Object} - The constructed search object with data, attributes, and operator.
 */
  parseSearch(data: { [x: string]: any; }) {
    if (data) {
      const search: any = {
        data: null,
        attributes: [],
        operator: this.OPERATOR_LIKE
      }

      Object.keys(data).forEach(key => {
        search.data = `%${data[key]}%`
        search.attributes = key.split(',')
      })

      return search
    }
  }

/**
 * Parses a filter condition into an object with attribute, operator and value.
 *
 * This method processes the provided filter parameters and constructs an object
 * containing the attribute to filter on, the operator to use for filtering, and
 * the value to filter by. If the operator is 'LIKE', the method wraps the value
 * with wildcard characters for partial matching.
 *
 * @param {string} attribute - The attribute to filter on.
 * @param {string} operator - The operator to use for filtering (e.g., 'LIKE', 'EQUAL').
 * @param {string} value - The value to filter by, which may be modified based on the operator.
 * @returns {Object} - The constructed filter object with attribute, operator, and value.
 */
  parseFilter(attribute: string, operator: string, value: string) {
    if (operator == this.LIKE) {
      value = `%${value}%`
    }

    return {
      attribute: attribute,
      operator: this.parseOperator(operator),
      value: value
    }
  }

  /**
   * Parses a filter operator and returns the corresponding operator string.
   *
   * This method processes the provided filter operator and returns the corresponding
   * operator string used in the model query. The method supports the following operators
   * and returns the corresponding operator string for each: 'LIKE', 'EQUAL', 'NOT_EQUAL',
   * 'GREATER_THAN', 'GREATER_THAN_EQUAL', 'LESS_THAN', and 'LESS_THAN_EQUAL'.
   *
   * @param {string} operator - The filter operator to be parsed.
   * @returns {string} - The parsed operator string.
   */
  parseOperator(operator: any) {
    switch (operator) {
      case this.LIKE:
        return this.OPERATOR_LIKE
      case this.EQUAL:
        return this.OPERATOR_EQUAL
      case this.NOT_EQUAL:
        return this.OPERATOR_NOT_EQUAL
      case this.GREATER_THAN:
        return this.OPERATOR_GREATER_THAN
      case this.GREATER_THAN_EQUAL:
        return this.OPERATOR_GREATER_THAN_EQUAL
      case this.LESS_THAN:
        return this.OPERATOR_LESS_THAN
      case this.LESS_THAN_EQUAL:
        return this.OPERATOR_LESS_THAN_EQUAL
    }
  }
}
