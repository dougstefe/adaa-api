export interface CompareHash {
  compare(value: string, hash: string): Promise<boolean>
}