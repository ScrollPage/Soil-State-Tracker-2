import React, { memo, useState } from "react";
import { Wrapper, Title } from "./styles";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

interface SideBarProps {
  plainOptions: string[];
  checkedList: string[];
  setCheckedList: (items: string[]) => void;
}

const SideBarComponent: React.FC<SideBarProps> = ({
  plainOptions,
  checkedList,
  setCheckedList,
}) => {
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list as string[]);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Wrapper>
      <Title>
        Выбор кластера
      </Title>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Выбрать все
      </Checkbox>
      <hr />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export const SideBar = memo(SideBarComponent);
