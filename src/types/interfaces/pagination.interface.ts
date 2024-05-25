export interface PaginationQuery {
  limit?: number;
  page?: number;
  q?: string;
  sort?: string;
  populate?: string;
}

export interface IPaginationResult {
  totalPages: number;
    page: number;
    limit: number;
    total: number;
}
