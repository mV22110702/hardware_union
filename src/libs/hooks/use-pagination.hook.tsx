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

  const paginateSlice = useCallback<<T>(items:T[])=>T[]>((items) => {
    console.log('pagination.page')
    console.log(pagination.page)
    console.log('pagination.size')
    console.log(pagination.size)
    console.log('items')
    console.log(items)
    const pageIndex = pagination.page - 1;
    return items.slice(
      pageIndex * pagination.size,
      pageIndex * pagination.size + pagination.size,
    );
  },[pagination.page, pagination.size]);

  const handlePaginationChange = (page: number, size: number) => {
    console.log('handle change')
    console.log('page');
    console.log(page);
    console.log(size);
    console.log('size');

    setPagination({ page, size });
  };

  return { pagination, resetPagination, paginateSlice, handlePaginationChange };
};
