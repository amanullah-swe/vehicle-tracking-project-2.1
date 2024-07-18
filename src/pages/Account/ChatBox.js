import React, { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import double_tick from "../../assets/images/Chating_images/double_tick.svg";
import hr_three_dot from "../../assets/images/Chating_images/hr_three_dot.svg";
import send_btn from "../../assets/images/Chating_images/send_btn.svg";
import profile_img from "../../assets/images/Chating_images/profile_img.svg";
import ic_online from "../../assets/images/Chating_images/ic_online.svg";
import { useTranslation } from "react-i18next";

const ChatBox = () => {
  const { slideOpen, setSlideOpen } = useContext(AppContext);
  const toast = useRef(null);
  const { t, i18n } = useTranslation();

  const items = [
    {
      label: "Add",
      icon: "pi pi-pencil",
      command: () => {
        toast.current.show({
          severity: "info",
          summary: "Add",
          detail: "Data Added",
        });
      },
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Update",
          detail: "Data Updated",
        });
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        toast.current.show({
          severity: "error",
          summary: "Delete",
          detail: "Data Deleted",
        });
      },
    },
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => {
        window.location.hash = "/fileupload";
      },
    },
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        window.location.href = "https://facebook.github.io/react/";
      },
    },
  ];

  return (
    <>
      <div className="col-lg-9 col-md-12 col-sm-12 right-chat-section right-chat-custom-height-1">
        <Tab.Content>
          <Tab.Pane eventKey="1">
            <div className="heading-chat-section">
              <div className="left">
                <div className="left-profile-pic">
                  <Link to="">
                    <img src={profile_img} alt="" />
                  </Link>
                  <span className="indication-img">
                    <img src={ic_online} alt="" />
                  </span>
                </div>
                <div className="name">
                  <label htmlFor="">John Doe</label>
                </div>
              </div>
            </div>
            <div className="chatting-section">
              <div className="message-main">
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>

                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
              </div>
            </div>

            <div className="send_section_btn_inputs">
              <div className="speed-dial">
                <SpeedDial model={items} direction="up" />
              </div>
              <div className="text-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message here"
                />
              </div>
              <div className="send-btn">
                <Link to="#">
                  <img src={send_btn} alt="" />
                </Link>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="2">
            <div className="heading-chat-section">
              <div className="left">
                <div className="left-profile-pic">
                  <Link to="">
                    <img src={profile_img} alt="" />
                  </Link>
                  <span className="indication-img">
                    <img src={ic_online} alt="" />
                  </span>
                </div>
                <div className="name">
                  <label htmlFor="">John Doe</label>
                </div>
              </div>
            </div>
            <div className="chatting-section">
              <div className="message-main">
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>

                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
                <div className="send-msg">
                  <Link to="">
                    <img src={double_tick} alt="double_tick" className="ms-3" />
                  </Link>
                  <div className="send-msg-main">
                    <p className="msg-text">
                      Message goes here Message goes here Message goes here
                    </p>
                  </div>
                  <Dropdown className="ActionDropdown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="ActionToggle"
                    >
                      <img src={hr_three_dot} alt="" className="me-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ActionMenu">
                      <ul className="actionnmenulist">
                        <li>{t("Reply")}</li>
                        <li>{t("Edit")}</li>
                        <li>{t("Save this message")}</li>
                        <li>{t("Mark as unread")}</li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="time-date-sms-send">4 days ago</div>

                <div className="receive-msg">
                  <div className="msg-with-img">
                    <img src={profile_img} alt="" />
                  </div>
                  <div className="right-receive-msg">
                    <div className="receive-msg-main">
                      <p className="msg-text">
                        Message goes here Message goes here Message goes Lorem
                        ipsum dolor sit amet consectetur adipisicing elit. Autem
                        aspernatur libero suscipit magnam tempore architecto,
                        omnis nihil? Cum dolorem nulla amet ullam, iusto, nam
                        culpa impedit odit sit aspernatur illo! here
                      </p>
                    </div>

                    <div>
                      <Dropdown className="ActionDropdown">
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="ActionToggle"
                        >
                          <img src={hr_three_dot} alt="" className="mx-3" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="ActionMenu">
                          <ul className="actionnmenulist">
                            <li>Reply</li>
                            <li>Edit</li>
                            <li>Save this message</li>
                            <li>Mark as unread</li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="time-date-sms-receive">4 days ago</div>
              </div>
            </div>

            <div className="send_section_btn_inputs">
              <div className="speed-dial">
                <SpeedDial model={items} direction="up" />
              </div>
              <div className="text-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message here"
                />
              </div>
              <div className="send-btn">
                <Link to="#">
                  <img src={send_btn} alt="" />
                </Link>
              </div>
            </div>
          </Tab.Pane>
          
        </Tab.Content>
      </div>
    </>
  );
};

export default ChatBox;
