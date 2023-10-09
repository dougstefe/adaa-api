export interface PaginationRequest<Entity> {
  from: number,
  size: number,
  sort: {
    by: string,
    direction: string
  },
  filter: Entity
}