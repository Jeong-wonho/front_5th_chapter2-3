## 과제 체크포인트

### 기본과제

#### 목표 : 전역상태관리를 이용한 적절한 분리와 계층에 대한 이해를 통한 FSD 폴더 구조 적용하기
- 전역상태관리를 사용해서 상태를 분리하고 관리하는 방법에 대한 이해
- Context API, Jotai, Zustand 등 상태관리 라이브러리 사용하기
- FSD(Feature-Sliced Design)에 대한 이해
- FSD를 통한 관심사의 분리에 대한 이해
- 단일책임과 역할이란 무엇인가?
- 관심사를 하나만 가지고 있는가?
- 어디에 무엇을 넣어야 하는가?

#### 체크포인트
- [x] 전역상태관리를 사용해서 상태를 분리하고 관리했나요?
- [x] Props Drilling을 최소화했나요?
- [x] shared 공통 컴포넌트를 분리했나요?
- [x] shared 공통 로직을 분리했나요?
- [x] entities를 중심으로 type을 정의하고 model을 분리했나요?
- [x] entities를 중심으로 ui를 분리했나요?
- [x] entities를 중심으로 api를 분리했나요?
- [x] feature를 중심으로 사용자행동(이벤트 처리)를 분리했나요?
- [x] feature를 중심으로 ui를 분리했나요?
- [x] feature를 중심으로 api를 분리했나요?
- [x] widget을 중심으로 데이터를 재사용가능한 형태로 분리했나요?


### 심화과제

#### 목표: 서버상태관리 도구인 TanstackQuery를 이용하여 비동기코드를 선언적인 함수형 프로그래밍으로 작성하기 

- TanstackQuery의 사용법에 대한 이해
- TanstackQuery를 이용한 비동기 코드 작성에 대한 이해
- 비동기 코드를 선언적인 함수형 프로그래밍으로 작성하는 방법에 대한 이해

#### 체크포인트

- [x] 모든 API 호출이 TanStack Query의 useQuery와 useMutation으로 대체되었는가?
- [x] 쿼리 키가 적절히 설정되었는가?
- [x] fetch와 useState가 아닌 선언적인 함수형 프로그래밍이 적절히 적용되었는가?
- [x] 캐싱과 리프레시 전략이 올바르게 구현되었는가?


## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제에서 좋았던 부분
fsd와 전역상태관리 zoostand와 TanStack Query에 대해서 배울 수 있어서 좋았습니다. 그리고 그만큼 힘들었던 거 같아요. 

### 과제를 하면서 새롭게 알게된 점
* fsd에 대한 개념에 대해서 좀 더 명확해 져서 좋았습니다. 그리고 가장 경계해야할 건, 이게 어디에 들어갈까 고민하다 정작 더 중요한 구현을 진행하는데 시간을 할애하지 못했다는 점입니다. 저희의 목표는 구현이라는 것을 다시 한번 깨달았습니다. 코침님들이 이야기하시는 매몰되면 안되는 거 같습니다.
* zoostand에 대해서 드디어 써볼 수 있게 되서 좋았고 왜 좋아하는지 너무 직관적인 코드를 통해서 알게 되어 좋았습니다.
* TanStack Query에 대해서도 공부할 수 있었는데요. 오히려 탠스택쿼리를 왜 써야하는거지..? 라는것에 대한 의문이 좀 들었습니다. 사용하다 보니 이것도 결론적으로는 상태관리인데, zoostand로 통일해서 쓰면 안되나 하는 생각도 좀 들었습니다. 
### 과제를 진행하면서 아직 애매하게 잘 모르겠다 하는 점, 혹은 뭔가 잘 안되서 아쉬운 것들
* fsd의 layer 구분
* 전역상태관리를 정말 어거지로 사용한 느낌이 들었습니다. ㅠ ai에 의존도가 높아서 아쉬었습니다.

## 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문
* 어느 레이어에 배치해야하는지는 아직도 조금은 어렵습니다.
* 두개의 api가 합쳐지는 경우에 feature에 api segment로 분리할 생각을 했는데 괜찮은 생각일까요? entities는 정말 해당 데이터만 유지하고 싶어서요 

이런건 그래도 쉽다 생각했습니다.
```javascript
SearchPosts
export const searchPosts = async (searchQuery: string) => {
    if (!searchQuery) {
      return
    }
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      return data;
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
  }
```
두번째꺼는 위치를 Post에둘지 post-table에 둘지 고민이었습니다.!
```javascript
// Posts와 Users 데이터를 함께 가져와서 조합하는 함수
// 질문 거리 어디에 위치하는 것이 좋을지.
export const getPostsWithUsers = async (limit: number, skip: number) => {
  try {
    // 두 API를 병렬로 호출
    const [postsData, usersData] = await Promise.all([
      getPosts(limit, skip),
      getUsers()
    ]);
    
    // 데이터 매핑 및 조합
    const postsWithUsers = mapPostsWithUsers(postsData.posts, usersData.users);
    
    // 결과 반환
    return {
      posts: postsWithUsers,
      total: postsData.total,
    };
  } catch (error) {
    console.error('포스트와 유저 데이터 조합 중 오류:', error);
    throw error;
  }
};
```
* server 상태와 client 상태 의 차이점은 server에서 생성한 데이터 client에서 생성한 데이터의 차이일까요?
* server 상태와 client 상태를 나누는 이유는 무엇일까요?

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->
