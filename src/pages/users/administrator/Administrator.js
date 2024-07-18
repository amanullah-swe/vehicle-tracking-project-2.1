import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import share from "../../../assets/images/XMLID_1022_.svg";
import Delete from "../../../assets/images/delete.svg";
import View from "../../../assets/images/Group.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImportUser from "../../../assets/images/imagesuser.png";

import { simpleGetCall, simplePostCall } from "../../../api/ApiServices";
import ApiConfig from "../../../api/ApiConfig";
// eslint-disable-next-line no-unused-vars
import Pagenation from "../../../sharedComponent/Pagenation";
import { Modal, OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import NoDataComp from "../../../sharedComponent/NoDataComp";
import Loader from "../../../sharedComponent/Loader";
import { useTranslation } from "react-i18next";
import pdfFormat from "../../../sharedComponent/pdfFormat";
import FileSaver from "file-saver";
const aninations = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const Administrator = () => {
  const { sidebar } = useContext(AppContext);
  const [AdministratorList, setAdministratorList] = useState([]);
  const Formatstatus = ["Name", "Email", "Mobile Number"];
  const hdtitle = "Administrator";
  const [loading, setLoading] = useState(false);
const [deleteModal, setDeleteModal] = useState(false);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    geAdministratorList();
  }, []);

  function geAdministratorList() {
    setLoading(true);
    simpleGetCall(ApiConfig.USER_ADMINISTRATOR)
      .then((data) => {
        setLoading(false);
        if (data.result) {
          setAdministratorList(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const renderTooltipForView = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("View")}
    </Tooltip>
  );
  const renderTooltipForDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {t("Delete")}
    </Tooltip>
  );
  const downLoadExcelSheet = () => {
 let newRequestBody = JSON.stringify({  format: "excel", });
    simplePostCall(ApiConfig.USER_ADMINISTRATOR_EXPORT, newRequestBody)
      .then((res) => {
    FileSaver.saveAs(
          ApiConfig.BASE_URL + res.filePath
        ); })
      .catch((err) => {

        console.log(err);
      });
  };

const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
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
            <div id="cx-wrapper" className="Administrator">
              <div className="transHeadingIcons form_input_main">
                {/* <button className="addminBtn"> + Add Administrator</button> */}
                <div className="iconBg">
                  {/* <img
                    onClick={() => pdfFormat(AdministratorList)}
                    src={share}
                    alt=""
                  /> */}

                  <div className="customer-option">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={share} alt="" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link
                            onClick={() => pdfFormat(AdministratorList)}
                            className="d-block"
                          >
                          {t("PDF")}  
                          </Link>
                        </Dropdown.Item>


                        <Dropdown.Item>
                          <Link
                            onClick={(e) => {
                              downLoadExcelSheet();
                            }}
                            className="d-block"
                          >
                          {t("Excel")}  
                          </Link>
                        </Dropdown.Item>







                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
    
              <div className="main-master-wrapper">
                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <th>{t("Sr.no")}</th>
                      <th>{t("Image")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Email")}</th>
                      <th>{t("Mobile Number")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  {loading ? (
        <Loader />
      ) : (
        <>
                  <tbody className="tableBody">
                    {AdministratorList && AdministratorList.length > 0 ? (
                      AdministratorList?.map((itemlist, index) => {
                        return (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td
                                className=""
                                style={{ padding: "0px 20px !important" }}
                              >
                              
                                  <img
                                    src={
                                      itemlist.user_profile_pic? itemlist.user_profile_pic:ImportUser
                                    }
                                    onError={(ev) => {
                                      handleErrorImage(ev);
                                    }}
                                    height="37px"
                                    width="37px"
                                  />
                              
                              </td>
                              <td>{itemlist.user_name}</td>
                              <td>{itemlist.user_email}</td>
                              <td>{itemlist.user_mobile}</td>
                              <td>
                                <div className="innerFlex d-flex">
                                  <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForView}
                                  >
                                    <Link to={"/view/" + itemlist.user_id}>
                                      <div className="inconsIn me-3">
                                        <img src={View} alt="" />
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipForDelete}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => setDeleteModal(true)}
                                    >
                                      <div className="inconsIn">
                                        {/* <img src={Delete} alt="" /> */}
                                      </div>
                                    </Link>
                                  </OverlayTrigger>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <div className="">
                      {/* <NoDataComp /> */}
                      </div>
                    )}
                  </tbody>
                  </>
      )}
                </table>
                {AdministratorList.length===0&&!loading&& <NoDataComp />}
              </div>
   
            </div>
          </motion.div>
      
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="common-model"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete Administrator")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to Delete this Administrator")} ?
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <div class="btn-wrapper">
            <button className="cx-btn-1" onClick={() => setDeleteModal(false)}>
              {t("Cancel")}
            </button>
            <button className="cx-btn-2" onClick={() => setDeleteModal(false)}>
              {t("Yes")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Administrator;
