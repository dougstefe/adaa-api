export interface PaginationResponse<Entity> {
  data: Entity[],
  total: number
}