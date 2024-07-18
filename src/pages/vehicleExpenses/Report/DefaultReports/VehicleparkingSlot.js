import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppContext } from "../../../../context/AppContext";
import SubHeader from "../../../../sharedComponent/SubHeader";
import { Nav, Tab } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import CommonDatePicker from "../../../../sharedComponent/CommonDatePicker";
import Form from 'react-bootstrap/Form';
import MapComponent from "../../../../sharedComponent/MapComponent";
import ApiConfig from "../../../../api/ApiConfig";
import { getWithAuthCall, simplePostCall } from "../../../../api/ApiServices";
import { latestDate } from "../../../../sharedComponent/common";

const VehicleparkingSlot = () => {
    const { t } = useTranslation();
    const [tripList, setTripList] = useState([]);
    const { sidebar, setLinkReport, LinkReport, setOptionDynamicDownload, OptionDynamicDownload } =
        useContext(AppContext);
    const [currentDate, setCurrentDate] = useState({ toDayDate: new Date() });
    const maxDate = new Date();
    const [showMap, setShowMap] = useState(false);
    const [mapDataLive, setMapDataLive] = useState([]);
    const [shareLink, setShareLink] = useState(false);
    const [shareLinkData, setShareLinkData] = useState("10");
    const [selectedPopmMrker, setSelectedPopMarker] = useState(0);
    const [customerSettingdata, setCustomerSettingdata] = useState({});
    const [vehicleList, setvehicleList] = useState([]);
    const [VehicleId, setVehicleId] = useState("");
    const [FilterId, seFilterId] = useState("");

    const [OrderListData, setOrderListData] = useState([]);
    console.log("OrderListData",OrderListData);
    const [pdfData, setpdfData] = useState("");
    const [loading, setLoading] = useState(false);

    const aninations = {
        initial: { opacity: 0, x: 400 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };

    useEffect(() => {

        reportViewList();
       }, [LinkReport,VehicleId,FilterId,currentDate]);

    const reportViewList = () => {
        let requestData;
    
        requestData = {
            logged_date: latestDate(currentDate.toDayDate, "yyyy-MM-dd"),
          format: OptionDynamicDownload,
          vehicle:VehicleId,
          filterby:FilterId,

        };
    
        if (requestData) {
          setLoading(true);
          simplePostCall(
            ApiConfig.GET_REPORT_LSIT + LinkReport,
            JSON.stringify(requestData)
          )
            .then((res) => {
              if (res.result) {
                setOptionDynamicDownload("")
                setLoading(false);
                
                // Extract the array of items from the response
                const firstKey = res.filepath;
                setpdfData(firstKey);
                if (!firstKey) {
                  setOrderListData(res.data.vehProvider);
                }
                // Set the array to the state
              } else {
                // Handle the case when the result is false
                // notifyError(res.message);
              }
            })
            .catch((err) => {
              console.log("Error:", err);
            })
            .finally(() => {
              // setLoading(false);
            });
        }
      };

      useEffect(() => {
        getVehicelList();
      }, [,]);
    
      function getVehicelList() {
        getWithAuthCall(ApiConfig.VEHICEL_AVALIVALITY_DROPDAWAN)
          .then((data) => {
            // setVehicalType(data?.data);
            setvehicleList(data?.data);
          })
          .catch((error) => {
            console.log("api response", error);
          });
      }
    return (
        <>
            <motion.div
                className={sidebar && sidebar ? "taskMain " : "cx-active  taskMain"}
                id="cx-main"
                variants={aninations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.1 }}
            >
                <div id="cx-wrapper" className="Vehicle_inspition_dashboard heightFixed">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <SubHeader />
                        </div>
                        <div className="col-md-12">
                            <div className="parkingBox">
                                <Tab.Container
                                    id="left-tabs-example"
                                    className="td-tab-wrapper"
                                    defaultActiveKey="Parking"
                                >
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link href="#" eventKey="Parking" 
                                            onChange={(e) => setCurrentDate({ toDayDate: new Date() })}
                                            >Vehicles By Parking Slot</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link 
                                            onChange={(e) => setCurrentDate({ toDayDate: new Date() })}
                                            eventKey="Checkin">Vehicles Chekin/Checkout</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Parking">
                                            <div className="parkingTabBox">
                                                <div className="row">
                                                    <div className="col-md-3 mb-3">
                                                        <div className="dropDowns">
                                                            <Dropdown>
                                                                <Dropdown.Toggle id="dropdown-basic">
                                                                    Select parking Slot
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <input type="text" className="form-control mb-1" />
                                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <div className="dropDowns">
                                                        <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        placeholder="Vehicle list"
                                                        onChange={(e) => setVehicleId(e.target.value)}
                                                      >
                                                        <option value={0}>Vehicle</option>
                                                        {vehicleList.map((vehicle) => (
                                                          <option Value={vehicle.vehicle_id}>
                                                            {vehicle.vehicle_number}
                                                          </option>
                                                        ))}
                                                      </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                                                            <CommonDatePicker
                                                                dateKey={"toDayDate"}
                                                                setDate={setCurrentDate}
                                                                data={currentDate}
                                                                SetPlaceholder={"Today Date"}
                                                                dataDisbal={maxDate}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <button className="submitBtn">Submit</button>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <button onClick={() => setShowMap(!showMap)} className="showBtn">{showMap ? "Show Map" : "Hide Map"}</button>
                                                    </div>
                                                    <div className="col-md-6 selectBox mb-3">
                                                        <Form.Select aria-label="Default select example" 
                                                        onChange={(e) => seFilterId(e.target.value)}
                                                        >
                                                            <option>Filter By</option>
                                                            <option value="Still Parked">Still Parked</option>
                                                            <option value="Already Checkedout">Already Checkedout</option>
                                                           
                                                        </Form.Select>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <div className="heighScroller">
                                                            <table className="table tableAdmin table-striped">
                                                                <thead className="tableHead">
                                                                    <tr>
                                                                        <th>{t("#")}</th>
                                                                        <th>{t("Slot Name")}</th>
                                                                        <th>{t("Vehicle Count")}</th>
                                                                        <th>{t("Action")}</th>
                                                                    </tr>
                                                                </thead>
                                                             <tbody className="tableBody">
                                                                {OrderListData && OrderListData.length > 0 ? (
                                                                    OrderListData?.map((itemlist, index) => {
                                                                        return (
                                                                            <>
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{itemlist.slot_name
                                                                                    }</td>
                                                                                    <td>{itemlist.vehicle_reg_no}</td>
                                                                                    <td>{itemlist.vehicle_status}</td>

                                                                                  
                                                                                </tr>
                                                                            </>
                                                                        );
                                                                    })
                                                                ) : ( 
                                                                <></>
                                                                )}
                                                            </tbody> 
                                                              
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        {/* <div className="mapWrapper"> */}
                                                        <MapComponent
                                                            componentId={"VehicleparkingSlot"}
                                                            // iconMarker={yellowCar}
                                                            // mapDataLive={mapDataLive}
                                                            setShareLink={setShareLink}
                                                            setShareLinkData={setShareLinkData}
                                                            selectedPopmMrker={selectedPopmMrker}
                                                            setSelectedPopMarker={setSelectedPopMarker}
                                                            customerSettingdata={customerSettingdata}
                                                        />
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Checkin">
                                            <div className="parkingTabBox">
                                                <div className="row">
                                                    <div className="col-md-3 mb-3">
                                                        <div className="dropDowns">
                                                        <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        placeholder="Vehicle list"
                                                        onChange={(e) => setVehicleId(e.target.value)}
                                                      >
                                                        <option value={0}>Vehicle</option>
                                                        {vehicleList.map((vehicle) => (
                                                          <option Value={vehicle.vehicle_id}>
                                                            {vehicle.vehicle_number}
                                                          </option>
                                                        ))}
                                                      </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                                                            <CommonDatePicker
                                                                dateKey={"toDayDate"}
                                                                setDate={setCurrentDate}
                                                                data={currentDate}
                                                                SetPlaceholder={"Today Date"}
                                                                dataDisbal={maxDate}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        {/* <div className="innerSelectBox weekCounter datepicker-main BGiMP mr-3">
                                                            <CommonDatePicker
                                                                dateKey={"toDayDate"}
                                                                setDate={setCurrentDate}
                                                                data={currentDate}
                                                                SetPlaceholder={"Today Date"}
                                                                dataDisbal={maxDate}
                                                            />
                                                        </div> */}
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <button className="submitBtn">Submit</button>
                                                    </div>
                                                   

                                                    <div className="col-md-12 selectBox mb-3">
                                                    <Form.Select aria-label="Default select example" 
                                                    onChange={(e) => seFilterId(e.target.value)}
                                                    >
                                                        <option>Filter By</option>
                                                        <option value="Still Parked">Still Parked</option>
                                                        <option value="Already Checkedout">Already Checkedout</option>
                                                       
                                                    </Form.Select>
                                                </div>
                                                    <div className="col-md-12 mb-3">
                                                        <div className="heighScroller">
                                                            <table className="table tableAdmin table-striped">
                                                                <thead className="tableHead">
                                                                    <tr>
                                                                        <th>{t("#")}</th>
                                                                        <th>{t("Vehicle Number")}</th>
                                                                        <th>{t("Slot Name")}</th>
                                                                        <th>{t("Checkin")}</th>
                                                                        <th>{t("Checkout")}</th>
                                                                    </tr>
                                                                </thead>
                                                                {/* <tbody className="tableBody">
                                                                {OrderListData && OrderListData.length > 0 ? (
                                                                    OrderListData?.map((itemlist, index) => {
                                                                        return (
                                                                            <>
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{itemlist.vehicle_number
                                                                                    }</td>
                                                                                    <td>{itemlist.vehicle_reg_no}</td>
                                                                                    <td>{itemlist.vehicle_status}</td>

                                                                                    <td>{itemlist.vehicle_imei}</td>

                                                                                    <td>{itemlist.location}</td>
                                                                                    <td>{itemlist.last_tracked
                                                                                    }</td>
                                                                                </tr>
                                                                            </>
                                                                        );
                                                                    })
                                                                ) : ( */}
                                                                {/* <div className=""><NoDataComp /></div> */}
                                                                {/* )}
                                                            </tbody> */}
                                                                <tbody>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                        <td>1</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default VehicleparkingSlot;
