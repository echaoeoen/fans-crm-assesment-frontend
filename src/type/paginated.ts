export interface Paginated<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
  size: number;
}
