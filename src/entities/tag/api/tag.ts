  // 태그 가져오기
  export const getTags = async (tag?:string) => {
    try {
      const url = tag ? `/api/posts/tags/${tag}` : "/api/posts/tags";
      const response = await fetch(url);
      console.log('response', response);
      const data = await response.json()
      return data;
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }