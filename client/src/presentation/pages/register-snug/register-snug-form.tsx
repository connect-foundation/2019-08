import React from "react";
import styled, { css } from "styled-components";
import { CustomLoginInput } from "presentation/components/atomic-reusable/custom-login-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { ApplicationProptype } from "prop-types/application-type";

const Wrapper = styled.section`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DescriptionWrapper = styled.section`
  height: 30%;
  display: flex;
  align-items: center;
`;

const SnugDescription = styled.span`
  color: #000000;
  font-weight: bold;
  font-size: 2rem;
`;

const FormWrapper = styled.form`
  height: 40%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputHorizontal = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputVertical = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface TextConfig {
  fontSize?: string;
  paddingTop?: string;
}

const Text = styled.span`
  ${(props: TextConfig) => {
    let fontSize = props.fontSize ? props.fontSize : "1rem";
    let paddingTop = props.paddingTop ? props.paddingTop : "0";
    return css`
      font-size: ${fontSize};
      padding-top: ${paddingTop};
    `;
  }};
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterSnugForm: React.FC<ApplicationProptype> = (props) => {
  const { Application } = props;

  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>오직 '우리'를 위한 Snug 만들기</SnugDescription>
      </DescriptionWrapper>
      <FormWrapper>
        <InputHorizontal>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"예) snug"}
          ></CustomLoginInput>
          <Text fontSize={"1.3rem"}>.snug.com</Text>
        </InputHorizontal>
        <InputVertical>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Snug 이름"}
          ></CustomLoginInput>
          <Text fontSize={"0.7rem"} paddingTop={"5px"}>
            Snug 이름을 지어주세요.
          </Text>
        </InputVertical>
        <InputVertical>
          <CustomLoginInput
            color={"bdbdbd"}
            backgroundColor={"#ffffff"}
            placeholder={"Snug 설명"}
          ></CustomLoginInput>
          <Text fontSize={"0.7rem"} paddingTop={"5px"}>
            이 공간이 갖는 목표를 적어주세요.
          </Text>
        </InputVertical>
        <ButtonWrapper>
          <CustomButton
            color={"#fda600"}
            size={"300px"}
            name={"다음"}
            fontWeight={"bold"}
            fontColor={"#ffffff"}
            fontSize={"1.5rem"}
            height={"auto"}
          ></CustomButton>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};
