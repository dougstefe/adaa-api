import bcrypt from 'bcrypt'
import { GenerateHash } from './interfaces/generate-hash'
import { CompareHash } from './interfaces/compare-hash'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { Settings } from '@main/config/settings'

@injectable()
export class CriptografyHasher implements GenerateHash, CompareHash {
  private readonly salt: number

  constructor(
    @inject(tokens.Settings)
    settings: Settings
  ) {

    const {
      salt
    } = settings.get()

    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
