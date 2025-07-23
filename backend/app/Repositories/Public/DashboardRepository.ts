import Database from "@ioc:Adonis/Lucid/Database"
import Article from "App/Models/Public/Article"

export default class DashboardRepository {
  async countRegistrant() {
    try {
      return await Database.from('order.registrants').count('* as total')
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPerStatus() {
    try {
      return await Database.from('order.registrants as reg')
        .select('s.name')
        .count('reg.id')
        .rightJoin('order.registrant_statuses as s', 'reg.status_id', 's.id')
        .groupBy('s.name')
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPerPackage() {
    try {
      return await Database.from('package.packages as pa')
        .select('pa.name')
        .count('reg.id as total')
        .leftJoin('package.batches as b', 'pa.id', 'b.package_id')
        .leftJoin('package.prices as pr', 'b.id', 'pr.batch_id')
        .leftJoin('order.registrants as reg', 'pr.id', 'reg.price_id')
        .groupBy('pa.id')
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPerBatch(number: string) {
    try {
      const query = Database.from('package.batches as b')
        .select('b.batch_number as batch')
        .count('reg.id as total')
        .leftJoin('package.prices as pr', 'b.id', 'pr.batch_id')
        .leftJoin('order.registrants as reg', 'pr.id', 'reg.price_id')
        .groupBy('b.batch_number')

      if (number) {
        query.having('b.batch_number', '=', `${number}`)
      }

      return await query
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPerYear(year: number) {
    try {
      return await Database.rawQuery(`
        WITH months AS (
          SELECT generate_series(1, 12) AS month
        )
        SELECT
          TO_CHAR(TO_DATE(m.month::text, 'MM'), 'FMMonth') AS month,
          COALESCE(COUNT(reg.id), 0) AS total
        FROM
          months m
        LEFT JOIN
          "order".registrants AS reg
        ON
          EXTRACT(MONTH FROM reg.created_at) = m.month
          AND EXTRACT(YEAR FROM reg.created_at) = ?
        GROUP BY
          m.month
        ORDER BY
          m.month
      `, [year])
    } catch (error) {
      throw error
    }
  }

  async sumArticleVisitor() {
    try {
      return await Article.query().sum('visitor')
    } catch (error) {
      throw error
    }
  }
}
