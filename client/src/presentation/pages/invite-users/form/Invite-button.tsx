import React from "react";
import styled from "styled-components";
import {CustomButton} from "presentation/components/atomic-reusable/custom-button";
import {History} from "history";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.section`
  flex: 1
  margin-top: 1rem;
`;

interface PropType {
  history: History<any>;
  sendEmails(parameter: any | void): any | void;
}

export const InviteButton: React.FC<PropType> = ({history, sendEmails}) => {
  const goHome = () => history.push("/");
  return (
          <Wrapper>
            <ButtonWrapper>
              <CustomButton
                      color={"#148567"}
                      fontColor={"#ffffff"}
                      name={"초대하기"}
                      size={"100%"}
                      fontSize={"1.9rem"}
                      onClick={sendEmails}
              />
            </ButtonWrapper>
            <ButtonWrapper>
              <CustomButton
                      color={"#148567"}
                      fontColor={"#ffffff"}
                      name={"다음"}
                      size={"100%"}
                      fontSize={"1.9rem"}
                      onClick={goHome}
              />
            </ButtonWrapper>
          </Wrapper>
  );
};
