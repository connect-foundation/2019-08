import React, { useState } from "react";
import styled from "styled-components";
import { CustomInput } from "presentation/components/atomic-reusable/custom-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { CustomOnOffButton } from "presentation/components/atomic-reusable/custom-on-off-button";
import { useChannelDispatch } from "contexts/channel-context";
import { useModalToggledDispatch } from "contexts/modal-context";

const ContentsForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 100%;
  justify-content: space-between;
`;

const ChannelSetPrivate = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelPrivateDescription = styled.section`
  display: flex;
  flex-direction: column;
  word-break: break-word;
`;

const ChannelPrivateDescriptionHeader = styled.header`
  font-weight: bold;
  font-size: 1.15rem;
  color: #ffffff;
`;

const ChannelPrivateDescriptionContents = styled.span`
  color: #ffffff;
`;

const CustomButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const ChannelPlusModalContents: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const channelDispatch = useChannelDispatch();
  const modalDispatch = useModalToggledDispatch();

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    channelDispatch &&
      channelDispatch({
        type: "CREATE",
        title: title,
        description: description,
        privacy: privacy,
        createdAt: new Date(), //todo : date, user 바꾸기
        creatorName: "두부"
      });

    modalDispatch &&
      modalDispatch({
        type: "TOGGLE_CHANNEL_PLUS_MODAL"
      });
  };

  return (
    <ContentsForm onSubmit={submitHandler}>
      <CustomInput
        title={"이름"}
        placeholder={"멋진 채널 이름을 입력하세요"}
        onChange={setTitle}
      ></CustomInput>
      <CustomInput
        title={"설명"}
        placeholder={"채널을 멋있게 설명해주세요"}
        onChange={setDescription}
      ></CustomInput>
      <ChannelSetPrivate>
        <ChannelPrivateDescription>
          <ChannelPrivateDescriptionHeader>
            비공개로 설정하기
          </ChannelPrivateDescriptionHeader>
          <ChannelPrivateDescriptionContents>
            채널을 비공개로 설정하면, 채널에 가입 또는 참여는 오직 초대를
            통해서만 가능합니다.
          </ChannelPrivateDescriptionContents>
        </ChannelPrivateDescription>
        <CustomOnOffButton onChange={setPrivacy}></CustomOnOffButton>
      </ChannelSetPrivate>
      <CustomButtonWrapper>
        <CustomButton
          color={"#000000"}
          fontColor={"#ffffff"}
          name={"submit"}
          size={"big"}
          type={"submit"}
        />
      </CustomButtonWrapper>
    </ContentsForm>
  );
};
