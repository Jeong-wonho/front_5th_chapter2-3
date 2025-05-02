import { create } from 'zustand';
import { Tag } from './tag';
import { getTags } from '../api';

export interface TagState {
  // 상태
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  
  // 액션
  setTags: (tags: Tag[]) => void;
  fetchTags: () => Promise<void>;
}

export const useTagStore = create<TagState>((set) => ({
  // 초기값
  tags: [],
  isLoading: false,
  error: null,
  
  // 태그 설정 액션
  setTags: (tags: Tag[]) => set({ tags }),
  
  // 태그 가져오기 액션 (비동기)
  fetchTags: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTags();
      set({ tags: data, isLoading: false });
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
      set({ 
        error: error instanceof Error ? error.message : "태그를 가져오는 중 오류가 발생했습니다", 
        isLoading: false 
      });
    }
  },
})); 