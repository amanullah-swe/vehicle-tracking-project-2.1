// import React from 'react'

// const ParkingManagement = () => {
//   return (
//     <div>ParkingManagement</div>
//   )
// }

// export default ParkingManagement

import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Logout from "../../assets/images/import_icon.svg";
import Share from "../../assets/images/XMLID_1022_.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import option from "../../assets/images/option-three-dot.svg";
import { Accordion, Col, Dropdown, Form, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import MapComponent from "../../sharedComponent/MapComponent";
import { useTranslation } from "react-i18next";

import ApiConfig from "../../api/ApiConfig";
import { simpleDeleteCall, simplePostCall } from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import Multiselect from "multiselect-react-dropdown";
import Loader from "../../sharedComponent/Loader";
import { useSelector } from "react-redux";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const ParkingManagement = () => {
 const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
 const { sidebar, setSidebar, Dark, setDark, recordsPerPage, setRegionCord,
    setMapZoomValue, setPositionCercle,
    positionRectangle,
    setPositionRectangle,
    setPostionRadius,
    setPostionPolygon,

  } = useContext(AppContext);
  const [tabClicked, setTabClicked] = useState(false);
  const [navClicked, setNavClicked] = useState(false);
  const [isView, setIsView] = useState(false);
  const [show, setShow] = useState(false);
  const [cardDetails, setCardDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const handleClose = () => setShow(false);
  const { t, i18n } = useTranslation();
 const [total_count, setTotal_count] = useState(null);
  const [last_page, setlast_page] = useState(false);
  const [assignedVehicles, setassignedVehicles] = useState([])
  const [suggestedVehicle, setsuggestedVehicle] = useState([])
  const [showParkingModal, setshowParkingModal] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [selectedslots, setselectedslots] = useState([]);
  const [slots, setSlots] = useState([])
  const [vehicleId, setvehicleId] = useState("")
  const [filteredStations, setfilteredStations] = useState([])
  const [filters, setfilters] = useState({ slot_name: "", slot_code: "", address: "" })
  const [deletedId, setDeletedId] = useState("");
  const [filteredVehicles, setfilteredVehicles] = useState([]);
  const [vehicleName, setvehicleName] = useState("");
  const [singleCardDetails, setSingleCardDetails] = useState({
    address: "",
    school_id: "",
    slot_code: "",
    slot_gps_latitude: "",
    slot_gps_longitude: "",
    slot_id: "",
    slot_name: "",
    slot_status: "",
  });
  const [searchData, setSearchData] = useState({
    slotCode: "",
    slotName: "",
    address: "",
  });
  const [page, setPage] = useState(1);

  const [slotName, setslotName] = useState("")
  const [slotCode, setslotCode] = useState("")
  const [address, setaddress] = useState("")
  const deAssignVehicle = (slot_id, vehicle_id) => {
    simplePostCall(
      ApiConfig.PARKING_SLOT_DEASSIGN,
      JSON.stringify({ slot_id: slot_id, vehicle_id: vehicle_id })
    ).then((data) => {

      notifySuccess('Vehicle Deassigned Successfully')
      getAllparkingSlot();
      getsuggestedVehicle();
    })

  }
  const getsuggestedVehicle = () => {
    simplePostCall(
      ApiConfig.PARKING_SLOT_SUGGESTEDVEHICLE
    ).then((data) => {

      setsuggestedVehicle(data.data);
      setfilteredVehicles(data.data);

    })


  }
 const getStations = () => {
    simplePostCall(
      ApiConfig.PARKING_SLOT_STATIONS

    ).then((data) => {
      setSlots(data.data)
    })

  }


  const ParkingSlotDelete = () => {
    setCardDetails([]);
    setTabClicked(false);
    handleClose();
    simpleDeleteCall(
      ApiConfig.PARKING_SLOT_DELETE,
      JSON.stringify({ slot_id: deletedId })
    )
      .then((res) => {
        setPostionPolygon([]);
        setPositionRectangle([]);
        setPositionCercle([]);
        setPostionRadius("");
        if (res.result) {
          getAllparkingSlot();
          notifySuccess(res.message);
        } else {
          notifyError(res.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };


  const handleSelect = (selected) => {
    setselectedslots(selected)
  }
  const handleRemove = (selected) => {
    setselectedslots(selected)
  }
  useEffect(() => {
    getsuggestedVehicle();
    getStations()
  }, [])
  const getAllparkingSlot = (page) => {
    page == 1 && setLoader(true);
    simplePostCall(
      ApiConfig.PARKING_SLOT_LISTS,
      JSON.stringify({ ...searchData, page: page, pageLimit: recordsPerPage ,access_rights:"rights_view_parking_management"})
    )
      .then((res) => {
        setLoader(false);
        if (res.result === true) {

          if (searchData.slotCode !== "") {
            setCardDetails(res.data);

          } else if (searchData.slotName !== "") {
            setCardDetails(res.data);
          } else if (searchData.address !== "") {
            setCardDetails(res.data);
          } else {
            setCardDetails([...cardDetails, ...res.data]);
          }
          setfilteredStations(res.data)
          setlast_page(res?.last_page);
          setTotal_count(res?.total_count);
          setTabClicked(false);
        } else {
          setCardDetails([]);
        }
      })
      .catch((err) => {
        console.log("api response", err);
      });
  };
  const getSingleLIstParkingSlot = (id) => {
    const newdata = cardDetails.filter((ele) => ele.slot_id === id);
    if (newdata[0]) {
      setMapZoomValue(9);

      if (newdata && newdata[0].type == "rectangle") {
        setPositionRectangle(newdata[0].drowvalue);
      }
      if (newdata && newdata[0].type == "circle") {
        let dataout = newdata[0]?.drowvalue;
        setPostionRadius(
          Number(newdata[0]?.radius) ? Number(newdata[0]?.radius) : ""
        );
        setPositionCercle(dataout);
      }
      if (newdata[0].type == "polygon") {
        setPostionPolygon(newdata[0].drowvalue);
      }
      if(newdata[0]?.slot_gps_latitude&&newdata[0]?.slot_gps_longitude)
    {  setRegionCord([
        Number(newdata[0]?.slot_gps_latitude),
        Number(newdata[0]?.slot_gps_longitude),
      ]);}
    }
    setSingleCardDetails(newdata && newdata[0])
  };

  const assignVehicles = async () => {
    if (selectedslots && selectedslots[0].slot_id != "" || selectedslots[0].slot_id != undefined || selectedslots[0].slot_id != undefined) {
      setshowParkingModal(true);
      simplePostCall(
        ApiConfig.PARKING_SLOT_ASSIGNVEHICLE,
        JSON.stringify({
          slot_id: selectedslots && selectedslots[0].slot_id,
          vehicle_id: vehicleId
        })

      ).then((data) => {
        notifySuccess('Station assigned Successfully');
        setshowParkingModal(false);
        getAllparkingSlot();
        getsuggestedVehicle();
      })
    }
    else {
      notifyError('Please select atleat one parking station !')
    }


  }
  const handleFilter = (type, value) => {
    if (type == 'slot_name') {
      var slot_namewise = slotName && cardDetails && cardDetails.filter((single) => { return single.slot_name && single.slot_name.includes(value) })
      var slot_codewise = slotCode && cardDetails && cardDetails.filter((single) => { return single.slot_code && single.slot_code.includes(slotCode) })
      var slot_addresswise = address && cardDetails && cardDetails.filter((single) => { return single.address && single.address.includes(address) })
    }
    else if (type == "slot_code") {
      var slot_namewise = slotName && cardDetails && cardDetails.filter((single) => { return single.slot_name && single.slot_name.includes(slotName) })
      var slot_codewise = slotCode && cardDetails && cardDetails.filter((single) => { return single.slot_code && single.slot_code.includes(value) })
      var slot_addresswise = address && cardDetails && cardDetails.filter((single) => { return single.address && single.address.includes(address) })
    }
    else {
      var slot_namewise = slotName && cardDetails && cardDetails.filter((single) => { return single.slot_name && single.slot_name.includes(slotName) })
      var slot_codewise = slotCode && cardDetails && cardDetails.filter((single) => { return single.slot_code && single.slot_code.includes(slotCode) })
      var slot_addresswise = address && cardDetails && cardDetails.filter((single) => { return single.address && single.address.includes(value) })
    }
    if (slot_addresswise || slot_namewise || slot_codewise) {
      var arr = [...slot_addresswise, ...slot_namewise, ...slot_codewise]
      var uniqueArr = arr.reduce((accumulator, currentObject) => {
        // Check if the object already exists in the accumulator array
        var exists = accumulator.some((obj) =>
          obj.slot_id === currentObject.slot_id
        );

        // If the object doesn't exist, add it to the accumulator array
        if (!exists) {
          accumulator.push(currentObject);
        }

        return accumulator;
      }, []);
      setfilteredStations(uniqueArr)


    }


  }

  const handleVehicleFilter = (value) => {


    setvehicleName(value)
    setfilteredVehicles(suggestedVehicle && suggestedVehicle.filter((single) => { return single.vehicle_type_code && single.vehicle_type_code.includes(value) }))
  }


  useEffect(() => {
    getAllparkingSlot()
  }, [])


  return (
    <>
      <motion.div
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
        variants={aninations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
      >
        <div id="cx-wrapper" className="Parking_Slot ParkingManagement">
          <div className="upperMainSet">
            <div className="row top-content ">
              <div className="col-lg-8 col-md-12 arrange-margin left">
                <div className="row p-0">
                  <div className="col-md-4">
                    <div className="weekCounter">
                      <input
                        type="text"
                        value={slotName}
                        onChange={(e) => { setslotName(e.target.value); handleFilter('slot_name', e.target.value) }}
                        className="form-control"
                        placeholder="Station Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="weekCounter">
                      <input
                        type="text"
                        value={slotCode}
                        onChange={(e) => { setslotCode(e.target.value); handleFilter('slot_code', e.target.value) }}
                        className="form-control"
                        placeholder="Station Code"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="weekCounter">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => { setaddress(e.target.value); handleFilter('address', e.target.value) }}
                        className="form-control"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {
                userRole === "customer" ||
                  (accessRights &&
                    accessRights?.rights_manage_parking_management) ? (
                  <div className="col-lg-4 col-md-12 mainCol4 right">
                    <div className="leftSideSec">
                      <Link to="/AddParkingSlot" className="addParkBtn">
                        <button>+ {t("Add Parking Station")}</button>
                      </Link>
                      {/* <Link to="#">
                        <div className="inconMain">
                          <img src={Logout} alt="" />
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="inconMain left-margin me-0">
                          <img src={Share} alt="" />
                        </div>
                      </Link> */}
                    </div>
                  </div>
                ) : null
              }

            </div>

            <div className="row body-content g-3">
              <div className="col-lg-8 col-md-12">
                <div className="mainMape" id="parkinManager1">
                  <MapComponent componentId={"parkingView"}
                    cardDetails={filteredStations} />
                  {tabClicked ? (
                    <div
                      className="innerMapDetails "
                      id="model-responsive-on-map parkinManager"
                    >
                      <div className="headingDetails">
                        <div className="headingTxt">
                          <p className="heading">
                            {t("Parking Station Details")}
                          </p>
                        </div>
                        <div className="customer-option">
                          {
                            userRole === "customer" ||
                              (accessRights &&
                                accessRights?.rights_manage_parking_management) ? (
                              <Dropdown className={isView ? `d-none` : ""}>
                                <Dropdown.Toggle id="dropdown-basic">
                                  <img src={option} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    {" "}
                                    <Link to={
                                      "/AddParkingSlot/" +
                                      singleCardDetails?.slot_id
                                    } className="d-block">Edit</Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <Link to="#" onClick={() => { setShow(true); setDeletedId(singleCardDetails?.slot_id); }} className="d-block">Delete</Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            ) : null
                          }
                        </div>
                      </div>
                      <div className="innerCOntent">
                        <div className="row">
                          {/* <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Customer Name</p>
                            <p className="paraVal">Mr. John Doe</p>
                          </div> */}
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station Name</p>
                            <p className="paraVal">{singleCardDetails && singleCardDetails.slot_name}</p>
                          </div>
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station ID</p>
                            <p className="paraVal">{singleCardDetails && singleCardDetails.slot_id}</p>
                          </div>
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station Code</p>
                            <p className="paraVal">{singleCardDetails && singleCardDetails.slot_code}</p>
                          </div>
                          <div className="col-md-12 dividedCol form_input_main">
                            <p className="paraHead">{t("Address")}</p>
                            <p className="paraVal">
                              {singleCardDetails && singleCardDetails.address}
                            </p>
                          </div>
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station GPS Lattitude</p>
                            <p className="paraVal"> {singleCardDetails && singleCardDetails.slot_gps_latitude}</p>
                          </div>
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station GPS Longitude</p>
                            <p className="paraVal"> {singleCardDetails && singleCardDetails.slot_gps_longitude}</p>
                          </div>
                          <div className="col-md-3 dividedCol form_input_main">
                            <p className="paraHead">Station Status</p>
                            <p className="paraVal">{singleCardDetails && singleCardDetails.slot_status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="tabsCon">

                  <Tab.Container
                    id="left-tabs-example"
                    className="td-tab-wrapper"
                    defaultActiveKey="0"
                  >
                    <Nav
                      variant="pills"
                      className="td-nav"
                      id="InnerTabNew_Two"
                    >
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="0">
                          {t("Stations")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="td-tab">
                        <Nav.Link className="td-link" eventKey="1">
                          {t("Suggested Cars")}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Col sm={12} className="">
                      <Tab.Content>
                        <Tab.Pane eventKey="0">
                          <div id="navPills">
                            <Nav variant="pills" className="flex-column" id="ParkingManagment">

                              <Accordion>
                                {
                                  loader && <Loader />
                                }
                                {
                                  filteredStations && filteredStations.map((single, index) => {
                                
                                    return (
                                      <Accordion.Item eventKey={index + 1}>
                                        <Accordion.Header>

                                          <Nav.Item
                                            onClick={() => {
                                              setTabClicked(!tabClicked);
                                              setNavClicked(!navClicked);
                                              setPostionPolygon([]);
                                              setPositionRectangle([]);
                                              setPositionCercle([]);
                                              setPostionRadius("");
                                              setassignedVehicles(single.vehicle_details)

                                              getSingleLIstParkingSlot(
                                                single.slot_id
                                              );
                                            }}
                                          >


                                            <Nav.Link eventKey={index
                                              + 1}>
                                              <div className="AllFlexNav">
                                                <div>
                                                  <p className="paraNav">Station Name</p>
                                                  <p className="paraNavTxt">
                                                    {single.slot_name}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="paraNav">Station Code</p>
                                                  <p className="paraNavTxt">  {single.slot_code}</p>
                                                </div>
                                                <div>
                                                  <p className="paraNav">Parking Capacity</p>
                                                  <p className="paraNavTxt">
                                                    {single.parking_capacity && single.vehicle_details && single.parking_capacity - single.vehicle_details.length + "/" + single.parking_capacity}
                                                  </p>
                                                  <p className="paraNavTxt">10/10</p>
                                                </div>
                                              </div>
                                            </Nav.Link>




                                          </Nav.Item>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                          <div
                                            className="main-master-wrapper mb-0 p-0"
                                            id="CustomerSupport"
                                          >
                                            <table className="holiday-table">
                                              <thead className="ht-head">
                                                <tr>
                                                  <td>Sr no</td>
                                                  <td>Vehicle registraion Number</td>
                                                  <td>Vehicle Type</td>

                                                  <td>Action</td>
                                                </tr>
                                              </thead>
                                              <tbody className="ht-body">

                                                {
                                                  assignedVehicles && assignedVehicles.map((singleV, index) => {
                                                    return (
                                                      <tr className="table-row-custom">
                                                        <td>{index + 1}</td>
                                                        <td>{singleV.vehicle_registraion_no}</td>
                                                        <td>{singleV.vehicle_Type}</td>

                                                        <td className="De-assign" onClick={() => deAssignVehicle(single.slot_id, singleV.vehicle_id)}><p>De-assign</p></td>
                                                      </tr>
                                                    )
                                                  })
                                                }




                                              </tbody>
                                            </table>
                                          </div>
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    )
                                  })
                                }

                              </Accordion>
                            </Nav>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="1">
                          <Nav
                            variant="pills"
                            className="flex-column"
                            id="navPills"
                          >
                            <div id='ParkingManagment'>
                              <div className="main-master-wrapper mb-0 p-0 rounded-0" id='CustomerSupport'>
                                <input onChange={(e) => { handleVehicleFilter(e.target.value) }} value={vehicleName} type="search" className="form-control" placeholder="Search Vehicle to assign the parking station " />
                                <table className="holiday-table">
                                  <tbody className="ht-body">
                                    {
                                      filteredVehicles && filteredVehicles.map((single, index) => {
                                        return (
                                          <tr className="table-row-custom">
                                            <td>{index + 1}</td>
                                            <td>{single.vehicle_reg_no}</td>
                                            <td>{single.vehicle_type_code}</td>
                                            <td className="Assign">
                                              <p onClick={() => { setvehicleId(single.vehicle_id); setshowParkingModal(true) }}>Assign</p>
                                            </td>
                                          </tr>

                                        )
                                      })
                                    }

                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Nav>
                        </Tab.Pane>

                      </Tab.Content>
                    </Col>

                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Modal show={showParkingModal} onHide={() => setshowParkingModal(false)} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>Assign parking station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="multi-select-1">


            <Multiselect
              value={selectedslots}
              onSelect={handleSelect}
              onRemove={handleRemove}
              singleSelect
              options={slots && slots.map((single) => { return { label: single.slot_name, slot_id: single.slot_id } })}
              displayValue="label"
              className="w-full "
              display="chip"
              placeholder="select stations"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer btn-wrapper">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setshowParkingModal(false)}>
              Cancel
            </button>
            <button className="cx-btn-2" onClick={() => assignVehicles()}>
              Assign
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal Start */}
      <Modal show={show} onHide={handleClose} centered className="common-model">
        <Modal.Header closeButton>
          <Modal.Title>Delete Parking Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this parking Management ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer btn-wrapper">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={handleClose}>
              Cancel
            </button>
            <button className="cx-btn-2" onClick={() => { handleClose(); ParkingSlotDelete(); }}>
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}


    </>
  );
};

export default ParkingManagement;
