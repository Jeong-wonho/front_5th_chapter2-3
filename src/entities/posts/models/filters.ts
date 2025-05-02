import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';

export interface PostFiltersState {
  // 페이지네이션 상태
  skip: number;
  limit: number;
  // 검색 및 정렬 상태
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
  
  // 액션
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: string) => void;
  setSelectedTag: (tag: string) => void;
  
  // URL 파라미터와 동기화
  syncWithUrlParams: (params: URLSearchParams) => void;
  // URL 업데이트
  updateURL: (navigate: NavigateFunction) => void;
  // 모든 필터 초기화
  resetFilters: () => void;
}

export const usePostFiltersStore = create<PostFiltersState>((set, get) => ({
  // 초기값
  skip: 0,
  limit: 10,
  searchQuery: '',
  sortBy: '',
  sortOrder: 'asc',
  selectedTag: '',
  
  // 액션
  setSkip: (skip: number) => set({ skip }),
  setLimit: (limit: number) => set({ limit }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setSortBy: (sortBy: string) => set({ sortBy }),
  setSortOrder: (sortOrder: string) => set({ sortOrder }),
  setSelectedTag: (selectedTag: string) => set({ selectedTag }),
  
  // URL 파라미터와 동기화하는 함수
  syncWithUrlParams: (params: URLSearchParams) => set({
    skip: parseInt(params.get("skip") || "0"),
    limit: parseInt(params.get("limit") || "10"),
    searchQuery: params.get("search") || "",
    sortBy: params.get("sortBy") || "",
    sortOrder: params.get("sortOrder") || "asc",
    selectedTag: params.get("tag") || "",
  }),

    // URL 업데이트 함수 (새로 추가)
    updateURL: (navigate) => {
      const state = get();
      const params = new URLSearchParams();
      
      if (state.skip) params.set("skip", state.skip.toString());
      if (state.limit) params.set("limit", state.limit.toString());
      if (state.searchQuery) params.set("search", state.searchQuery);
      if (state.sortBy) params.set("sortBy", state.sortBy);
      if (state.sortOrder) params.set("sortOrder", state.sortOrder);
      if (state.selectedTag) params.set("tag", state.selectedTag);
      
      navigate(`?${params.toString()}`);
    },
  
  // 모든 필터 초기화
  resetFilters: () => set({
    skip: 0,
    limit: 10,
    searchQuery: '',
    sortBy: '',
    sortOrder: 'asc',
    selectedTag: '',
  }),
})); 