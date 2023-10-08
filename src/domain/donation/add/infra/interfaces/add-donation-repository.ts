import { Donation } from '@domain/donation/add/models/donation'

export interface AddDonationRepository {
  add(donation: Donation): Promise<string>
}