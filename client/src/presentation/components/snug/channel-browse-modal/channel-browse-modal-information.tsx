import React from "react";
import styled from "styled-components";
import LetterXWhite from "assets/letter-x-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";

const InformationSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const InformationSectionHeader = styled.header`
  width: 100%;
  font-size: 1rem;
`;

interface PropTypes {
  onClick(parameter: any | void): any | void;
}

export const ChannelBrowseModalInformation: React.FC<PropTypes> = ({
  onClick
}) => {
  return (
    <InformationSection>
      <InformationSectionHeader>채널에 대하여</InformationSectionHeader>
      <IconBox imageSrc={LetterXWhite} onClick={onClick} />
    </InformationSection>
  );
};
