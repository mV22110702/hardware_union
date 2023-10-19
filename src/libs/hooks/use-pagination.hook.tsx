import { useCallback, useMemo, useState } from 'react';

export const usePagination = () => {
  const INITIAL_PAGINATION = useMemo(() => ({ page: 1, size: 10 }), []);

  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>(INITIAL_PAGINATION);

  const resetPagination = useCallback(() => {
    setPagination(INITIAL_PAGINATION);
  }, [setPagination, INITIAL_PAGINATION]);

  const paginateSlice: <T>(items: T[]) => T[] = (items) => {
    const pageIndex = pagination.page - 1;
    return items.slice(
      pageIndex * pagination.size,
      pageIndex * pagination.size + pagination.size,
    );
  };

  const handlePaginationChange = (page: number, size: number) => {
    setPagination({ page, size });
  };

  return { pagination, resetPagination, paginateSlice, handlePaginationChange };
};
