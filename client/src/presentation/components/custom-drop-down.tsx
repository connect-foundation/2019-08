import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import ArrowDownSignWhite from "../../assets/arrow-down-sign-white.png";
import { IconBox } from "./icon-box";

const Wrapper = styled.section`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid blue;
  }
`;
const Subject = styled.section`
  color: #ffffff;
`;

const Selected = styled.section`
  color: #ffffff;
`;

const IconListWrapper = styled.section`
  postion: relative;
`;

const ListWrapper = styled.ul`
  border: 2px solid green;
  position: absolute;
  margin: 0;
  padding: 0;
  top: 100%;
  background-color: #ffffff;
  list-style-type: none;
`;

const List = styled.li`
  color: #000000;
  border-top: 2px solid green;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;

const Button = styled.button`
  color: #ffffff;
`;

interface PropsType {
  type: string;
  list: Array<string>;
}

export const CustomDropDown: React.FC<PropsType> = props => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(props.list[0]);

  const handleClick = () => {
    setOpened(!opened);
  };

  const selectListItem = (listItem: string) => (e: MouseEvent) => {
    setSelected(listItem);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Subject>{props.type} : </Subject>
      <Selected>{selected}</Selected>

      <IconBox imageSrc={ArrowDownSignWhite} />
      {opened ? (
        <ListWrapper>
          {props.list.map(listItem => (
            <List key={listItem} onClick={selectListItem(listItem)}>
              {listItem}
            </List>
          ))}
        </ListWrapper>
      ) : null}
    </Wrapper>
  );
};
