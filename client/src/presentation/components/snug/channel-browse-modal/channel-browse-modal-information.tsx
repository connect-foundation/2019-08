import React from "react";
import styled from "styled-components";
import LetterXBlack from "assets/letter-x.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";

const InformationSection = styled.section`
  padding: 40px 0px;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const InformationSectionHeader = styled.header`
  color: ${({ theme }) => theme.snugSubFont};
  font-size: 0.9rem;
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
      <IconBox imageSrc={LetterXBlack} onClick={onClick} />
    </InformationSection>
  );
};
