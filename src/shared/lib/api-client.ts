/**
 * API 호출을 위한 기본 URL 설정
 * GitHub Pages 배포 시에는 환경변수 또는 기본 base path를 사용합니다.
 */

// base URL을 환경변수에서 가져오거나 기본값 사용
const BASE_URL = import.meta.env.VITE_BASE_PATH || '/';

/**
 * API 엔드포인트에 base URL을 추가하는 함수
 * /api/posts -> /front_5th_chapter2-3/api/posts (GitHub Pages 환경)
 */
export const getApiUrl = (endpoint: string): string => {
  // endpoint가 이미 /로 시작하면 /를 제거
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // base URL이 /로 끝나면 추가 /를 방지
  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * API 호출을 위한 fetch 함수
 * baseUrl을 자동으로 추가합니다.
 */
export const apiFetch = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  const url = getApiUrl(endpoint);
  return fetch(url, options);
};

export default {
  getApiUrl,
  apiFetch,
}; 