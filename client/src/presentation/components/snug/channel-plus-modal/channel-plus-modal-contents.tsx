import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CustomInput } from "presentation/components/atomic-reusable/custom-input";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { CustomOnOffButton } from "presentation/components/atomic-reusable/custom-on-off-button";
import { useChannelDispatch } from "contexts/channel-context";
import { useModalToggledDispatch } from "contexts/modal-context";
import { ApplicationProptype } from "prop-types/application-type";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalSocket } from "contexts/socket-context";

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
  color: ${({ theme }) => theme.snugSubFont};
`;

const ChannelPrivateDescriptionHeader = styled.header`
  font-weight: bold;
  font-size: 1.15rem;
`;

const ChannelPrivateDescriptionContents = styled.span``;

const CustomButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const NotAcceptableChannel = styled.span`
  color: ${({ theme }) => theme.snugMainFont};
`;

export const ChannelPlusModalContents: React.FC<ApplicationProptype> = ({
  Application
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const channelDispatch = useChannelDispatch();
  const modalDispatch = useModalToggledDispatch();
  const parameter = usePathParameter();
  const { snugSocket } = useContext(globalSocket);

  const submitHandler = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!parameter.snugId) return;
    const snugId = parameter.snugId.toString();
    try {
      const profile = await Application.services.profileService.getProfile(
        parameter.snugId!
      );
      const channel = await Application.services.channelService.create(
        title,
        snugId,
        description,
        privacy
      );

      if (!Object.keys(channel).length) return;

      channelDispatch &&
        channelDispatch({
          type: "CREATE",
          id: channel.id!,
          title: channel.title!,
          description: channel.description!,
          privacy: channel.privacy!,
          createdAt: channel.createdAt!,
          creatorName: profile.name!
        });
      snugSocket.emit("newjoin", channel.id!);

      modalDispatch &&
        modalDispatch({
          type: "TOGGLE_CHANNEL_PLUS_MODAL"
        });
      setIsFailed(false);
    } catch (error) {
      setIsFailed(true);
      return;
    }
  };

  return (
    <ContentsForm onSubmit={submitHandler}>
      <CustomInput
        title={"이름"}
        placeholder={"멋진 채널 이름을 입력하세요"}
        onChange={setTitle}/>
      <CustomInput
        title={"설명"}
        placeholder={"채널을 멋있게 설명해주세요"}
        onChange={setDescription}/>
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
        <CustomOnOffButton onChange={setPrivacy}/>
      </ChannelSetPrivate>
      {isFailed ? (
        <NotAcceptableChannel>채널 생성에 실패했습니다.</NotAcceptableChannel>
      ) : null}
      <CustomButtonWrapper>
        <CustomButton
          color={"#000000"}
          fontColor={"#ffffff"}
          name={"채널 생성"}
          size={"big"}
          type={"submit"}
        />
      </CustomButtonWrapper>
    </ContentsForm>
  );
};
