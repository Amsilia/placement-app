import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DashboardService from 'App/Services/Public/DashboardService'

export default class DashboardController {
  service = new DashboardService()

  public async dashboardData({ response }: HttpContextContract) {
    try {
      const result = await this.service.dashboardData()
      return response.api(result, 'OK', 200)
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPackage({ response }: HttpContextContract) {
    try {
      const result = await this.service.countRegistrantPackage()
      return response.api(result, 'OK', 200)
    } catch (error) {
      throw error
    }
  }

  public async countRegistrantBatch({ request, response }: HttpContextContract) {
    try {
      const batch = request.qs().batch
      const result = await this.service.countRegistrantBatch(batch)
      return response.api(result, 'OK', 200)
    } catch (error) {
      throw error
    }
  }

  public async countRegistrantYear({ request, response }: HttpContextContract) {
    try {
      const year = request.qs().year
      const result = await this.service.countRegistrantYear(year)
      return response.api(result, 'OK', 200)
    } catch (error) {
      throw error
    }
  }
}
