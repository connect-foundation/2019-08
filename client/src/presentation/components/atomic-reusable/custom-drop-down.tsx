import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import ArrowDownSignWhite from "assets/arrow-down-sign-white.png";
import { IconBox } from "./icon-box";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  border: 1px solid blue;
  &:hover {
    border: 1px solid white;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px 6px #000000;
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
  background-color: #29ad8a;
  list-style-type: none;
`;

const List = styled.li`
  color: #000000;
  border-top: 2px solid white;
  margin: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;

const Button = styled.button`
  color: #ffffff;
`;

export interface CustomDropDownConfig {
  type: string;
  list: Array<string>;
  setSelected?(parameter: any | void): any | void;
}

export const CustomDropDown: React.FC<CustomDropDownConfig> = props => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(props.list[0]);

  const handleClick = () => {
    setOpened(!opened);
  };

  const selectListItem = (listItem: string) => (e: MouseEvent) => {
    setSelected(listItem);
    props.setSelected && props.setSelected(listItem);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Subject>{props.type}: </Subject>
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
