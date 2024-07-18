import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { SpeedDial } from "primereact/speeddial";
import Nav from "react-bootstrap/Nav";
import profile_img from "../../assets/images/Chating_images/profile_img.svg";
import ic_online from "../../assets/images/Chating_images/ic_online.svg";
import ic_minus_red from "../../assets/images/Chating_images/ic_minus_red.svg";
import ic_come_back from "../../assets/images/Chating_images/ic_come_back.svg";
import ic_on_call from "../../assets/images/Chating_images/ic_on_call.svg";
import ic_offline from "../../assets/images/Chating_images/ic_offline.svg";
import more_vertical from "../../assets/images/Chating_images/more_vertical.svg";
import { Toast } from "primereact/toast";
import { Modal, Tab, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import option from "../../assets/images/option-three-dot.svg";
import ChatBox from "./ChatBox";
import hr_three_dot from "../../assets/images/Chating_images/hr_three_dot.svg";
import { Button, Dropdown } from "react-bootstrap";
import ImportUser from "../../assets/images/imagesuser.png";
import double_tick from "../../assets/images/Chating_images/double_tick.svg";
// import { SpeedDial } from "primereact/speeddial";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import send_btn from "../../assets/images/Chating_images/send_btn.svg";
import check_symbool from "../../assets/images/Chating_images/check-symbol.png";
import happiness from "../../assets/images/Chating_images/happiness.png";
import img1 from "../../assets/images/Chating_images/Chat_img.jpg";
import img2 from "../../assets/images/Chating_images/Chat_img2.jpg";
import img3 from "../../assets/images/Chating_images/Chat_img3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MesnsionForTeam from "../Account/mesnsion/MensionForTeam";
import MensionUsersForTeam from "../Account/mesnsion/MensionUsersForTeam";
import './SelectBackgroundOption.scss'
// import { faPlus, faUserPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import {
  faPlus,
  faUserPlus,
  faUpload,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { Select, Space } from "antd";

import {
  getWithAuthCall,
  postMultipartWithAuthCallWithErrorResponse,
  simpleDeleteCall,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import moment from "moment";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import ReplyMsg from "./ReplyMsg";
import ReplyShowMsg from "./ReplyShowMsg";
import { useSelector } from "react-redux";
import Loader from "../../sharedComponent/Loader";
import { DateDDMMYYYY } from "../../sharedComponent/common";
import CopyToClipboard from "react-copy-to-clipboard";
import Multiselect from "multiselect-react-dropdown";

import "./MyMessage.scss";
import { useMediaQuery } from "react-responsive";
const { Option } = Select;
const staticGroups = [
  { label: "Person 1", value: 1 },
  { label: "Person 2", value: 2 },
  { label: "Person 3", value: 3 },
];

const TeamMessages = () => {
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  const [userName, setUserName] = useState([]);
  console.log("userName", userName);
  const toast = useRef(null);
  const msgRef = useRef([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [track_index, set_track_index] = useState(0);
  const [clickedItemIndex, setClickedItemIndex] = useState(0);
  const [menstionedUsers, setMenstionedUsers] = useState([]);
  const {
    sidebar,
    setSidebar,
    socket,
    customerData,
    recentChatdata,
    setRecentChatdata,
    membersArray,
  } = useContext(AppContext);
  const [UserIndex, setIndex] = useState("");
  const [RecentUserList, setRecentUserList] = useState([]);
console.log('membersArray--->>>',membersArray)
  const [loader, setloader] = useState(true);
  const [userTyping, setUserTyping] = useState({
    status: false,
    userName: null,
  });
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(0);
  const [ChatUser, setChatUser] = useState("");

  console.log('tttttttttt--->',ChatUser);

  const [ChatUserGroup, setChatUserGroup] = useState("");
  console.log('pppppppppp--->',ChatUserGroup);

  const [message, setMessage] = useState("");
  const [newmessage, setnewmessage] = useState([]);

  const [hasmore, sethasmore] = useState(true);
  const loadMoreRef = useRef();
  const lastMessageRef = useRef(null);
  const [FilterSearch, setFilterSearch] = useState("");
  const [editMsg, setEditMsg] = useState({});
  const [replyTo, setReplyTo] = useState({});
  const fileUpload = useRef(null);
  const [ChatId, setChatId] = useState("");
  const [ChatType, setChatType] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [addmodalShow, setaddmodalShow] = useState(false);
  const [addmodalShowDelete, setaddmodalShowDelete] = useState(false);
  const [aboutadd, setAboutadd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [AboutList, setAboutList] = useState([]);

  const [gruopList, setgruopList] = useState([]);
  const [emogi, setEmogi] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [User1, setUser1] = useState(true);
  const handleUser1 = () => setUser1(!User1);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const currentRoute = useLocation().pathname;
  const [teams, setTeams] = useState([]);

  const [activeChat, setActiveChat] = useState({});

  const [currentSChannel, setCurrentSChannel] = useState(null);
  console.log("currentSChannel", currentSChannel);

  const [showsubChannelModal, setShowsubChannelModal] = useState(false);
  const [subChannelDetails, setSubChannelDetails] = useState({
    name: "",
    description: "",
    members: [],
  });

  const toggleExpanded = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
    set_track_index(index);
  };




  useEffect(() => {
    socket &&
      socket.on("get-teams", (value) => {
        let data = value;

        setRecentUserList(data);
      });

    return () => {
      socket && socket.off("get-teams");
    };
  }, [ChatId, socket]);





  useEffect(() => {
    teamChinaljoin();
  }, []);

  useEffect(() => {
    socket &&
      socket.on("message send", (value) => {
        // if (
        //   Number(value.message_parent_id) == ChatId &&
        //   (value.message_from_id == customerData.id ||
        //     value.message_to_id == customerData.id)
        // ) {
        //   setnewmessage((prev) => [...prev, value]);
        // }
        if (Number(value.message_thread_id) == ChatId) {
          setnewmessage((prev) => [...prev, value]);
        }
      });
    return () => {
      socket && socket.off("message send");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("get-members", (value) => {
        let data = value;

        setAboutList(data);
      });
  

      socket && socket.on("get-teams", (value) => {
        let data = value;

        setRecentUserList(data);
        setloader(false);
      });
    return () => {
      socket && socket.off("get-members");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("delete-subchannel", (value) => {
        socket.emit("get-teams", {
          user_id: Number(customerData.id),
          user_customer_id: customerData.customer_id,
        });
      });
  

      
    return () => {
      socket && socket.off("get-members");
    };
  }, [ChatId, socket]);



  useEffect(() => {
    console.log("add-subchannel");
    socket &&
      socket.on("add-subchannel", (value) => {
 
        socket.emit("get-teams", {
          user_id: Number(customerData.id),
          user_customer_id: customerData.customer_id,
        });
   
        
      
      });
     

    return () => {
      socket && socket.off("get-teams");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("get-user-list", (value) => {
        let data = value;

        setgruopList(data);
      });
    return () => {
      socket && socket.off("get-user-list");
    };
  }, [ChatId, socket]);


  useEffect(() => {
    socket &&
      socket.on("remove-member", (value) => {
        socket.emit("get-members", {
          user_customer_id: customerData.customer_id,
          chat_id: activeChat.channel_name,
          user_id:customerData.id

        });
  

      });
    return () => {
      socket && socket.off("remove-member");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("message edited", (value) => {
        let data = value;

        let newData = recentChatdata.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_content: data.message_content }
            : { ...forun, message_content: forun.message_content };
        });
        let newDataMsg = newmessage.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_content: data.message_content }
            : { ...forun, message_content: forun.message_content };
        });
        setRecentChatdata(newData);
        setnewmessage(newDataMsg);
      });
    return () => {
      socket && socket.off("message edited");
    };
  }, [socket, recentChatdata, newmessage]);

  /// Mark Read Listan
  useEffect(() => {
    socket &&
      socket.on("message unread", (value) => {
        let data = value;

        let newData = recentChatdata.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_status: data.message_status }
            : { ...forun, message_status: forun.message_status };
        });
        let newDataMsg = newmessage.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_status: data.message_status }
            : { ...forun, message_status: forun.message_status };
        });
        setRecentChatdata(newData);
        setnewmessage(newDataMsg);
      });
    return () => {
      socket && socket.off("message unread");
    };
  }, [socket, recentChatdata, newmessage]);

  /// msg Read Status
  useEffect(() => {
    socket &&
      socket.on("message read", (value) => {
        let data = value;

        let newData = recentChatdata.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_status: data.message_status }
            : { ...forun, message_status: forun.message_status };
        });
        let newDataMsg = newmessage.map((forun) => {
          return forun.message_id === data.message_id
            ? { ...forun, message_status: data.message_status }
            : { ...forun, message_status: forun.message_status };
        });
        setRecentChatdata(newData);
        setnewmessage(newDataMsg);
      });
    return () => {
      socket && socket.off("message read");
    };
  }, [recentChatdata, socket, newmessage]);

  // User Search

  useEffect(() => {
    setRecentChatdata([]);

    handleHistery(ChatId);
  }, [page]);

  // Chat Histery  ///
  const handleHistery = async (ChatID) => {
    sethasmore(true);

    setnewmessage([]);
    setEditMsg({});
    setReplyTo({});

    // setIndex(index + 1)
    let newRequestBody = JSON.stringify({
      chat_id: ChatID,
      page: page,
    });
    simplePostCall(ApiConfig.RECENT_CHAT_HISTERY, newRequestBody)
      .then((data) => {
      //  setloader(false);
        if (data.result === true) {
         
          let lastmsg = data.data[0].message_id;

          socket.emit("message read", {
            senderId: Number(customerData.id),
            user_customer_id: customerData.customer_id,
            last_message_id: lastmsg,
            chat_id: ChatID,
          });
          setRecentChatdata([...data.data.reverse()]);
          if (data.total_pages - data.current_page === 0) {
            sethasmore(false);
          }
        } else {
          setRecentChatdata([]);
          sethasmore(false);
        }
      })
      .catch((error) => {
      
        console.log("api response", error);
      });
  };

  // Chat Histery Delete ///
  const handleHisteryDelelte = async (data, UserID) => {
    let newRequestBody = JSON.stringify({
      message_id: data,
    });
    simpleDeleteCall(ApiConfig.RECENT_CHAT_DELETE, newRequestBody)
      .then((data) => {
        if (data.success === true) {
          notifySuccess(data.message);
          handleHistery(UserID);
        } else {
          notifyError(data.message);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const sendMessage = async (replyTo) => {
    setMessage("");
    if (message.includes('@')) {
      let regex = /@\[.+?\]\(.+?\)/gm
      let displayRegex = /@\[.+?\]/g
      let idRegex = /\(.+?\)/g
      let matches = message.match(regex)
      let arr = []
      let str = ''
      matches &&
        matches.forEach(m => {
          let display = m
            .match(displayRegex)[0]
            .replace('[', '')
            .replace(']', '')
          arr.push(display)
        })
      let newComment = message.split(regex)

      for (let i = 0; i < newComment.length; i++) {
        const element = newComment[i]
        str += element + `${arr[i]}`.replace('undefined', '')
      }
     var messageData = str
    } else {
     var messageData = message

    }
  

    console.log("messageData",messageData);
    const mentionedUserIdArr = menstionedUsers && menstionedUsers.map(user => user.id)


    socket.emit("new message", {
      senderId: Number(customerData.id),
      reply_conversation_id: replyTo.message_id ? replyTo.message_id : "",
      user_customer_id: customerData.customer_id,
      // content: message,
      content: messageData,
      
      receiverId: ChatUser.user_id,
      file: [],
      chat_id: ChatId,
    });

    setEditMsg({});
    setReplyTo({});
    // handleHistery()
  };


const Messagejoin = async (groupid) => {
    setMessage("");
    socket.emit("join-room", {
      chat_id: groupid,
    });
  };

  const teamChinaljoin = async () => {
    socket.emit("get-teams", {
      user_id: Number(customerData.id),
      user_customer_id: customerData.customer_id,
    });
  };
  // useEffect(() => {
  //   if(o){
  //     AddMamberjoin()
  //   }
  // }, []);

  const AddChannalSub = async () => {
    socket.emit("add-subchannel", {
      createdById: customerData.id,
      user_customer_id: customerData.customer_id,
      subChannelName: subChannelDetails.name,
      channelId: currentSChannel,
      memberIds: userName,
    });
    Messagegetmembers(ChatId);


  };

  const DeleteChannel = async () => {
    socket.emit("delete-subchannel", {
      user_id: customerData.id,
      user_customer_id: customerData.customer_id,
      chat_id: ChatId,
    });


  };

  const AddMamberjoin = async () => {
    socket.emit("add-members", {
      members: userName,
      user_customer_id: customerData.customer_id,
      chat_id: ChatId,
    });
    Messagegetmembers(ChatId);
  };
  const Messagegetmembers = async (groupid) => {
    socket.emit("get-members", {
      user_customer_id: customerData.customer_id,
      chat_id: groupid,
      user_id:customerData.id
    });

    

    // handleHistery()
  };
  const AddSubmembers = async (role) => {
    socket.emit("get-user-list", {
      user_customer_id: customerData.customer_id,
      user_id: customerData.id,
      role: role,
    });

    // handleHistery()
  };

  const markReadMSg = async (data) => {
    socket.emit("message unread", {
      senderId: Number(customerData.id),
      conversation_id: data,
      user_customer_id: customerData.customer_id,
    });
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [recentChatdata, newmessage]);

  const handleFileUpload = (files) => {
    // setfilesfromserver([files])
    files = Object.values(files);
    const data = new FormData();
    files.map((file) => {
      data.append("image", file);
    });
    data.append("receiverId", ChatUser.user_id);
    data.append("chat_id", ChatId);

    postMultipartWithAuthCallWithErrorResponse(
      ApiConfig.UPLOAD_CHAT_FILES,
      data
    )
      .then((data) => {
        if (data.json.success) {
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };
  const handleSave = () => {
    // Handle saving the selected option
    console.log("Selected Option:", selectedOption);
    // handleClose(); // Close the modal after saving

    AddMamberjoin();
    setUserName([]);
    setaddmodalShow(false);
  };

  const handleDeleteChannel = () => {
    // Handle saving the selected option

    // handleClose(); // Close the modal after saving

    DeleteChannel();

    setaddmodalShowDelete(false);
  };

  const handleSubChainal = () => {
    // Handle saving the selected option
    console.log("Selected Option:", selectedOption);
    // handleClose(); // Close the modal after saving

    AddChannalSub();
    setUserName([]);
    setShowsubChannelModal(false);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const showToast = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info Message",
      detail: message,
    });
  };
  const toggleMenu = () => {
    // setMenuOpen(!menuOpen);
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setEmogi(false);
  };


  const handleSmileyClick = () => {
    setEmogi(!emogi); // Assuming setEmogi is a function to handle emoji state
    // closeMenu(); // Close the menu when smiley icon is clicked
  };

  const Addgetmembers = async (groupid=null,channelName=null) => {

    socket.emit("get-user-list", {
      user_customer_id: customerData.customer_id,
      chat_id: groupid,
      user_id:customerData.id,
      role:channelName
    });


  };







  return (
    <>
      <Toast ref={toast} className="toast" />
      <main
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
      >
{loader ? <Loader/> : (

        <div id="cx-wrapper" className="mymessage-main-wrapper">
          {userRole === "customer" ||
          (accessRights && accessRights?.rights_manage_chat_support == 1) ? (
            <div className="compose-message-wrapper">
              <Link
                to="/TeamComposeMessage"
                className="cx-btn-3 form_input_main"
                variant="primary"
              >
                + {t("Craete Teams")}
              </Link>
            </div>
          ) : null}

          {loader ? (
            <Loader />
          ) : (
            <>
              {" "}
              <div className="main-chat">
                <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                  <div className="row d-flex flex-wrap justify-content-around">
                    <div className="col-lg-3 col-md-3 left-chat-section-for-team">
                      <div className="left-heading-chat">
                        {/* <div className="left-head">
                          <Form.Control
                            required
                            type="text"
                            placeholder={t("Search")}
                            value={FilterSearch}
                            className="innerCust"
                            onChange={(e) => {
                              setFilterSearch(e.target.value);
                            }}
                          />
                        </div> */}
                      </div>
                      <div className="pinned-section">
                        <div className="left">
                          {/* <label htmlFor="">{t("Messages")}</label> */}
                          <label htmlFor="">{t("Your Teams")}</label>
                        </div>
                      </div>
                      <div className="chat-user-lists">
                        <Nav variant="pills" className="flex-column">
                          {console.log('RecentUserList-->', RecentUserList)}
                          {RecentUserList && RecentUserList.length > 0 ? (
                            RecentUserList.map((item, index) => (
                              <Nav.Item key={index}>
                                <Nav.Link
                                  eventKey={index + 1}
                                  onClick={() => {
                                    setShowResults(true);
                                    setnewmessage([]);
                                    setPage(1);
                                    setChatType(item.chat_type);

                                    setIndex(index + 1);
                                    setTeams((prevTeams) =>
                                      prevTeams.map((proj, innerIndex) => ({
                                        ...proj,
                                        submenu:
                                          innerIndex === index
                                            ? !proj.submenu
                                            : innerIndex === index &&
                                              !proj.submenu,
                                      }))
                                    );
                                  }}
                                >
                                  <div className="team-user-for-team">
                                    <div className="menus-items with-subMenu">
                                      <div className="icon-menu-name-arrow">
                                        <div className="menu-left">
                                          <div className="team-image">
                                            <img src={ic_online} alt="" />
                                          </div>
                                          <div
                                            className={
                                              currentRoute === "/" ||
                                              currentRoute === "/"
                                                ? "menu-name activeColorBlue"
                                                : "menu-name"
                                            }
                                          >
                                            <span
                                              onClick={() =>
                                                toggleExpanded(index)
                                              }
                                            >
                                              {item.channel_name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Dropdown className="ActionDropdown float-right right-icon-chat">
                                      <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                        className="ActionToggle"
                                      >
                                        {/* <img src={more_vertical} alt="" /> */}
                                        <img src={option} alt="" />
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu className="ActionMenu">
                                        <ul className="actionnmenulist">
                                          <li
                                            onClick={() => {
                                              setShowsubChannelModal(true);
                                              AddSubmembers(item.channel_name);
                                            }}
                                          >
                                            Sub Teams
                                          </li>
                                        </ul>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>

                                  {expandedItems[index] && User1 && (
                                    <div
                                      className="sub-menus-1-for-team"
                                      style={{
                                        borderLeft: "1px solid #8F4300",
                                      }}
                                    >
                                      {item.sub_channels.map(
                                        (channel, channel_index) => (
                                          <Link
                                            to=""
                                            className="sub-menue-items"
                                            key={channel_index}
                                            onClick={() => {
                                              // isMobile ? setSidebar(false) : setSidebar(true);
                                              setActiveChat({
                                                pin: false,
                                                ...channel,
                                                channel_name:
                                                  channel.message_thread_title,
                                                channel_id:
                                                  channel.message_thread_id,
                                              });
                                              setCurrentSChannel(
                                                item.channel_id
                                              );

                                              handleHistery(
                                                channel.message_thread_id
                                              );
                                              setChatId(
                                                channel.message_thread_id
                                              );

                                              Messagejoin(
                                                channel.message_thread_id
                                              );
                                              Messagegetmembers(
                                                channel.message_thread_id
                                              );
                                              Addgetmembers( channel.message_thread_id,channel.message_thread_title !='General' || item.channel_is_default == true ?   item.channel_name : null);
                                              // AddSubmembers(item.channel_name);
                                              setChatUser(channel);
                                              setChatUserGroup(
                                                item.channel_name +
                                                  "  " +
                                                  ">" +
                                                  "  " +
                                                  channel.message_thread_title
                                              );
                                            }}
                                          >
                                           
                                            <div
                                              className={
                                                currentRoute ===
                                                  "/TeamMessages" && "menu-name"
                                              }
                                            >
                                              <span
                                                style={{
                                                  color:
                                                    clickedItemIndex ==
                                                    channel_index /* && clickedItemIndex == track_index */
                                                      ? "#8F4300"
                                                      : "inherit",
                                                }}
                                                onClick={() => {
                                                  setClickedItemIndex(
                                                    channel_index
                                                  );
                                              
                                                }}
                                              >
                                                {channel.message_thread_title}
                                              </span>
                                              {/* {channel.message_thread_subject} */}
                                            </div>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  )}
                                </Nav.Link>
                              </Nav.Item>
                            ))
                          ) : (
                            <p
                              style={{
                                fontSize: "20px",
                                margin: "auto",
                                marginTop: "40px",
                              }}
                              className=" text-center justify-content-center"
                            >
                              {t("No data")}
                            </p>
                          )}
                        </Nav>
                      </div>
                    </div>

                    {/* <ChatBox /> Body */}

                    <div className="col-lg-9 col-md-12 col-sm-12 right-chat-section right-chat-custom-height-1">
                      <Tab.Content>
                        <Tab.Pane eventKey={UserIndex}>
                          <div className="heading-chat-section">
                            <div className="left">
                              <div className="left-profile-pic">
                                <Link to="">
                                  {ChatUser?.user_profile_pic === "" ||
                                  ChatUser?.user_profile_pic === null ? (
                                    <img
                                      src={ImportUser}
                                      alt=""
                                      className=""
                                      height="50px"
                                      width="53px"
                                    />
                                  ) : (
                                    <img
                                      src={
                                        ApiConfig.BASE_URL_FOR_IMAGES +
                                        ChatUser?.user_profile_pic
                                      }
                                      onError={(ev) => {
                                        handleErrorImage(ev);
                                      }}
                                      alt=""
                                      className=""
                                      height="50px"
                                      width="53px"
                                    />
                                  )}
                                </Link>
                                <span className="indication-img">
                                  <img src={ic_online} alt="" />
                                </span>
                              </div>
                              <div
                                className="name"
                                onClick={() => setModalShow(true)}
                              >
                                <label htmlFor="">{ChatUserGroup}</label>
                              </div>
                            </div>
                            <div className="option customer-option">
                              <Dropdown>
                                <Dropdown.Toggle>
                                  <img src={option} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {ChatType == "one-on-one" ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Dropdown.Item>
                                        <Link
                                          onClick={() => setaddmodalShow(true)}
                                          className="d-block"
                                        >
                                          {t("Add People")}
                                        </Link>
                                      </Dropdown.Item>
                                    </>
                                  )}

                                  {accessRights &&
                                  accessRights?.rights_manage_trips ? (
                                    <>
                                      <Dropdown.Item>
                                        <Link
                                          to="#"
                                          className="d-block"
                                          onClick={() => setAboutadd(true)}
                                        >
                                          {t("About")}
                                        </Link>
                                      </Dropdown.Item>

                                      {ChatType == "one-on-one" ? (
                                        <></>
                                      ) : (
                                        <>
                                          <Dropdown.Item
                                            onClick={() => {
                                              setaddmodalShowDelete(true);
                                            }}
                                          >
                                            <Link to="#" className="d-block">
                                              {t("Delete")}
                                            </Link>
                                          </Dropdown.Item>
                                        </>
                                      )}
                                    </>
                                  ) : null}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="chatting-section ">
                            <div ref={loadMoreRef}></div>

                            {hasmore ? (
                              <div
                                className="load-btn-chat"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  onClick={() => loadMore()}
                                  id="load-btn"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    // backgroundColor: '#91efdc',
                                    padding: "7px 30px",
                                    border: "none",
                                    color: "black",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <Link to="">{t("Load More")} </Link>
                                </button>
                              </div>
                            ) : (
                              <div
                                className="No-more-chats pb-2"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <p style={{ color: "#8F4300" }}>
                                  {t("No more chats")}
                                </p>
                              </div>
                            )}
                            <div
                              className="message-main "
                              onClick={() => setEmogi(false)}
                            >
                              {recentChatdata?.map((chatData, i) => {

let mentionedTo =
chatData.mentioned_to &&
Array.isArray(chatData.mentioned_to)?
chatData.mentioned_to.map((i)=>parseInt(i))
  : [];

// Check if mentionedTo contains valid numbers
let Mentioned_To = mentionedTo.filter(
(id) => !isNaN(id)
);

let mensioned = membersArray.filter(
(member) =>
  Mentioned_To &&
  Mentioned_To.includes(member.User_id)
);
                                return chatData.message_from_id ==
                                  customerData.id ? (
                                  <>
                                    {chatData?.message_content == null ||
                                    chatData?.message_content == "" ? null : (
                                      <>
                                        <div
                                          className="send-msg"
                                          key={"recentChatdata" + i}
                                        >
                                          {chatData?.message_status ===
                                          "read" ? (
                                            <Link to="">
                                              <img
                                                src={double_tick}
                                                alt="double_tick"
                                                className="ms-3"
                                              />
                                            </Link>
                                          ) : (
                                            <Link to="">
                                              <img
                                                src={check_symbool}
                                                alt="check_symbool"
                                                className="ms-3"
                                                height={"25px"}
                                                width={"25px"}
                                              />
                                            </Link>
                                          )}

                                          {chatData?.message_id ==
                                          editMsg.message_id ? (
                                            <></>
                                          ) : (
                                            <>
                                              <div className="send-msg-main">
                                                {chatData?.reply_conversation_details !==
                                                null ? (
                                                  <>
                                                    <p className="msg-text_new_class">
                                                      {
                                                        chatData
                                                          .reply_conversation_details
                                                          .reply_message_content
                                                      }
                                                    </p>
                                                    <p className="msg-text">
                                                      {chatData.message_content}
                                                    </p>
                                                  </>
                                                ) : (
                                                  <p className="msg-text">
                                                    {chatData.message_content}
                                                  </p>
                                                )}
                                              </div>
                                            </>
                                          )}
                                          {/* sadik */}

                                          {chatData?.message_id ==
                                          editMsg.message_id ? (
                                            <div className="ActionDropdown">
                                              <p className="msg-text">
                                                <input
                                                  className="form-control col-3"
                                                  type={"text"}
                                                  value={
                                                    editMsg.message_content
                                                  }
                                                  onChange={(e) =>
                                                    setEditMsg({
                                                      ...editMsg,
                                                      message_content:
                                                        e.target.value,
                                                    })
                                                  }
                                                  onKeyUp={(e) => {
                                                    if (
                                                      e.key === "Enter" &&
                                                      e.target.value.length
                                                    ) {
                                                      if (socket)
                                                        socket.emit(
                                                          "edit message",
                                                          {
                                                            user_id:
                                                              customerData.id,
                                                            user_customer_id:
                                                              customerData.customer_id,
                                                            conversation_id:
                                                              editMsg.message_id,
                                                            conversation_message:
                                                              editMsg.message_content,
                                                            files: [],
                                                          }
                                                        );
                                                      setEditMsg({
                                                        message_id: null,
                                                        Sender_Id: null,
                                                      });
                                                    }
                                                  }}
                                                />
                                              </p>
                                            </div>
                                          ) : (
                                            <>
                                              {/* <p>gfhtdhgd</p> */}
                                              {/* <Link>
                                        <img
                                          src={
                                            msg.IsAllRead
                                              ? double_tick
                                              : gray_tick
                                          }
                                          alt="double_tick"
                                          className="ms-3"
                                        />
                                      </Link> */}
                                            </>
                                          )}

                                          {(userRole === "customer" ||
                                            (accessRights &&
                                              accessRights?.rights_manage_chat_support ==
                                                1)) && (
                                            <Dropdown className="ActionDropdown">
                                              <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                className="ActionToggle"
                                              >
                                                <img
                                                  src={hr_three_dot}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu className="ActionMenu">
                                                <ul className="actionnmenulist">
                                                  <li
                                                    onClick={() => {
                                                      setEditMsg(chatData);
                                                    }}
                                                  >
                                                    Edit
                                                  </li>
                                                  <li
                                                    onClick={() => {
                                                      handleHisteryDelelte(
                                                        chatData.message_id,
                                                        chatData.message_parent_id
                                                      );
                                                    }}
                                                  >
                                                    {t("Delete")}
                                                  </li>
                                                </ul>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          )}
                                        </div>
                                        <div className="time-date-sms-send">
                                          {moment(
                                            chatData.message_date_time
                                          ).fromNow()}
                                        </div>
                                      </>
                                    )}

                                    {/* USama */}

                                    <>
                                      {chatData?.files &&
                                        chatData?.files &&
                                        chatData?.files.map((file, index) => {
                                          return (
                                            <div className="send-msg">
                                              <Link to="">
                                                <img
                                                  src={double_tick}
                                                  alt="double_tick"
                                                  className="ms-3"
                                                />
                                              </Link>
                                              <div className="send-msg-main">
                                                <img
                                                  src={file.file_path}
                                                  key={"file" + file.file_id}
                                                  alt=""
                                                />
                                              </div>
                                              {(userRole === "customer" ||
                                                (accessRights &&
                                                  accessRights?.rights_manage_chat_support ==
                                                    1)) && (
                                                <Dropdown className="ActionDropdown">
                                                  <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                    className="ActionToggle"
                                                  >
                                                    <img
                                                      src={hr_three_dot}
                                                      alt=""
                                                      className="me-3"
                                                    />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu className="ActionMenu">
                                                    <ul className="actionnmenulist">
                                                      <li
                                                        onClick={() => {
                                                          handleHisteryDelelte(
                                                            chatData.message_id,
                                                            chatData.message_parent_id
                                                          );
                                                        }}
                                                      >
                                                        {t("Delete")}
                                                      </li>
                                                    </ul>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              )}
                                            </div>
                                          );
                                        })}
                                    </>

                                    {/* {/* End */}
                                  </>
                                ) : (
                                  <>
                                    {chatData.message_content == null ||
                                    chatData.message_content == "" ? null : (
                                      <> <div className=" ms-5" style={{color:'rgba(156, 73, 0, 0.5019607843)'}}>{chatData?.sender_name}</div>
                                        <div className="receive-msg">
                                          <div className="msg-with-img">
                                            {chatData.sender_pic === "" ||
                                            chatData.sender_pic === null ? (
                                              <img
                                                src={ImportUser}
                                                alt=""
                                                // className="custom-Margin"
                                               
                                              />
                                            ) : (
                                              <img
                                                src={
                                                  ApiConfig.BASE_URL_FOR_IMAGES +
                                                  chatData.sender_pic
                                                }
                                                onError={(ev) => {
                                                  handleErrorImage(ev);
                                                }}
                                                alt=""
                                                // className="custom-Margin"
                                               
                                              />
                                            )}
                                          </div>
                                          {chatData.message_content == null ||
                                          chatData.message_content ==
                                            "" ? null : (
                                            <div className="right-receive-msg">
                                              <div className="receive-msg-main">
                                                <p className="msg-text">
                                                  {chatData.message_content}
                                                </p>
                                              </div>

                                              {(userRole === "customer" ||
                                                (accessRights &&
                                                  accessRights?.rights_manage_chat_support ==
                                                    1)) && (
                                                <div>
                                                  <Dropdown className="ActionDropdown">
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      id="dropdown-basic"
                                                      className="ActionToggle"
                                                    >
                                                      <img
                                                        src={hr_three_dot}
                                                        alt=""
                                                        className="mx-3"
                                                      />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="ActionMenu">
                                                      <ul className="actionnmenulist">
                                                        <li
                                                          onClick={() =>
                                                            setReplyTo({
                                                              ...chatData,
                                                            })
                                                          }
                                                        >
                                                          {t("Reply")}
                                                        </li>
                                                        
                                                      </ul>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <div className="time-date-sms-receive">
                                          {moment(
                                            chatData.message_date_time
                                          ).fromNow()}
                                        </div>
                                      </>
                                    )}
                                    {chatData.files &&
                                      chatData.files &&
                                      chatData.files.map((filedata, index) => {
                                        return (
                                          <div className="receive-msg">
                                            <div className="right-receive-msg">
                                              <div className="receive-msg-main">
                                                {/* <img src={img2} alt="" /> */}
                                                <img
                                                  src={filedata.file_path}
                                                  key={
                                                    "file" + filedata.file_id
                                                  }
                                                  alt=""
                                                />
                                                onError=
                                                {(ev) => {
                                                  handleErrorImage(ev);
                                                }}
                                              </div>

                                              {(userRole === "customer" ||
                                                (accessRights &&
                                                  accessRights?.rights_manage_chat_support ==
                                                    1)) && (
                                                <div>
                                                  <Dropdown className="ActionDropdown">
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      id="dropdown-basic"
                                                      className="ActionToggle"
                                                    >
                                                      <img
                                                        src={hr_three_dot}
                                                        alt=""
                                                        className="mx-3"
                                                      />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="ActionMenu">
                                                      <ul className="actionnmenulist"></ul>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                );
                              })}
                              {userTyping.status === true && (
                                <div className="d-flex">
                                  {" "}
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      marginRight: "7px",
                                    }}
                                  >
                                    {userTyping.userName + " is Typing"}
                                  </p>{" "}
                                </div>
                              )}
  
                              { newmessage?.map((newMsg, i) => {
                              { console.log('newMsg.message_content--> hii'/* ,newMsg.message_content */ )}
                                 let mentionedTo =
                                 newMsg.mentioned_to &&
                               Array.isArray(newMsg.mentioned_to)?
                               newMsg.mentioned_to.map((i)=>parseInt(i))
                                   : [];

                               // Check if mentionedTo contains valid numbers
                               let Mentioned_To = mentionedTo.filter(
                                 (id) => !isNaN(id)
                               );

                               let mensioned = membersArray.filter(
                                 (member) =>
                                   Mentioned_To &&
                                   Mentioned_To.includes(member.User_id)
                               );
                                return newMsg.message_from_id ==
                                  customerData.id ? (
                                  <>
                                    {newMsg?.message_content == null ||
                                    newMsg?.message_content == "" ? null : (
                                      <>
                                        <div className="send-msg" key={i}>
                                          {newMsg?.message_status === "read" ? (
                                            <Link to="">
                                              <img
                                                src={double_tick}
                                                alt="double_tick"
                                                className="ms-3"
                                              />
                                            </Link>
                                          ) : (
                                            <Link to="">
                                              <img
                                                src={check_symbool}
                                                alt="check_symbool"
                                                className="ms-3"
                                                height={"25px"}
                                                width={"25px"}
                                              />
                                            </Link>
                                          )}
                                          {/* {newMsg.message_id ==
                                          editMsg.message_id ? (
                                            <></>
                                          ) : (
                                            <>
                                              <div className="send-msg-main">
                                                {newMsg.reply_conversation_details !==
                                                null ? (
                                                  <>
                                                    <p className="msg-text_new_class">
                                                      {
                                                        newMsg
                                                          .reply_conversation_details
                                                          .reply_message_content
                                                      }
                                                    </p>
                                                    <p className="msg-text">
                                                      {newMsg.message_content}
                                                    </p>
                                                  </>
                                                ) : (
                                                  <p className="msg-text">
                                                    {newMsg.message_content}
                                                  </p>
                                                )}
                                              </div>
                                            </>
                                          )} */}
 
                                         {newMsg.message_id ==
                                            editMsg.message_id ? (
                                              <></>
                                            ) : (
                                              <>
                                                <div className="send-msg-main">
                                                  {newMsg.reply_conversation_details !==
                                                  null ? (
                                                    <>
                                                      <p className="msg-text_new_class">
                                                        {
                                                          newMsg
                                                            .reply_conversation_details
                                                            .reply_message_content
                                                        }
                                                      </p>
                                                      <p className="msg-text">
                                                        {newMsg?.message_content.includes(
                                                          "@"
                                                        ) ? (
                                                          <MensionUsersForTeam
                                                            text={
                                                              newMsg.message_content
                                                            }
                                                           
                                                            // users={mensioned}
                                                            users={AboutList}
                                                            index={i}
                                                          />
                                                         
                                                        ) : (
                                                          <>
                                                            {
                                                              newMsg.message_content
                                                            }
                                                          </>
                                                        )}
                                                      </p>
                                                    
                                                    </>
                                                  ) : (
                                                    <p className="msg-text">
                                                      {newMsg?.message_content.includes(
                                                        "@"
                                                      ) ? (<>
                                                     
                                                        <MensionUsersForTeam
                                                          text={
                                                            newMsg.message_content
                                                          }
                                                          // users={mensioned}
                                                          users={AboutList}
                                                          index={i}
                                                        /></>
                                                      ) : (
                                                        <>
                                                       
                                                          {
                                                            newMsg.message_content
                                                          }
                                                        </>
                                                      )}
                                                    </p>
                                                  )}
                                                </div>
                                              </>
                                            )}
                                             
                                          {newMsg.message_id ==
                                          editMsg.message_id ? (
                                            <div className="ActionDropdown">
                                              <p className="msg-text">
                                                <input
                                                  className="form-control col-3"
                                                  type={"text"}
                                                  value={
                                                    editMsg.message_content
                                                  }
                                                  onChange={(e) =>
                                                    setEditMsg({
                                                      ...editMsg,
                                                      message_content:
                                                        e.target.value,
                                                    })
                                                  }
                                                  onKeyUp={(e) => {
                                                    if (
                                                      e.key === "Enter" &&
                                                      e.target.value.length
                                                    ) {
                                                      if (socket)
                                                        socket.emit(
                                                          "edit message",
                                                          {
                                                            user_id:
                                                              customerData.id,
                                                            user_customer_id:
                                                              customerData.customer_id,
                                                            conversation_id:
                                                              editMsg.message_id,
                                                            conversation_message:
                                                              editMsg.message_content,
                                                            files: [],
                                                          }
                                                        );
                                                      setEditMsg({
                                                        message_id: null,
                                                        Sender_Id: null,
                                                      });
                                                    }
                                                  }}
                                                />
                                              </p>
                                            </div>
                                          ) : (
                                            <>
                                              {/* <p>gfhtdhgd</p> */}
                                              {/* <Link>
                                        <img
                                          src={
                                            msg.IsAllRead
                                              ? double_tick
                                              : gray_tick
                                          }
                                          alt="double_tick"
                                          className="ms-3"
                                        />
                                      </Link> */}
                                            </>
                                          )}
                                          {/* sadik */}
                                          {(userRole === "customer" ||
                                            (accessRights &&
                                              accessRights?.rights_manage_chat_support ==
                                                1)) && (
                                            <Dropdown className="ActionDropdown">
                                              <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                className="ActionToggle"
                                              >
                                                <img
                                                  src={hr_three_dot}
                                                  alt=""
                                                  className="me-3"
                                                />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu className="ActionMenu">
                                                <ul className="actionnmenulist">
                                                  <li
                                                    onClick={() => {
                                                      setEditMsg(newMsg);
                                                    }}
                                                  >
                                                    Edit
                                                  </li>
                                                  <li
                                                    onClick={() => {
                                                      handleHisteryDelelte(
                                                        newMsg.message_id,
                                                        newMsg.message_parent_id
                                                      );
                                                    }}
                                                  >
                                                    {t("Delete")}
                                                  </li>
                                                </ul>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          )}
                                        </div>
                                        <div className="time-date-sms-send">
                                          {moment(
                                            newMsg.message_date_time
                                          ).fromNow()}
                                        </div>
                                      </>
                                    )}

                                    {/* USama */}

                                    <>
                                      {newMsg.files &&
                                        newMsg.files &&
                                        newMsg.files.map((fileData, index) => {
                                          console.log(fileData);
                                          return (
                                            <div
                                              className="send-msg"
                                              key={"index" + index}
                                            >
                                              <Link to="">
                                                <img
                                                  src={double_tick}
                                                  alt="double_tick"
                                                  className="ms-3"
                                                />
                                              </Link>
                                              <div className="send-msg-main">
                                                <img
                                                  src={fileData?.file_path}
                                                  alt=""
                                                />
                                              </div>
                                              {(userRole === "customer" ||
                                                (accessRights &&
                                                  accessRights?.rights_manage_chat_support ==
                                                    1)) && (
                                                <Dropdown className="ActionDropdown">
                                                  <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                    className="ActionToggle"
                                                  >
                                                    <img
                                                      src={hr_three_dot}
                                                      alt=""
                                                      className="me-3"
                                                    />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu className="ActionMenu">
                                                    <ul className="actionnmenulist">
                                                      <li
                                                        onClick={() => {
                                                          handleHisteryDelelte(
                                                            newMsg.message_id,
                                                            newMsg.message_parent_id
                                                          );
                                                        }}
                                                      >
                                                        {t("Delete")}
                                                      </li>
                                                    </ul>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              )}
                                            </div>
                                          );
                                        })}
                                    </>

                                    {/* {/* End */}
                                  </>
                                ) : (
                                  <>
                                    {newMsg.message_content == null ||
                                    newMsg.message_content == "" ? null : (
                                      <>
                                        <div className="receive-msg" key={i}>
                                          <div className="msg-with-img">
                                            {newMsg.message_from_profile ===
                                              "" ||
                                            newMsg.message_from_profile ===
                                              null ? (
                                              <img
                                                src={ImportUser}
                                                alt=""
                                                // className="custom-Margin"
                                              />
                                            ) : (
                                              <img
                                                src={
                                                  ApiConfig.BASE_URL_FOR_IMAGES +
                                                  newMsg.message_from_profile
                                                }
                                                onError={(ev) => {
                                                  handleErrorImage(ev);
                                                }}
                                                alt=""
                                                // className="custom-Margin"
                                              />
                                            )}
                                          </div>
                                          <div className="right-receive-msg">
                                            <div className="receive-msg-main">
                                              <p className="msg-text">
                                                {newMsg.message_content}
                                              </p>
                                            </div>

                                            {(userRole === "customer" ||
                                              (accessRights &&
                                                accessRights?.rights_manage_chat_support ==
                                                  1)) && (
                                              <div>
                                                <Dropdown className="ActionDropdown">
                                                  <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                    className="ActionToggle"
                                                  >
                                                    <img
                                                      src={hr_three_dot}
                                                      alt=""
                                                      className="mx-3"
                                                    />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu className="ActionMenu">
                                                    <ul className="actionnmenulist">
                                                     
                                                      <li
                                                        onClick={() =>
                                                          setReplyTo({
                                                            ...newMsg,
                                                          })
                                                        }
                                                      >
                                                        {t("Reply")}
                                                      </li>
                                                    </ul>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="time-date-sms-receive">
                                          {moment(
                                            newMsg.message_date_time
                                          ).fromNow()}
                                        </div>
                                      </>
                                    )}

                                    {newMsg.files &&
                                      newMsg.files &&
                                      newMsg.files.map((filedata, index) => {
                                        return (
                                          <div className="receive-msg">
                                            <div className="right-receive-msg">
                                              <div className="receive-msg-main">
                                                {/* <img src={img2} alt="" /> */}
                                                <img
                                                  src={filedata.file_path}
                                                  key={
                                                    "file" + filedata.file_id
                                                  }
                                                  alt=""
                                                />
                                              </div>

                                              {(userRole === "customer" ||
                                                (accessRights &&
                                                  accessRights?.rights_manage_chat_support ==
                                                    1)) && (
                                                <div>
                                                  <Dropdown className="ActionDropdown">
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      id="dropdown-basic"
                                                      className="ActionToggle"
                                                    >
                                                      <img
                                                        src={hr_three_dot}
                                                        alt=""
                                                        className="mx-3"
                                                      />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="ActionMenu">
                                                      <ul className="actionnmenulist">
                                                        <li
                                                          onClick={() => {
                                                            handleHisteryDelelte(
                                                              newMsg.message_id,
                                                              newMsg.message_parent_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Delete")}
                                                        </li>
                                                      </ul>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </>
                                );
                              })}
                            </div>
                            <div ref={lastMessageRef} />
                          </div>

                          {(userRole === "customer" ||
                            (accessRights &&
                              accessRights?.rights_manage_chat_support ==
                                1)) && (
                            <div
                              className="send_section_btn_inputs fabcss" /* style={{position : 'relative'}} */
                            >
                              <div className="reply-msg-wrapper">
                                {replyTo.message_id && (
                                  <ReplyShowMsg
                                    replyTo={replyTo}
                                    msgRef={msgRef}
                                  />
                                )}
                              </div>
                              {/* <div className="fab-class"> */}
                              {/* <div className="fabreact" > */}

                              {/* <Fab 
                            
                            icon="+"
                            mainButtonStyles={{
                              backgroundColor: 'rgba(156, 73, 0, 0.9)',
                              color: '#fff',
                              fontSize: '20px',
                              fontWeight: 'bold',
                            }}
                            alwaysShowTitle={false}
                            isOpen={menuOpen}
                            onClick={toggleMenu}
                          >
                            <div onClick={closeMenu}>
                              <div style={{ borderRadius:"10px" }}>
                                <FontAwesomeIcon icon={faPlus} />
                              </div>
                              <div style={{ borderRadius:"10px" }}>
                                <FontAwesomeIcon icon={faUserPlus} />
                              </div>
                              <div style={{ borderRadius:"10px"  }}>
                                <FontAwesomeIcon icon={faCog} />
                              </div>
                            </div>
                          </Fab> 
                                                  </div>
    </div>*/}

                              <div
                                style={{
                                  zIndex: "1",
                                  height: "10rem",
                                  width: "5rem",
                                  /* marginTop:'2rem' */ position: "relative",
                                  marginBottom: "rem",
                                  top: "-3.7rem",
                                }}
                                className="d-flex flex-column-reverse"
                              >
                                <div style={{ marginBottom: "0rem" }}>
                                  {menuOpen && (
                                    <>
                                      {/* <div className="d-flex justify-content-center align-items-center" style={{ visibility: 'hidden', backgroundColor:  "#F6EFE9", cursor:'pointer', height: "2.5rem", width: "2.5rem", borderRadius: "50%",}} >
                  <FontAwesomeIcon icon={faPencil} style={{height:'1rem' , width:'1rem' , color:'#8F4300'}} />
                               </div> */}
                                      <div
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={() =>
                                          fileUpload.current.click()
                                        }
                                        style={{
                                          backgroundColor: "#F6EFE9",
                                          cursor: "pointer",
                                          height: "2.7rem",
                                          width: "2.7rem",
                                          borderRadius: "50%",
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faUpload}
                                          style={{
                                            height: "1rem",
                                            width: "1rem",
                                            color: "#8F4300",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="d-flex justify-content-center align-items-center my-2"
                                        style={{
                                          backgroundColor: "#F6EFE9",
                                          cursor: "pointer",
                                          height: "2.7rem",
                                          width: "2.7rem",
                                          borderRadius: "50%",
                                        }}
                                        onClick={handleSmileyClick}
                                      >
                                        <img
                                          style={{
                                            /* backgroundColor: emogi ? '#3498db' : 'transparent' , */ height:
                                              "1.3rem",
                                            width: "1.3rem",
                                          }}
                                          src={happiness}
                                          alt="Smiley"
                                          width={20}
                                        />
                                      </div>
                                    </>
                                  )}

                                  <Button
                                    className="box-sizing: border-box"
                                    variant=""
                                    style={{
                                      /* position:'absolute', */ color: "white",
                                      backgroundColor: "#8F4300",
                                      height: "2.7rem",
                                      width: "2.7rem",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                    }}
                                    onClick={toggleMenu}
                                  >
                                    {menuOpen ? "x" : "+"}
                                  </Button>
                                </div>
                              </div>

                              {emogi && (
                                // <div className="ms-5 " style={{marginBottom : '30rem', }}>
                                //  <div style={{right : sidebar ? '0rem' : '5rem' }}>
                                <EmojiPicker
                                  onEmojiClick={(e) => {
                                    setMessage(message + e.emoji);
                                  }}
                                  width="18rem"
                                  height="21rem"
                                  size="0.5rem"
                                  //  style={{bottom:"13rem", right:'35rem', }}

                                  className={
                                    sidebar
                                      ? "emoji-style"
                                      : "emoji-style-sidebar-off"
                                  }
                                />
                                // </div>
                              )}

                              {/* img Previw    */}

                              {/*   <div class="d-flex img-preview-section">
                              {uploadedFiles.map((file, index) => {
                               return (
                              file && (
                                <div
                                  className="ImgPreview"
                                  key={"uploadedImage" + index}
                                >
                                  {!file.name.includes("jpeg") ||
                                  !file.name.includes("png") ||
                                  !file.name.includes("jpg") ? (
                                    <img
                                      src={img1}
                                      alt="imgneme2"
                                      className="image"
                                      height="30px"
                                      width="40px"
                                    />
                                  ) : (
                                    <>
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt="imgneme1"
                                        className="me-3 image"
                                        height="30px"
                                        width="40px"
                                      />

                                      <img
                                        src={ImportUser}
                                        className="close_icon"
                                        alt="imgneme"
                                        onClick={() =>
                                          setUploadedFiles(
                                            uploadedFiles.filter(
                                              (file, fileIndex) =>
                                                fileIndex != index
                                            )
                                          )
                                        }
                                        height="30px"
                                        width="40px"
                                      />
                                    </>
                                  )}
                                </div>
                              )
                            );
                          })}
                        </div> */}

                              <div
                                className="send_section_btn_inputs "
                                style={{ bottom: 0 }}
                              >
                                {/* old emogi place */}
                                {/* {emogi && (
                                  // <div className="ms-5 " style={{marginBottom : '30rem', }}>
                                  <EmojiPicker
                                    onEmojiClick={(e) => {
                                      setMessage(message + e.emoji);
                                    }}
                                   width="20rem"
                                   height="22rem"
                                   size = "0.5rem"
                                   style={{bottom:"13.4rem", left:'3rem', }}
                                  />
                                  // </div>
                                )} */}

                                <div className="text-input ms-4-" style={{width:'85%', height:'100%', marginLeft:'2.9rem', border:'none'}}>
                                  {/* <input
                                    type="text"
                                    className="form-control "
                                    placeholder={t("Type a message here")}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyUp={(e) => {
                                      if (e.key == "Enter")
                                        sendMessage(replyTo);
                                        setEmogi(false)
                                    }}
                                  /> */}
                                   <MesnsionForTeam
                                      replyTo={replyTo}
                                      sendMessage={sendMessage}
                                      message={message}
                                      setMessage={setMessage}
                                      // menstionedUsers={menstionedUsers}
                                      menstionedUsers={AboutList}
                                      setMenstionedUsers={setMenstionedUsers}
                                      inputRef={inputRef}
                                      
                                    />
                                </div>
                                <div className="send-btn">
                                  <Link to="#">
                                    <img
                                      // onClick={sendMessage}
                                      onClick={(e) => {
                                        sendMessage(replyTo);
                                        setReplyTo({});
                                        setEmogi(false);
                                      }}
                                      onKeyUp={(e) => {
                                        sendMessage(replyTo);
                                        setEmogi(false);
                                      }}
                                      src={send_btn}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                              
                              {/* //OLD// */}
                              {/* <div className="text-input">

                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Type a message here")}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyUp={(e) => {
                              if (e.key == "Enter") sendMessage(replyTo);
                            }}
                          />
                        </div> */}
                              {/* <div className="send-btn">
                          <Link to="#">
                            <img
                              // onClick={sendMessage}
                              onClick={(e) => {
                                sendMessage(replyTo);
                                setReplyTo({});
                              }}
                              onKeyUp={(e) => {
                                sendMessage(replyTo);
                              }}
                              src={send_btn}
                              alt=""
                            />
                          </Link>
                        </div> */}
                            </div>
                          )}
                          <input
                            type="file"
                            className="d-none"
                            ref={fileUpload}
                            multiple
                            // onChange={(e) =>
                            //    setUploadedFiles([
                            //     ...uploadedFiles,
                            //     ...e.target.files,
                            //   ])

                            // }
                            onChange={(e) => {
                              handleFileUpload(e.target.files);
                            }}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                    {/* End Chat Body */}
                  </div>
                </Tab.Container>
              </div>
            </>
          )}
        </div>
        )}
      </main>
      <Modal
        show={modalShow}
        onHide={() => setDeleteModal(false)}
        centered
        size="xl"
        className="common-model"
      >
        <Modal.Header closeButton onClick={() => setModalShow(false)}>
          <Modal.Title>{t("Member List")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-2">
          <div className="table-Model mb-4">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Teams</th>
                    {/* <th>Action</th> */}

                  
         
                </tr>
              </thead>
              <tbody style={{ color: "#8F4300" }}>
                {console.log('AboutList-->', AboutList)}
                {AboutList && AboutList.length > 0 ? (
                  AboutList?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td><img src={item.user_profile_pic} alt="" height="45px" width="45px"
                           onError={(ev) => {
                            handleErrorImage(
                              ev
                            );
                          }}
                          /></td>

                          <td>{item.user_name}</td>
                          <td>{item.user_role}</td>
                    {/* <th>  <td
                          onClick={() => {
                            socket &&
                              socket.emit('remove-member', {
                               senderId: Number(customerData.id),
                               user_customer_id:customerData.customer_id,
                               memberId:item.user_id,
                               chat_id:ChatId
             
                              })
                          
                          }}
                          >Remove member</td></th> */}

                        
      
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "auto",
                      marginTop: "40px",
                    }}
                    className=" text-center justify-content-center"
                  >
                    {t("AboutList No data")}
                  </p>
                )}
              </tbody>
            </Table>
          </div>
          <div className="copy_body d-flex justify-content-end"></div>
        </Modal.Body>
        <Modal.Footer className="pop-up-modal-footer">
          <button className="cx-btn-1" onClick={() => setModalShow(false)}>
            {t("Close")}
          </button>
          <button
            className="cx-btn-2"
            onClick={() => {
              setDeleteModal(false);
              setModalShow(false);
            }}
          >
            {t("Yes")}
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={addmodalShow}
        /* onHide={handleClose} */
        centered
        size="lg"
        className="common-model"
      >
        <Modal.Header closeButton onClick={() => setaddmodalShow(false)}>
          <Modal.Title>Add Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectOption">
            <Form.Label>Select User:</Form.Label>
            {/* Replace the Form.Control with Multiselect component */}

            <Select
              dropdownStyle={{ zIndex: "2000" }}
              mode="multiple" // Enable multiple selection
              style={{
                width: "95%",
                color: "rgba(156, 73, 0, 0.5)",
                
              }}
              // placeholder={`Groups (${groupVehicleList?.length})`}
              placehold={t("Select")}
              key={"selectedGroupData"}
              onChange={(selectedValues) => {
                setUserName(selectedValues);
              }}
              value={userName}
              optionLabelProp="label"
              
              > 
              {gruopList?.map((data, index) => (
                <Option   
                
                //  className={({ selected }) => (selected ? 'custom-selected-option' : '' ,console.log('selectedoo--->', selected))} 
                //  className= 'custom-selected-option' 
                 
                  key={data?.user_id}
                  value={data?.user_id}
                  label={data?.user_name}
                  style={{ color: "rgba(156, 73, 0)", backgroundColor:'white'}}
                >
                 
                    <Space >
                            <div className="d-flex justify-content-start align-items-center" >
                          <img
              src={data?.user_profile_pic ? data?.user_profile_pic : ImportUser } // Assume data.profile_picture contains the URL of the profile picture
              style={{ width: 30, height: 30, borderRadius: '50%' }}
              onError={(ev) => {
                handleErrorImage(
                  ev
                );
              }}
            />
                            <span className="ms-2"
                              role="group"
                              aria-label={data.user_id}
                            >
                              {data?.user_name}
                            </span>
                            </div>
                          </Space>
                </Option>
              ))}
            </Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#8F4300", color: "white" }}
            onClick={() => setaddmodalShow(false)}
          >
            Close
          </Button>
          <Button
            variant="#8F4300"
            style={{ backgroundColor: "#8F4300", color: "white" }}
            onClick={handleSave}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* //use for the about section // */}
      <Modal
        show={aboutadd}
        /* onHide={handleClose} */ centered
        size="lg"
        className="common-model"
      >
        <Modal.Header closeButton onClick={() => setAboutadd(false)}>
          <Modal.Title>Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflow: "auto" }}>
            <Table style={{ borderRadius: "5px !importent" }}>
              <thead>
                <tr style={{ color: "#8F4300" }}>
                  <th>Sr No</th>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Teams</th>
                </tr>
              </thead>

              <tbody style={{ color: "#8F4300" }}>
                {AboutList && AboutList.length > 0 ? (
                  AboutList?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td> <img
              src={item?.user_profile_pic ? item?.user_profile_pic : ImportUser } // Assume item.profile_picture contains the URL of the profile picture
              style={{ width: 30, height: 30, borderRadius: '50%' }}
              onError={(ev) => {
                handleErrorImage(
                  ev
                );
              }}
            /></td>
                          <td>{item.user_name}</td>
                          <td>{item.user_role}</td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "auto",
                      marginTop: "40px",
                    }}
                    className=" text-center justify-content-center"
                  >
                    {t("No data")}
                  </p>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setAboutadd(false)}>
              Close
            </Button> */}
        </Modal.Footer>
      </Modal>
      {/* </main> */}
      <Modal
        show={addmodalShowDelete}
        /* onHide={handleClose} */
        centered
        size="lg"
        className="common-model"
      >
        <Modal.Header
          closeButton
          onClick={() => setaddmodalShowDelete(false)}
        ></Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Delete ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "#8F4300", color: "white" }}
            onClick={() => setaddmodalShowDelete(false)}
          >
            Close
          </Button>
          <Button
            variant="#8F4300"
            style={{ backgroundColor: "#8F4300", color: "white" }}
            onClick={handleDeleteChannel}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Sub channel  Modal */}
      <Modal
        show={showsubChannelModal}
        onHide={() => {
          setShowsubChannelModal(false);
        }}
        animation={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ color: "#8F4300" }}>Create Sub Channel</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 pe-0 mb-2">
              <label for="" class="mb-2" style={{ color: "#8F4300" }}>
                Channel Name
              </label>
              <input
                value={subChannelDetails.name}
                onChange={(e) =>
                  setSubChannelDetails({
                    ...subChannelDetails,
                    name: e.target.value,
                  })
                }
                class="form-control tasKCategory1"
                type="text"
                placeholder="Enter Channel Name"
              />
            </div>

            <div className="col-lg-12 mb-3">
              <Form.Group controlId="selectOption">
                <Form.Label>
                  <span style={{ color: "#8F4300" }}>Select User:</span>
                </Form.Label>
                {/* Replace the Form.Control with Multiselect component */}

                <Select
                  dropdownStyle={{ zIndex: "2000" }}
                  mode="multiple" // Enable multiple selection
                  style={{
                    width: "95%",
                    color: "rgba(156, 73, 0, 0.5)", 
                  }}
                  // placeholder={`Groups (${groupVehicleList?.length})`}
                  placehold={t("Select")}
                  key={"selectedGroupData"}
                  onChange={(selectedValues) => {
                    setUserName(selectedValues);
                  }}
                  value={userName}
                  optionLabelProp="label"
                >
                  {gruopList?.map((data, index) => (
                    <Option
                      key={data?.user_id}
                      value={data?.user_id}
                      label={data?.user_name}
                      style={{ color: "rgba(156, 73, 0)" , backgroundColor:'white'}}
                    >
                      
                        <Space >
                            <div className="d-flex justify-content-start align-items-center" >
                          <img
              src={data?.user_profile_pic ? data?.user_profile_pic : ImportUser } // Assume data.profile_picture contains the URL of the profile picture
              style={{ width: 30, height: 30, borderRadius: '50%' }}
              onError={(ev) => {
                handleErrorImage(
                  ev
                );
              }}
            />
                            <span className="ms-2"
                              role="group"
                              aria-label={data.user_id}
                            >
                              {data?.user_name}
                            </span>
                            </div>
                          </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Group>
            </div>

            <div className="d-flex justify-content-end align-items-center mainBtnsSub py-3 px-3">
              <Modal.Footer>
                <Button
                  variant="secondary"
                  style={{ backgroundColor: "#8F4300", color: "white" }}
                  onClick={() => setShowsubChannelModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="#8F4300"
                  style={{ backgroundColor: "#8F4300", color: "white" }}
                  onClick={handleSubChainal}
                >
                  Add
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TeamMessages;
