import { Donation } from '@domain/pet/donation/models/donation'

export interface AddDonationRepository {
  add(donation: Donation): Promise<string>
}