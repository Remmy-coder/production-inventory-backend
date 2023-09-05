export class PaginationResponseDto<T> {
  data: T[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
