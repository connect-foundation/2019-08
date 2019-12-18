import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ApplicationProptype } from "prop-types/application-type";
import { HomeDetailSnug } from "./home-detail-snug";
import { Snug } from "core/entity/snug";
import PlusSymbol from "assets/plus-symbol.png";
import { globalSocket } from "contexts/socket-context";
import { Link } from "react-router-dom";

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

const DetailSnugWrapper = styled.section`
  height: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.header`
  font-weight: bold;
  font-size: 1.25rem;
`;

export const HomeSnug: React.FC<ApplicationProptype> = props => {
  const { Application } = props;
  const [snugs, setSnugs] = useState<Snug[] | boolean>([]);
  const socket = useContext(globalSocket);

  useEffect(() => {
    (async () => {
      const initialSnugs = await Application.services.snugService.getList();
      setSnugs(initialSnugs);
    })();
  }, []);

  useEffect(() => {
    const { userSocket } = socket;

    userSocket.off("acceptInvitation");
    const user = Application.services.authService.getUserInfo();
    const id = user.id;
    userSocket.emit("login", { userId: id });
    userSocket.on("acceptInvitation", (invitation: any) => {
      const invitedSnug = invitation.payload;
      const currentSnugs = snugs as Snug[];
      setSnugs(currentSnugs.concat(invitedSnug));
    });
  });
  return (
    <Wrapper>
      <DescriptionWrapper>
        <SnugDescription>아늑한 공간을 지금 바로 이용해보세요!</SnugDescription>
      </DescriptionWrapper>
      <DetailSnugWrapper>
        <SnugListHeader>
          <Title>내 Snug</Title>
          <Link to="register-snug">
            <PlusButton src={PlusSymbol}></PlusButton>
          </Link>
        </SnugListHeader>
        {snugs
          ? (snugs as Snug[]).map((snug: Snug) => {
              return (
                <HomeDetailSnug
                  key={snug.id!}
                  name={snug.name!}
                  description={snug.description!}
                  link={snug.id!}
                />
              );
            })
          : undefined}
      </DetailSnugWrapper>
    </Wrapper>
  );
};

const SnugListHeader = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const PlusButton = styled.img`
  height: auto;
  width: auto;
  max-height: 20px;
  max-width: 20px;
  cursor: pointer;
`;
