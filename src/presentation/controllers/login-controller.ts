import { Request } from 'express'
import { BaseController } from '../../main/base/base-controller'
import { ApiResponse } from '../../main/types/api-response'
import { LoginSuccess } from '../../domain/models/login-success'
import { injectable } from 'tsyringe'

@injectable()
export class LoginController extends BaseController<LoginSuccess> {
  async handleRequest(req: Request): Promise<ApiResponse<LoginSuccess>> {
    try {
      const { email, password } = req.body

      if (email != 'prillybsb@gmail.com' || password != 'isabella') {
        throw 'invalid credentials'
      }

      return this.responseSuccess({
        name: 'Priscila Lemos Felizardo Lessa',
        accessToken: 'asasaasasas'
      })
    } catch (error) {
      return this.responseError(error as Error)
    }
  }
}
