// Services/Order/MidtransService.ts
import midtrans from 'midtrans-client'

class MidtransService {
  private snap: midtrans.Snap

  constructor() {
    this.snap = new midtrans.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-QhRee1Khtgj82DCRA0awRYFR',
      clientKey: 'SB-Mid-client-F5dqPwkUj4SY7p8k',
    })
  }

  public async createTransaction(orderId: string, grossAmount: number, customer: {
    first_name: string
    email: string
  }) {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount.toString(),
      },
      customer_details: {
        first_name: customer.first_name,
        email: customer.email,
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
      finish: 'http://localhost:4200/profile/history-users'
      }
    }

    return await this.snap.createTransaction(parameter)
  }
}

export default new MidtransService()
