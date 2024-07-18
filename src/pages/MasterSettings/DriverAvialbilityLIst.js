import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pagenation from "../../sharedComponent/Pagenation";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import export_icon from "../../assets/images/export_icon.svg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { simpleGetCall, simplePostCall } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { DateDDMMYYYY } from "../../sharedComponent/common";


export default function DriverAvialbilityList() {
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const { sidebar } = useContext(AppContext);
  const [VehicleAvailbilitList, setVehicleAvailbilitList] = useState([]);
  const [FiltertData, setFiltertData] = useState("");
  const [total, setTotals] = useState("");
    const [page, setPage] = useState(1);
  const [last_page, setlast_page] = useState(false);
  const { t } = useTranslation();
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const [datalist, setDataList] = useState([]);

  useEffect(() => {
    geAdministratorList();
  }, []);

  function geAdministratorList() {

    simpleGetCall(ApiConfig.USER_ADMINISTRATOR)
      .then((data) => {
        if (data.result) {
          setDataList(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
 
  }



  useEffect(() => {
    getAvailbilitylist(page);

  }, [FiltertData]);

  function getAvailbilitylist(currentPage) {

    let newRequestBody = JSON.stringify({
      vehicle_name:FiltertData,
      vehicle_type:"",
      page: currentPage,
      
    });
    simplePostCall(ApiConfig.VEHICEL_AVALIVALITY_LIST, newRequestBody)
      .then((data) => {
        if (data.result) {
         
          setTotals(data?.total);
          setlast_page(data.last_page);
          let FilterData = data.data ? data.data : [];
          let TransportData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              vehicle_number: eachteam.vehicle_number || "",
              vehicle_type_code: eachteam.vehicle_type_code || "",
   
            };
          });

          if (currentPage === 1 || currentPage === 0) {
            setVehicleAvailbilitList(data?.data?data?.data:[]);
          } else {
            setVehicleAvailbilitList([...VehicleAvailbilitList, ...TransportData]);
          }
        } else {
          // setTransportinactive(data.data);
          setVehicleAvailbilitList([]);
          setlast_page(false);
       
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
    
  }


  function onPageLoad() {
    setPage(page + 1);
    getAvailbilitylist(page + 1);
  }
return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper" className="Vehicle_inspition">
        {/* Top inputs for instatnt search */}
        <div className="Header_Top">
          <div className="displayFlexInp">
              
            <div className="innerSelectBox weekCounter selectForm form_input_main" 
              style={{ width: "330px" }}>
              <Form.Control
  
                required
                type="text"
                placeholder="Vehicle Name"
                className="innerCust"
                onChange={(e) => {
                  setFiltertData(e.target.value);
                 
                }}
              />
            </div>
            {/* <div className="innerSelectBox weekCounter selectForm form_input_main" >
              <Form.Control

                required
                type="text"
                placeholder="Vehicle Type"
                className="innerCust"
              />
            </div> */}
          </div>

          {userRole === "customer" ||
          (accessRights &&
            accessRights?.rights_manage_vehicle_inspection_dashboard) ? (
            <>
              {/* <div className="headerDivIc diffBtns form_input_main">
                <Link to="#">
                  <img src={export_icon} alt="" />
                </Link>
              </div> */}
            </>
          ) : null}
        </div>
        {/* Vehicle table */}
        <div className="main-master-wrapper">
          <div id="scroll_insideThe_Padding_tabel"
             onScroll={(e) => {
              const bottom =
                e.target.scrollHeight - e.target.scrollTop ===
                e.target.clientHeight;

              if (bottom && !last_page) onPageLoad();
            }}
          >
            <div className="VA_table">
              <table className="table tableAdmin">
                <thead className="tableHead">
                  <tr>
                    <th>{t("Sr.no")}</th>
                    <th>{t("Vehicle Name")}</th>
                    <th>{t("Vehicle Type")}</th>


                  
                    <th>{t("Last Trip")}</th>
                    <th>{t("Action")}</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {VehicleAvailbilitList?.map((data,index) => {
                    return (
                      <tr key={index +1 }>
                        <td>{index +1}</td>
                        <td>{data.vehicle_number}</td>
                        <td>{data.vehicle_type_code}</td>
                        <td>{DateDDMMYYYY(data.trip_date)}</td>
                        <td> + Assign Trip</td>
                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        {VehicleAvailbilitList?.length > 0 && (
              <Pagenation length={VehicleAvailbilitList?.length} total={total} />
            )}
        </div>
      </div>
    </motion.div>
  );
}
