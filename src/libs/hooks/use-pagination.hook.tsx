import {useCallback, useMemo, useState} from "react";

export const usePagination = ()=>{
    const INITIAL_PAGINATION = useMemo(()=>({ page: 0, size: 10 }),[]);

    const [pagination, setPagination] = useState<{
        page: number;
        size: number;
    }>(INITIAL_PAGINATION);

    const resetPagination = useCallback(()=>{
        setPagination(INITIAL_PAGINATION);
    },[setPagination,INITIAL_PAGINATION]);

    const paginateSlice:<T>(items:T[])=>T[] = (items)=>{
        return items.slice(
            pagination.page * pagination.size,
            pagination.page * pagination.size + pagination.size,
        );
    }

    const handlePaginationChange = (page:number,size:number)=>{
        setPagination({page,size});
    }
    return {pagination,resetPagination,paginateSlice,handlePaginationChange};
}