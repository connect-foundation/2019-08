import React from "react";
import styled from "styled-components";
import Logo from "assets/apple-touch-icon.png";
import { PageLayout } from "presentation/components/atomic-reusable/page-layout";
import { ApplicationProptype } from "prop-types/application-type";

const Wrapper = styled.section``;

const Image = styled.img`
  display: block;
  margin: 0 auto 1.5rem auto;
  cursor: default;
`;

const Message = styled.span`
  font-size: 2rem;
  cursor: default;
`;

export const ErrorPage: React.FC<ApplicationProptype> = ({ Application }) => {
  return (
    <PageLayout Application={Application}>
      <Wrapper>
        <Image src={Logo} />
        <Message>잘못된 요청입니다.</Message>
      </Wrapper>
    </PageLayout>
  );
};
