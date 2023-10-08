import { Donation } from '@domain/donation/entities/donation'

export interface AddDonationRepository {
  add(donation: Donation): Promise<string>
}