import { ApiPagination } from './api-response';

interface PaginationParams {
  total: number;
  limit: number;
  length: number;
  page: number;
}

export const getPaginationOptions = (
  page: string | undefined,
  limit: string | undefined,
): { currentPage: number; itemsPerPage: number } => {
  const parsedPage = parseInt(page || '1');
  const parsedLimit = parseInt(limit || '10');

  const currentPage = parsedPage > 0 ? parsedPage : 1;
  const itemsPerPage = parsedLimit > 0 ? parsedLimit : 10;

  return { currentPage, itemsPerPage };
};

export const getPagination = ({
  total,
  limit,
  length,
  page,
}: PaginationParams): ApiPagination => {
  const pages = Math.ceil(total / Number(limit));
  return {
    length,
    page,
    limit,
    pages,
    total,
    hasNextPage: page < pages,
    hasPreviousPage: page > 1,
  };
};
