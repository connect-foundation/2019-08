import React from "react";
import styled from "styled-components";

const MessageCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;

const MessageCardImageBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 58px;
  max-width: 58px;
  min-height: 58px;
  max-height: 58px;
`;

const MessageCardImage = styled.img`
  border-radius: 10px;
  width: 80%;
  height: 80%;
`;
const MessageOwner = styled.section`
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const MessageOwnerName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const MessageTimestamp = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
`;

const MessageContents = styled.span`
  word-break: break-all;
  font-weight: 500;
  font-size: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const MessageBox = styled.section`
  padding: 5px;
  width: 100%;
  height: auto;
`;

const MarginBox = styled.section`
  width: 10px;
`;

interface PropTypes {
  imageSrc: string;
  userName: string;
  timestamp: string;
  message: string;
}

export const MessageCard: React.FC<PropTypes> = ({
  imageSrc,
  userName,
  timestamp,
  message
}) => {
  return (
    <MessageCardBox>
      <MarginBox></MarginBox>
      <MessageCardImageBox>
        <MessageCardImage src={imageSrc}></MessageCardImage>
      </MessageCardImageBox>
      <MessageBox>
        <MessageOwner>
          <MessageOwnerName>{userName}</MessageOwnerName>
          <MessageTimestamp>{timestamp}</MessageTimestamp>
        </MessageOwner>
        <MessageContents>{message}</MessageContents>
      </MessageBox>

      <MarginBox></MarginBox>
    </MessageCardBox>
  );
};
