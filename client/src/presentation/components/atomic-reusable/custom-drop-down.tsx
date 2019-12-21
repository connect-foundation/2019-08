import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import ArrowDownSignBlack from "assets/arrow-down-sign.png";
import { IconBox } from "./icon-box";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    box-sizing: border-box;
  }
`;

const Subject = styled.section``;

const Selected = styled.section``;

const ListWrapper = styled.ul`
  width: 200px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.snugBorderColor};
  border-radius: 5px;
  position: absolute;
  z-index: 8;
  margin: 0;
  padding: 10px 0px;
  top: 100%;
  background-color: ${({ theme }) => theme.snugMenuColor};
  list-style-type: none;
`;

const List = styled.li`
  padding: 5px 10px;
  color: ${({ theme }) => theme.snugSubFont};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.snugSelect};
    color: #000000;
  }
`;

export interface CustomDropDownConfig {
  type: string;
  list: Array<string>;
  setSelected?(parameter: any | void): any | void;
}

// todo : DropDown Component를 customize할 수 있게 props에서 다양한 변수를 받아
// styled-component에 대입해야 한다.
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
      <IconBox imageSrc={ArrowDownSignBlack} size="10px" />
      {opened && (
        <ListWrapper>
          {props.list.map(listItem => (
            <List key={listItem} onClick={selectListItem(listItem)}>
              {listItem}
            </List>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};
