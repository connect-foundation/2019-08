import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.section`
  flex: 1;
  margin-top: 1rem;
`;

interface PropType {
  sendEmails(parameter: any | void): any | void;
  snugId: string;
}

export const InviteButton: React.FC<PropType> = ({ sendEmails, snugId }) => {
  const goHome = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.assign(`/snug/${snugId}/channel/0`);
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <CustomButton
          color={"#148567"}
          fontColor={"#ffffff"}
          name={"초대하기"}
          size={"100%"}
          fontSize={"1.4rem"}
          onClick={sendEmails}
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <CustomButton
          color={"#148567"}
          fontColor={"#ffffff"}
          name={"다음"}
          size={"100%"}
          fontSize={"1.4rem"}
          onClick={goHome}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
