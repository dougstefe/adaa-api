import { BaseUseCase } from '@main/base/base-use-case'
import { DonationRequest } from './models/donation-request'
import { DonationResponse } from './models/donation-response'

export class DonationUseCase extends BaseUseCase<DonationRequest, DonationResponse | undefined> {
  async execute(input: DonationRequest): Promise<DonationResponse | undefined> {
    throw new Error('Method not implemented.')
  }

}