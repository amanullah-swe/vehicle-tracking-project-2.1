import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import delete_icon from "../../../assets/images/delete.svg";
import delete_icon_disable from "../../../assets/images/deletedisable.svg";
import { Tab, Tabs, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Calendar from "../../../assets/images/calendar.svg";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import import_icon from "../../../assets/images/import_icon.svg";
import export_icon from "../../../assets/images/export_icon.svg";
import edit_icon from "../../../assets/images/ic-edit.svg";
import edit_icon_disable from "../../../assets/images/ic-editdisable.svg";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagenation from "../../../sharedComponent/Pagenation";
import ReactSelect from "../../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import {
  simpleDeleteCall,
  simpleGetCall,
  simplePostCall,
} from "../../../api/ApiServices";
import { notifyError, notifySuccess } from "../../../sharedComponent/notify";
import ApiConfig from "../../../api/ApiConfig";
import NoMoreDataComp from "../../../sharedComponent/NoMoreDataComp";
import NoDataComp from "../../../sharedComponent/NoDataComp";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
const UserRole = () => {
  const {
    sidebar,
    geUserListList,
    DynamicRole,
    setDynamicRole,
    recordsPerPage,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [userAllRole, setUserAllRole] = useState([]);
  const [last_page, setlast_page] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [create, setCreate] = useState(false);
  const { t, i18n } = useTranslation();
  const [requirements, setrequirements] = useState([
    { role_id: "", inputValue: "", route: "" },
  ]);

  const [DeleteId, setDeleteId] = useState("");
  const [EditId, setEditId] = useState("");

  const handleCloseCreate = () => {
    setEditId("");
    setCreate(false);
  };
  const handleShowCreate = () => {
    // setEditId("")
    if (EditId) {
      setEditId("");
    }
    setrequirements([{ role_id: "", inputValue: "", route: "" }]);
    setDynamicRole([{ role_id: "", inputValue: "", route: "" }]);
    setCreate(true);
  };
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltipForEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Edit")}
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );
  const onRequirementAdd = () => {
    setDynamicRole("");
    setrequirements("");
    usertHandal();
    let temp = {
      role_id: "",

      inputValue: "",
      route: "",
    };

    let addRequirements = [...requirements, temp];
    setrequirements(addRequirements);
    // setChoiseData(choiceArry)
    handleCloseCreate();
  };
  const onRequirementValueChange = (e) => {
    let choiceArry = [];
    let changeRequirement = requirements.map((each) => {
      return {
        role_id: each.id,
        inputValue: e.target.value.trim(),
        route: `/user-${e.target.value?.trim()}`,
      };
    });
    changeRequirement?.map((value, index) => {
      choiceArry.push(value);
    });
    setDynamicRole(changeRequirement);

    setrequirements(changeRequirement);
  };
  useEffect(() => {
    setrequirements(requirements);
  }, [requirements]);

  const navigate = useNavigate();

  const usertHandal = (e) => {
    if (EditId) {
      UpdateRole(e);
    } else {
      UserRoleAdd(e);
    }
  };
  function UpdateRole() {
    let newRequestBody = JSON.stringify({
      roleName: DynamicRole,
    });
    simplePostCall(ApiConfig.UPDATE_USER_ROLE + "/" + EditId, newRequestBody)
      .then((data) => {
        if (data.result) {
          // geUserListList();
          notifySuccess(data.message);
          handleClose();
          geUserAllList(1, "key");
          // navigate(data?.route);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  function UserRoleAdd() {
    let newRequestBody = JSON.stringify({
      roleName: DynamicRole,
    });
    simplePostCall(ApiConfig.USERS_ROLE_CREATE_API, newRequestBody)
      .then((data) => {
        if (data.result) {
          geUserListList();
          notifySuccess(data.message);
          handleClose();
          geUserAllList(1);
          // navigate(data?.route);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  useEffect(() => {
    geUserAllList(1, "");
  }, []);
  function geUserAllList(currentPage, key) {
    let newRequestBody = JSON.stringify({
      page: currentPage,
      page_limit: recordsPerPage,
    });
    simplePostCall(
      ApiConfig.USER_ROLE_ALL_LIST + "/" + currentPage,
      newRequestBody
    )
      .then((data) => {
        if (data.result) {
          setTotalPages(data.total_count);
          setlast_page(data?.last_page);
          let FilterData = data.roles ? data.roles : [];
          let UserData = FilterData.map((eachteam, index) => {
            return {
              ...eachteam,
              user_route: eachteam.user_route || "",
            };
          });
          if (key === "key") {
            setUserAllRole(data.roles);
          }

          if (currentPage === 1 || currentPage === 0) {
            setUserAllRole(data.roles);
          } else {
            setUserAllRole([...userAllRole, ...UserData]);
          }
        } else {
          setUserAllRole(0);

          // setlast_page(false);
          setTotalPages(0);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  function userDelete() {
    let newRequestBody = JSON.stringify({
      role_name: DeleteId,
    });
    simpleDeleteCall(ApiConfig.USER_ROLE_DELETE, newRequestBody)
      .then((data) => {
        if (data.result) {
          notifySuccess(data.message);
          geUserAllList(1, "key");
          handleClose();
          geUserListList();

          setPage(1);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const geDeliveryDetails = (id) => {
    simplePostCall(ApiConfig.USERS_ROLE_VIEW + id)
      .then((res) => {
        let changeRequirement = res.role_details.map((each) => {
          return {
            id: each.role_id,
            inputValue: each.role_name,
            route: each.role_route,
          };
        });
        setDynamicRole(changeRequirement);
        setrequirements(changeRequirement);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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
        <div id="cx-wrapper" className="Holidays_Main">
          <div
            className="holidays-filter-wrapper"
            style={{ width: "200%", padding: "10px" }}
          >
            <div className="right-wrapper">
              <Link
                to="#"
                onClick={handleShowCreate}
                className="add-holiday-btn"
                variant="primary"
              >
                + {t("Create Role")}
              </Link>
            </div>
          </div>

          <div className="main-master-wrapper">
            <div
              id="scroll_insideThe_Padding53"
              onScroll={(e) => {
                const bottom =
                  e.target.scrollHeight - e.target.scrollTop ===
                  e.target.clientHeight;
                if (bottom && !last_page) {
                  setPage(page + 1);
                  geUserAllList(page + 1, "");
                }
              }}
            >
              <div className="VA_table">
                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <td className="created_text">{t("Sr.No.")}</td>
                      <td className="title created_text">{t("Role")}</td>
                      <td className="created_text">{t("Status")}</td>
                      <td className="created_text">{t("Action")}</td>
                    </tr>
                  </thead>
                  {userAllRole && userAllRole.length > 0 ? (
                    userAllRole?.map((itemlist, index) => {
                      return (
                        <tbody className="ht-body">
                          <tr className="table-row-custom">
                            <td className="created_text">{index + 1}</td>
                            <td className="created_text">
                              {itemlist.role_name}
                            </td>
                            <td className="created_text">Active</td>
                            <td className="d-flex created_text">
                              {itemlist.type == "default" ? (
                                <>
                                  <div className="inconsIn">
                                    <img
                                      className="mr-2"
                                      src={edit_icon_disable}
                                      alt=""
                                      disabled={true}
                                    />
                                  </div>

                                  <div className="inconsIn">
                                    <img
                                      src={delete_icon_disable}
                                      alt=""
                                      disabled={true}
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <OverlayTrigger
                                    placement="left"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForEdit}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        geDeliveryDetails(itemlist.role_id);
                                        setEditId(itemlist.role_id);
                                        handleShowCreate();
                                      }}
                                    >
                                      <div className="inconsIn">
                                        <img
                                          className="mr-2"
                                          src={edit_icon}
                                          alt=""
                                        />
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForDelete}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setDeleteId(itemlist.role_name);
                                        geDeliveryDetails(itemlist.role_id);
                                        handleShow();
                                      }}
                                    >
                                      <div className="inconsIn">
                                        <img src={delete_icon} alt="" />
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                </>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </table>
                {userAllRole.length > 0 && (
                  <Pagenation length={userAllRole.length} total={totalPages} />
                )}
              </div>
              {userAllRole.length > 0 ? "" : <NoDataComp />}
            </div>
            {/* {last_page === true ? (
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "#9c4900",
                    }}
                  >
                    <b>No More data Found</b>
                  </p>
                ) : (
                  ""
                )} */}
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Delete User Role")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t("Are you sure you want to delete this Role")} ?
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleClose}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={userDelete}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={edit}
            onHide={handleCloseEdit}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{t("Edit Role")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label className="common-labels">
                {t("Role")} <span className="red-star">*</span>
              </Form.Label>
              <ReactSelect />
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleCloseEdit}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={handleCloseEdit}>
                {t("Yes")}
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={create}
            onHide={handleCloseCreate}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title>{DynamicRole[0] &&  DynamicRole[0].route ? "Update Role":"Create Role"}</Modal.Title> */}
              <Modal.Title>{EditId ? t("Update") : t("Create")}{t("Role")}  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label className="common-labels">
                {t("Role")} <span className="red-star">*</span>
              </Form.Label>
              <input
                class="form-control"
                type="text"
                name="stuff[]"
                value={
                  requirements[0].inputValue ? requirements[0].inputValue : ""
                }
                // onChange={(e) => {
                //   onRequirementValueChange(e);
                // }}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Use a regular expression to allow only alphanumeric characters
                  const sanitizedInput = inputValue.replace(
                    /[^a-zA-Z0-9]/g,
                    ""
                  );

                  // Update the state or perform other actions with the sanitized input
                  onRequirementValueChange({
                    target: { value: sanitizedInput },
                  });
                }}
                placeholder={EditId ? t("Update Role") : t("Add Role")}
                style={{ width: "95%" }}
              />
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-1" onClick={handleCloseCreate}>
                {t("Close")}
              </button>
              <button className="cx-btn-2" onClick={onRequirementAdd}>
                {/* { DynamicRole[0] && DynamicRole[0].route ? "Update":"Create"} */}
                {EditId ? t("Update") : t("Create")}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </motion.div>
    </>
  );
};

export default UserRole;
