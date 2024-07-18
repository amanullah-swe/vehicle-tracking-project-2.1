import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import drag_icon from "../../assets/images/drag_icon.svg";

const TrWrapper = styled.tr`
  // background: blue;
  cursor: default;

  .firstElement {
    display: flex;
    flex-direction: row;
  }

  .fixed_header {
    & > thead th,
    & > tbody td {
      // padding: 10px;
      text-align: left;
      // width: 16%;
      // border-radius:10px;
    }
  }
  &.helperContainerClass {
    width: 100%;
    // border: 1px solid #efefef;
    // box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    // background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;

    &:active {
      cursor: grabbing;
      color: #8f4300;
    }
    tr {
      width: 100%;
    }
    & > td {
      padding: 15px;
      text-align: left;
      color: #8f4300;
      font-size: 14px;
      width: 16%;
      &:first-child {
        border-top-left-radius: 10px;
        border-right: none;
        border-bottom-left-radius: 10px;
        width: 50px;
      }
      &:nth-child(2) {
        border-right: none;
        border-left: none;
      }
      &:nth-child(3) {
        border-right: none;
        border-left: none;
      }
      &:nth-child(4) {
        border-right: none;
        border-left: none;
      }
      &:nth-child(5) {
        border-right: none;
        border-left: none;
      }
      &:nth-child(6) {
        border-right: none;
        border-left: none;
      }
      &:last-child {
        border-left: none;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

    & > tbody {
      // display: block;
      width: 100%;
      cursor: grabbing;
      background: transparent;
      & > td {
        & > tr {
        }
      }
    }
  }
`;

const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;

const RowHandler = SortableHandle(() => (
  <Handle className="handle">
    <img src={drag_icon} alt="" />
  </Handle>
));

const TableRow = ({
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  className,
}) => {
  return (
    <TrWrapper className={className}>
      <td>
        <div className="firstElement">
          <RowHandler />
        </div>
      </td>
      <td>{first}</td>
      <td>{second}</td>
      <td>{third}</td>
      <td>{fourth}</td>
      <td>{fifth}</td>
      <td>{sixth}</td>
    </TrWrapper>
  );
};

export default TableRow;
