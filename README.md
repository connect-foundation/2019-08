<p align="center">

<img width="500px" src="https://user-images.githubusercontent.com/44811887/69315262-6c8d5800-0c79-11ea-8d87-ccd8f8d98826.png">
<br>
<img src="https://img.shields.io/github/license/connect-foundation/2019-08">
<img src="https://img.shields.io/github/issues/connect-foundation/2019-08">
<img src="https://img.shields.io/github/v/tag/connect-foundation/2019-08">
<img src="https://img.shields.io/npm/v/npm/latest">
<br>
<h4 align="center"><a href ="https://www.boost-snug.com"> 🏠 Snug Demo </a> | <a href="https://github.com/connect-foundation/2019-08/wiki"> 📖 WIKI</a> | <a href="https://github.com/connect-foundation/2019-08/wiki/Snug-%EC%82%AC%EC%9A%A9-%EC%84%A4%EB%AA%85%EC%84%9C"> 🗃 스너그 사용 설명서</a> | <a href="#프로젝트-시작하기-Getting-Started"> 💽 프로젝트 시작하기</a> | <a href="#개발자">🤺개발자 </a></h4>

</p>

## 주요 동기 | 만들게 된 이유
<br>
<p align="center">
<img src="https://i.imgur.com/asJpft7.png">
</p>
<br>



## 프로젝트 설명 (동작 방식, 그림)

> 다른 사용자와 채팅을 할 수 있습니다.
댓글(thread)을 달 수 있습니다.
다양한 형식의 파일을 공유할 수 있습니다.
프로필을 원하는 대로 설정(Customizing)할 수 있습니다.
다른 사용자를, 직접 만든 Snug에, 초대할 수 있습니다.

<br>

## 프로젝트 구조

### Server

#### 라우팅

<br>
<p align="center">
<img src="https://i.imgur.com/WzSMbhY.png">
</p>

<br>

### Client

#### Clean Architecture

<br>
<p align="center">
<img src="https://i.imgur.com/B4j7S9Q.png">
</p>

<br>

#### Snug - Channel 구조

<br>
<p align="center">
<img src="https://i.imgur.com/WwE6LNS.png">
</p>

<br>

#### 소켓 관리

<br>
<p align="center">
<img src="https://i.imgur.com/RZLv0EP.png">

</p>

<br>


## 주요 기술

- Typescript
- TypeOrm
- MySql
- Object Storage
- SocketIO
- NodeMailer
- JWT
- Bcrypt
- Infinite Scrolling

## 프로젝트 시작하기 (Getting Started)

### 준비

 > MySql Version 8+
 
 > .env.production 환경변수 설정 


### 배포
```shell=bash

sh deploy/deploy.sh

```

## 프로젝트 진행 상황(Timeline)

![](https://i.imgur.com/Vb3IAqL.png)

> 여기서 추가해주세요 https://docs.google.com/presentation/d/12ShqcxAUQF7n42x4F9KlIZ4_jTIfRC1jxsKRNzFIduM/edit#slide=id.g7bca3312b5_0_15


## 개발자

<p align="center" style="text-align:center;">

<h3 align="center" >고승빈 <a href="https://github.com/raccoonback">@raccoonback</a></h3> 
</p>


#### 주 역할
- 프론트엔드에서 비즈니스 로직 개발
- **Snug** 팀원들이 인정한 Super Code Reviewer 
- 객체 지향적인 코드를 고민하는 개발자
- 유의미한 테스트 코드를 작성하고자 노력


<p align="center" style="text-align:center;">
<h3 align="center">김경래 <a href="https://github.com/kyungrae">@kyungrae</a>
</h3> 
</p>

#### 주 역할
- Web Socket을 이용한 실시간 메세지 통신을 고민
- 프로 지식 공유러
- 효과적인 백엔드 구조를 고민
- Typescript에 기반한 Express 설계
- 매일 적어도 1%씩 성장하는 개발자


<p align="center" style="text-align:center;">

<h3 align="center">김기표 <a href="https://github.com/GiPyoo">@GiPyoo</a></h3>
</p>

#### 주 역할
- Snug 프로젝트를 진행하는 MC, 항상 프로젝트에 장작을 넣어주는 나무꾼
- 질문하는 개발자
- 팀원들이 인정한 생산성 좋은 개발자
- 프론트엔드 비즈니스 로직 개발
- React를 활용한 Component 기반 프론트엔드 개발
- React Hook과 Context API를 통한 데이터 흐름관리
- Typescript를 이용하여 Clean 아키텍쳐 적용
- Client에서 Socket을 통한 통신 모듈 구현
- 디자인과 UI interaction 개발
- token을 활용한 사용자 인증관리(프론트, 백)


<p align="center" style="text-align:center;">
<h3 align="center" >이상원 <a href="https://github.com/sangwon21">@sangwon21</a></h3> 
</p>


#### 주 역할
- Snug 팀을 이끄는 정신적 지주
- 프론트엔드에서 재사용 가능한 Component를 고민했습니다. 
- 팀원들을 질문으로 괴롭혔습니다.
- **커스터마이징 가능한 컴포넌트 구현**
