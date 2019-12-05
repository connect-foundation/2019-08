export class EmailContents {
  static getTemplate(snugName: string, link: string): string {
    return `
<section >
    <div style="text-align: center;">
  <img style="display:inline-block;" src="https://user-images.githubusercontent.com/44811887/69315268-6e571b80-0c79-11ea-8e61-1ae63501d4a6.png"/>
  </div>
  <header style="width: 100%;text-align: center; margin-bottom: 30px; font-weight: bold; font-size: 50px;" >Snug ${snugName}</header>
  <div style="text-align: center;">
  <main style="width: 100%; display: inline-block; text-align:center; margin-bottom: 40px;font-size:20px;" >당신은 ${snugName}에 초대되었습니다. 초대를 수락하시겠습니까?</main>
  </div>
  <div style="text-align: center; margin-top: 20px;">
  <button style="border-radius: 5px; width:30%; height: 30px; display:inline-block">
    <a style="text-decoration:none; color:black"  href="${link}"> ${snugName}(으)로 이동 </a>
  </button>
  </div>
</section>
`;
  }
}