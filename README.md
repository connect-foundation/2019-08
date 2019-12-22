<p align="center">

<img width="500px" src="https://user-images.githubusercontent.com/44811887/69315262-6c8d5800-0c79-11ea-8d87-ccd8f8d98826.png">
<br>
<img src="https://img.shields.io/github/license/connect-foundation/2019-08">
<img src="https://img.shields.io/github/issues/connect-foundation/2019-08">
<img src="https://img.shields.io/github/v/tag/connect-foundation/2019-08">
<img src="https://img.shields.io/npm/v/npm/latest">
<br>
<h4 align="center">
 <a href ="https://www.boost-snug.com"> 🏠 Snug Demo </a> | <a href="https://github.com/connect-foundation/2019-08/wiki"> 📖 WIKI</a> | <a href="https://github.com/connect-foundation/2019-08/wiki/Snug-%EC%82%AC%EC%9A%A9-%EC%84%A4%EB%AA%85%EC%84%9C"> 🗃 스너그 사용 설명서</a> | <a href="#프로젝트-시작하기-Getting-Started"> 💽 프로젝트 시작하기</a> | <a href="#개발자">🤺개발자 </a>
</h4>

</p>

## 주요 동기
<br>
<p align="center">
<img src="https://i.imgur.com/asJpft7.png">
</p>
<br>



## 주요 기능

#### 여러 사용자와 실시간 채팅을 할 수 있습니다.

#### 메시지에 댓글(thread)을 달 수 있습니다.

#### 다양한 형식의 파일을 공유할 수 있습니다.

#### 각 스너그마다 사용자가 원하는 프로필을 설정할 수 있습니다.

#### 직접 만든 Snug에 다른 사용자를 초대할 수 있습니다.

#### 비밀 채널을 이용해 은밀한 이야기를 나눌 수 있습니다.

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

![](https://i.imgur.com/p8BpVFr.png)

#### 소켓 관리

![](https://i.imgur.com/Ua1UNv9.png)

#### 알림 구조

![](https://i.imgur.com/cvXOo6D.png)


## ERD

![](https://i.imgur.com/4pH0XZL.png)


## 프로젝트 시작하기 (Getting Started)

### 준비

 > MySql Version 8+
 
 > .env.production 환경변수 설정해야 합니다.


### 배포
```shell=bash

sh deploy/deploy.sh

```

## 프로젝트 진행 상황(Timeline)

![](https://i.imgur.com/DtgiOyn.png)


## 주요 기술

- Bcrypt
- Infinite Scrolling
- JWT
- MySql
- NodeMailer
- Object Storage
- SocketIO
- Typescript
- TypeOrm

## 참여 개발자

<p align="center" style="text-align:center;">

<h3 align="center" >고승빈 <a href="https://github.com/raccoonback">@raccoonback</a></h3> 
</p>

#### 주 역할
- 프론트엔드에서 비즈니스 로직 개발
- Snug 팀원들이 인정한 Super Code Reviewer 
- 객체 지향적인 코드를 고민하는 개발자
- 유의미한 테스트 코드를 작성하고자 노력
- 프론트엔드에서 데이터 흐름 고민
- TypeOrm 기반의 Model 추상화
- 알람 구조 설계 및 개발
- Web Socket Event 문서화 추진 및 정리
- "Post ID", "최신날짜" 기준 전략에 따른 페이지네이션 구현
- Token 발급 기능에 Template Method 패턴 적용
- HTTPS 적용

<p align="center" style="text-align:center;">
<h3 align="center">김경래 <a href="https://github.com/kyungrae">@kyungrae</a>
</h3> 
</p>

#### 주 역할
- 효과적인 백엔드 구조를 고민
- Web socket을 이용하여 multiplexing과 demultiplexing을 구현
- 재사용 가능한 파일 업로드 객체 구현 및 object storage 연결
- ERD 설계 및 typeorm entity 정의
- 클라이언트에서 workspace 접근 권한 구현
- 매일 적어도 1%씩 성장하는 개발자
- 프로 지식 공유러

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
- 프론트엔드에서 재사용 가능한 Component를 고민 
- 프론트엔드에서 데이터 흐름에 대하여 고민
- 프론트엔드에서 비즈니스 로직 개발
- 프론트엔드에서 효과적인 Web Socket 활용 방법에 대하여 고민
- TypeOrm Migration 이용한 Entity Versioning 
- API 및 Entity 문서화 작업 추진 및 진행
