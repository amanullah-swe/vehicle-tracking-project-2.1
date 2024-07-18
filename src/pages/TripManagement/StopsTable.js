import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styled from 'styled-components';
import TableRow from './TableRow';
import { useCallback } from 'react';
import { useState } from 'react';
import { stoplist } from './data';
import arrayMove from './arrayMove';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function StopsTable({ stoplist, setStoplist,setPrioritychagne }) {
  // Draggable Table Row
  const MyTableWrapper = styled.div`
   // padding: 10px;
   width: 100%;
   .empty-th {
     padding: 10px 15px;
   }
   .fixed_header {
     width: 100%;
     border-collapse: separate;
     border-spacing: 0 10px;

     & > tbody {
       display: block;
       width: 100%;
       cursor: grabbing;
       background: transparent;
       & > td {
         & > tr {
         }
       }
     }

     & > thead {
       background: #fff;
       color: #8f4300;
       border: none;

       & > tr {
         display: block;
         //width: 793px;
       }
     }

     & > thead th {
       width: 16%;
       border: none;
       &:first-child {
         width: 80px;
       }
     }
     & > thead th,
     & > tbody td {
       padding: 10px;
       text-align: left;
       width: 16%;
       // border-radius:10px;
     }
     & > tbody tr {
       border-radius: 10px;
       td {
         padding: 15px;
         border: 1px solid #f6efe9;
         color: #8f4300;
         font-size: 14px;
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
     }
   }
 `;

  // useEffect(() => {
  //   setStoplist(stoplist)
  // }, [stoplist])

  const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });

  const SortableItem = SortableElement((props) => <TableRow {...props} />);
  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
setStoplist((oldstoplist) => arrayMove(oldstoplist, oldIndex, newIndex));
    setPrioritychagne(true)
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <>
    {stoplist.length>0&&(   <div className="main-master-wrapper mt-3">
      <div className="Heading">
        <p>{t("Stop List")}</p>
      </div>
      <MyTableWrapper>
        <table className="table fixed_header Stop-details-table">
          <thead>
            <tr>
              <th>{t("Sr.No.")}</th>
              <th>{t("Stop Name")}</th>
              {/* <th>{t("Stop Code")}</th>
              <th>{t("Distance From Source")}</th> */}
            </tr>

          </thead>
          <SortableCont
            onSortEnd={onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges={true}
            // lockOffset={["30%", "50%"]}
            helperClass="helperContainerClass"
            useDragHandle={true}
          >
            {stoplist?.map((value, index) => (

              <SortableItem
                key={`item-${index}`}
                index={index}
                first={index + 1 || value.first}
                second={value?.pickup_point_name || value?.second}
                third={value?.pickup_point_code || value?.third}
              fourth={value?.pickup_point_distance_from_source}
              // fifth={value.fifth}
              />
            ))}
          </SortableCont>
        </table>
      </MyTableWrapper>
    </div>)}
    </>
 

  )
}
