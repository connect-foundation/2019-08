import React from "react";
import styled from "styled-components";
import {CustomButton} from "presentation/components/atomic-reusable/custom-button";

const ButtonWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

interface PropType {
  onClick(parameter: any | void): any | void;
}

export const InviteButton: React.FC<PropType> = ({onClick}) => {
  return (
          <ButtonWrapper>
            <CustomButton
                    color={"#148567"}
                    fontColor={"#ffffff"}
                    name={"초대하기"}
                    size={"big"}
                    fontWeight={"bold"}
                    fontSize={"1.9rem"}
                    onClick={onClick}
            />
          </ButtonWrapper>
  );
};
