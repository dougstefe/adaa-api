export interface GenerateHash {
  hash(value: string): Promise<string>
}