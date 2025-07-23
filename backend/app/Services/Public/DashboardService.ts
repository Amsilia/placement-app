import DashboardRepository from "App/Repositories/Public/DashboardRepository";

export default class DashboardService {
  repository: DashboardRepository

  constructor() {
    this.repository = new DashboardRepository()
  }

  async dashboardData() {
    try {
      const [totalRegistrant] = await this.repository.countRegistrant()
      const registrantPerStatus = await this.repository.countRegistrantPerStatus()
      const sumArticleVisitor = await this.repository.sumArticleVisitor()

      const statusCounts = registrantPerStatus.reduce((acc, status) => {
        acc[status.name] = Number(status.count)
        return acc;
      }, {});

      return {
        totalRegistrant: Number(totalRegistrant.total),
        registrantPerStatus: {
          Menunggu: statusCounts['Menunggu'] || 0,
          Diterima: statusCounts['Diterima'] || 0,
          Ditolak: statusCounts['Ditolak'] || 0,
          Berlangsung: statusCounts['Berlangsung'] || 0,
          Selesai: statusCounts['Selesai'] || 0,
      },
        articleVisitor: Number(sumArticleVisitor[0].$extras.sum)
      }
    } catch (error) {
      throw error
    }
  }

  async countRegistrantPackage() {
    try {
      return await this.repository.countRegistrantPerPackage()
    } catch (error) {
      throw error
  }
  }

  async countRegistrantBatch(batch: string) {
    try {
      return await this.repository.countRegistrantPerBatch(batch)
    } catch (error) {
      throw error
    }
  }

  async countRegistrantYear(year: number) {
    try {
      return await this.repository.countRegistrantPerYear(year)
    } catch (error) {
      throw error
    }
  }
}
