# Poolda

## 개요

- 감정인지강화를 위한 자연어 처리 기반 챗봇 서비스
- 연세대학교 HCI Lab Dream Academy Summer Camp 2019 과제
- 논문 : https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE10402876
- 포스터 : https://github.com/corgi-world/poolda-client/blob/master/poolda-poster.pdf

## 서비스

감정표현불능증인 사람은 정서에 대한 정신적 표상을 구성하는 능력이 결핍되어 있기 때문에 본인의 정서를 언어화하지 못한다. 이러한 사람들이 겪는 감정표현 불능을 해소하는 데 도움을 주기 위해 해당 서비스를 개발하였다.

1. 서비스를 처음 접속한 유저는 감정표현불능증 척도 테스트인 TAS-20을 통해 개인의 상태를 파악하게 된다.
2. 유저는 본인 의지에 따라 챗봇 화면으로 이동하여 본인의 하루에 어떤 일이 있었는지 작성한다.
3. 작성된 하루를 자연어 처리, 감정 분석 기술을 통해 유저의 감정 상태가 긍정적인지, 부정적인지 파악한다.
4. 한국말 감정표현, 감정 형용사 72개를 유저의 감정 상태에 따라 우선순위를 정렬한다.
5. 유저는 제안된 감정 형용사 중 본인의 감정 상태와 적합한 감정 형용사를 선택한다.
6. 그 후 다른 유저의 하루를 전달받고 해당 유저가 느꼈을 감정 상태와 적합한 감정 형용사를 선택한다.
7. 상기의 과정을 통해 다양한 감정표현을 접하게 함으로써 유저의 감정표현불능증을 완화시키고자 한다. 또한, 다른 사람의 입장에서 생각해보며 타인의 감정을 파악할 수 있는 힘을 기르도록 하였다.

## 사용 기술

- Front-End
  - React Native(Expo)
- Back-End
  - Node.js (Express)
  - Google Cloud Platform
  - AWS EC2

## 경험

### _이것이 팀 플레이다._

팀의 개발자가 혼자뿐이라, 모든 개발을 도맡아 해야 한다는 이유로 팀원들에게 정말 많은 배려를 받았다. 10주 내에 시연 가능한 앱을 개발하는 것이 최종 목표였기 때문에, 최대한 많은 시간을 확보하는 것이 중요했다. 또한 중간중간 기획 단계의 아이디어가 구현 가능한지 기술 검증까지 하느라 시간이 정말 많이 부족했다. 이러한 이유로 아이디어 도출 회의에 참여하는 것 외에 모든 작업에서 배려 받았다. 덕분에 온전히 개발에만 집중하여, 참여한 팀 중 유일하게 서비스의 전체 프로세스를 앱으로 시연할 수 있었다.

### _도움 받고 도움 주기_

이번 활동으로 React Native를 처음 접해본 터라 '생활코딩', '리액트네이티브서울'과 같은 커뮤니티로부터 많은 도움을 받았다. 지금 돌이켜보면, 구글링으로 충분히 스스로 해결할 수 있는 문제였음에도 불구하고 많은 분들이 친절하게 질문에 답해주셨다. 내가 지금껏, 앞으로도 도움받은 만큼 빠르게 성장해서 누군가에게 도움 줄 수 있는 개발자가 되어야겠다!

## 결과

- 9개의 팀 중 1등으로 한국HCI학회 참여 지원 혜택을 받게 되었다.
- 서버 : https://github.com/corgi-world/poolda-server

  <img src="./poolda-preview.gif" width="35%" />
