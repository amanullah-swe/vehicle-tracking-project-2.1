import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
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
import { Link, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import option from "../../assets/images/option-three-dot.svg";
import debounce from 'lodash.debounce';
import ChatBox from "./ChatBox";
import hr_three_dot from "../../assets/images/Chating_images/hr_three_dot.svg";
import { Button, Dropdown , DropdownButton} from "react-bootstrap";
import ImportUser from "../../assets/images/imagesuser.png";
import double_tick from "../../assets/images/Chating_images/double_tick.svg";
// import { SpeedDial } from "primereact/speeddial";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import send_btn from "../../assets/images/Chating_images/send_btn.svg";
import check_symbool from "../../assets/images/Chating_images/check-symbol.png";
import happiness from "../../assets/images/Chating_images/happiness.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Mesnsion from "../Account/mesnsion/Mesnsion";
import "./MyMessage.scss";
import MensionUsers from "./MensionUsers";

const customDropdownMenuStyle = {
  transform: 'translateX(-100%)',
  left: '0',
  right: 'auto'
};

const { Option } = Select;
const staticGroups = [
  { label: "Person 1", value: 1 },
  { label: "Person 2", value: 2 },
  { label: "Person 3", value: 3 },
];

const MyMessages = () => {
  const inputRef = useRef(null);
  const [menstionedUsers, setMenstionedUsers] = useState([]);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;
  
  const [userName, setUserName] = useState([]);
  console.log("userName", userName);
  const toast = useRef(null);
  const msgRef = useRef([]);
  const {
    sidebar,
    setMembersArray,
    socket,
    customerData,
    recentChatdata,
    setRecentChatdata,
    setCreatecompose,
    Createcompose,
    membersArray,
  } = useContext(AppContext);

  console.log("chat_id ===", id);

  console.log("Createcompose", Createcompose);
  
  const [UserIndex, setIndex] = useState("");
  const [loading, set_loading] = useState(true);

  const [RecentUserList, setRecentUserList] = useState([]);
  const [loader, setloader] = useState(false);
  const [userTyping, setUserTyping] = useState({
    status: false,
    userName: null,
  });

  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(1);
  const [ChatUser, setChatUser] = useState("");

  const [ChatUserGroup, setChatUserGroup] = useState("");
 
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
  const [ChatData, setChatData] = useState("");
  console.log("ChatType", ChatType);

  const [modalShow, setModalShow] = useState(false);
  const [addmodalShow, setaddmodalShow] = useState(false);
  const [MemberListUpdate, setMemberListUpdate] = useState(false);
  const [aboutadd, setAboutadd] = useState(false);
  const [AboutDeleteModul, setAboutDeleteModule] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [AboutList, setAboutList] = useState([]);
  const [gruopList, setgruopList] = useState([]);
  const [emogi, setEmogi] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          socket.emit("update-last-msg-read", {
            user_id: Number(customerData.id),
            user_customer_id: customerData.customer_id,
            LastMsgId: value.message_id,
            chat_id: ChatId,
          });
        }
      });
    let newData = recentChatdata.filter((forun) => forun.message_id !== ChatId);
    setRecentChatdata(newData);

    return () => {
      socket && socket.off("message send");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("get-members", (value) => {
        let data = value;
        setMembersArray([
          ...data?.sort((a, b) => a.User_Id - b.User_Id),
          {
            user_id: "everyone",
            user_name: "Everyone",
          },
        ]);
        setAboutList(data);
      });
    return () => {
      socket && socket.off("get-members");
    };
  }, [ChatId, socket]);

  useEffect(() => {
    socket &&
      socket.on("add-members", (value) => {
        let data = value;

        setAboutList(data);

        socket.emit("get-members", {
          user_customer_id: customerData.customer_id,
          chat_id: ChatId,
          user_id: customerData.id,
        });
      });
    setMemberListUpdate(true);
    return () => {
      socket && socket.off("add-members");
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
      socket.on("grp-chat-all-read", (value) => {
        let data = value;

        // let newData = recentChatdata.map((forun) => {
        //   return forun.message_id === data.message_id
        //     ? { ...forun, message_status: data.message_status }
        //     : { ...forun, message_status: forun.message_status };
        // });
        // let newDataMsg = newmessage.map((forun) => {
        //   return forun.message_id === data.message_id
        //     ? { ...forun, message_status: data.message_status }
        //     : { ...forun, message_status: forun.message_status };
        // });
        // setRecentChatdata(newData);
        // setnewmessage(newDataMsg);

        setRecentChatdata(
          recentChatdata.map((msg) => {
            return data.unread_msgs.includes(msg.message_id) ||
              Math.max(data.unread_msgs) >= msg.message_id
              ? { ...msg, message_status: "read" }
              : msg;
          })
        );
        setnewmessage(
          newmessage.map((msg) => {
            return data.unread_msgs.includes(msg.message_id) ||
              Math.max(data.unread_msgs) >= msg.message_id
              ? { ...msg, message_status: "read" }
              : msg;
          })
        );
      });
    return () => {
      socket && socket.off("grp-chat-all-read");
    };
  }, [recentChatdata, socket, newmessage]);

  // User Search

  useEffect(() => {
    // setRecentChatdata([]);

    handleHistery(ChatId);
  }, [page]);

  useEffect(() => {
    socket &&
      socket.on("refresh-chat", (data) => {
        geRecentRefrsh();
        if (data?.senderId != customerData.id) {
          socket.emit("get-unread-msgs-count", {
            user_id: customerData.id,
            user_customer_id: customerData.customer_id,
          });
        }
      });
    return () => {
      socket && socket.off("refresh-chat");
    };
  }, [socket]);

  useEffect(() => {
    geRecentChatlList();
  }, [FilterSearch]);

  useEffect(() => {
    geRecentChatlList();
  }, [Createcompose]);

  function geRecentChatlList() {
    // setloader(true);
    console.log("Createcompose >>", Createcompose);
    getWithAuthCall(
      ApiConfig.RECENT_CHAT_USER_New +
        `?search=${FilterSearch}&type=${Createcompose}`
    )
      .then((data) => {
        set_loading(false);

        setloader(false);
        if (data.result) {
          // setChatId(data.last_chat)

          setRecentUserList(data.recent_chats);
          let chathistory = data.recent_chats[0];

          if (id) {
            chathistory = data.recent_chats.filter(
              (item) => item.message_thread_id == id
            )[0];
          }
          ////log

          console.log("chathistory", chathistory);

          const myId = customerData.id;
          const filteredUsers = chathistory.users?.filter(
            (user) => user.user_id != myId
          );
          console.log("filteredUsers", filteredUsers);

          setShowResults(true);
          setnewmessage([]);
          setPage(1);
          setChatData(chathistory);
          setChatType(chathistory?.message_thread_is_group);
          handleHistery(chathistory?.message_thread_id);
          setChatId(chathistory?.message_thread_id);
          Messagejoin(chathistory?.message_thread_id);
          Messagegetmembers(chathistory?.message_thread_id);
          Addgetmembers(chathistory?.message_thread_id);
          setChatUser(chathistory?.users);

          setChatUserGroup(
            chathistory?.message_thread_is_group == false
              ? filteredUsers[0]?.user_name // Assuming you want the first user in the filtered list if it's not a group
              : chathistory?.message_thread_title
          );
        } else {
          setRecentUserList([]);
        }
      })
      .catch((error) => {
        set_loading(false);
        console.log("api response", error);
      });
  }

  function geRecentRefrsh() {
    // setloader(true);
    console.log("Createcompose >>", Createcompose);
    getWithAuthCall(
      ApiConfig.RECENT_CHAT_USER_New +
        `?search=${FilterSearch}&type=${Createcompose}`
    )
      .then((data) => {
        setloader(false);
        if (data.result) {
          // setChatId(data.last_chat)

          setRecentUserList(data.recent_chats);

          ////log
        } else {
          setRecentUserList([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }

  // Chat Histery  ///
  const handleHistery = async (ChatID) => {
    console.log("ChatID", ChatID);

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
        if (data.result === true) {
          let lastmsg = data.data[0].message_id;

          socket.emit("update-last-msg-read", {
            user_id: Number(customerData.id),
            user_customer_id: customerData.customer_id,
            LastMsgId: lastmsg,
            chat_id: ChatID,
          });

          //map

          setRecentChatdata([...data.data.reverse()]);
          if (data.total_pages - data.current_page === 0) {
            sethasmore(false);
          }
        } else {
          setRecentChatdata([]);
        }
      })
      .catch((error) => {
        console.log("api response", error);
      });
  };

  // Chat Histery Delete ///

  const handleHisteryDelelte = async (massageID, chatId) => {
    socket.emit("delete-message", {
      user_id: customerData.id,
      user_customer_id: customerData.customer_id,
      message_id: massageID,
      chat_id: chatId,
    });

    let newData = recentChatdata.filter(
      (forun) => forun.message_id !== massageID
    );
    let newData1 = newmessage.filter((forun) => forun.message_id !== massageID);
    setRecentChatdata(newData);
    setnewmessage(newData1);
  };

  const sendMessage = async (msg,) => {


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
      content:messageData,
      receiverId: ChatUser.user_id,
      file: [],
      chat_id: ChatId,
      mentioned_to:mentionedUserIdArr
    });

    setEditMsg({});
    setReplyTo({});
  };

  const Messagejoin = async (groupid) => {
    setMessage("");
    socket.emit("join-room", {
      chat_id: groupid,
    });
  };

  const AddMamberjoin = async () => {
    socket.emit("add-members", {
      members: userName,
      user_customer_id: customerData.customer_id,
      chat_id: ChatId,
    });
    Messagegetmembers(ChatId);
    notifySuccess('Members Added Successfully');
  };
  const Messagegetmembers = async (groupid) => {
    socket.emit("get-members", {
      user_customer_id: customerData.customer_id,
      chat_id: groupid,
      user_id: customerData.id,
    });
  };

  const Addgetmembers = async (groupid) => {
    socket.emit("get-user-list", {
      user_customer_id: customerData.customer_id,
      chat_id: groupid,
      user_id: customerData.id,
    });
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

  const myId = customerData.id;
  // const filteredUsers = ChatUser?.filter(user => user.user_id !== myId);
  const filteredUsers = Array.isArray(ChatUser)
    ? ChatUser.filter((user) => user.user_id !== myId)
    : [];
  // Assuming you're dealing with a single user profile picture for display
  const userProfilePic =
    filteredUsers.length > 0
      ? filteredUsers[0].user_profile_pic
      : "default_image_url";

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

  const handleSave = () => {
    // handleClose(); // Close the modal after saving

    AddMamberjoin();
    setUserName([]);
    setaddmodalShow(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setEmogi(false);
  };

  const handleSmileyClick = () => {
    setEmogi(!emogi); // Assuming setEmogi is a function to handle emoji state
    // closeMenu(); // Close the menu when smiley icon is clicked
  };

  const handleDeleteGroup = () => {
    // Handle saving the selected option

    // handleClose(); // Close the modal after saving

    DeleteChannel();

    setAboutDeleteModule(false);
  };

  const DeleteChannel = async () => {
    socket.emit("delete-subchannel", {
      user_id: customerData.id,
      user_customer_id: customerData.customer_id,
      chat_id: ChatId,
    });
    geRecentChatlList();
  };

  const isWithinHours = (datetime, userdatetime, hours) => {
    const diff = Math.abs(datetime - userdatetime);
    const diffHours = Math.ceil(diff / (1000 * 60 * 60));
    return diffHours <= hours;
  };

  const formatTimeToLocal =(utcDateString) =>{
const date = new Date(utcDateString);
return date?.toLocaleString();
  }

  
  
  const sendMessage2 = () => {
    if (editMsg.message_content.length) {
      if (socket)
        socket.emit("edit message", {
          user_id: customerData.id,
          user_customer_id: customerData.customer_id,
          conversation_id: editMsg.message_id,
          conversation_message: editMsg.message_content,
          files: [],
        });
  
      setEditMsg({
        message_id: null,
        Sender_Id: null,
      });
    }
  };
  

  return (
    <>
      <Toast ref={toast} className="toast" />
      <main
        className={sidebar ? "taskMain " : "cx-active taskMain"}
        id="cx-main"
      >
        {loading ? (
          <Loader />
        ) : (
          <div id="cx-wrapper" className="mymessage-main-wrapper">
            {userRole === "customer" ||
            (accessRights && accessRights?.rights_manage_chat_support == 1) ? (
              <div className="compose-message-wrapper">
                {Createcompose === "All" ? (
                  <>
                    <>
                      <Link
                        to="/ComposeMessage"
                        className="cx-btn-3 form_input_main"
                        variant="primary"
                        onClick={() => {
                          setCreatecompose("Chat");
                        }}
                      >
                        + New Chat
                      </Link>
                    </>
                    <>
                      <Link
                        to="/ComposeMessage"
                        className="cx-btn-3 form_input_main"
                        variant="primary"
                        onClick={() => {
                          setCreatecompose("Group");
                        }}
                      >
                        + New Group
                      </Link>
                    </>
                  </>
                ) : (
                  <>
                    <Link
                      to="/ComposeMessage"
                      className="cx-btn-3 form_input_main"
                      variant="primary"
                    >
                      + {Createcompose === "Chat" ? "New Chat" : "New Group"}
                    </Link>
                  </>
                )}
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
                      <div className="col-lg-3 col-md-3 left-chat-section">
                        <div className="left-heading-chat">
                          <div className="left-head">
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
                          </div>
                        </div>
                        <div className="pinned-section">
                          <div className="left">
                            <label htmlFor="">{t("Messages")}</label>
                          </div>
                        </div>
                        {/* Accordion 1*/}
                        <div className="Vehcle-main-tabs" id="">
                          <Tab.Container
                            id="left-tabs-example"
                            defaultActiveKey="All"
                          >
                            <Nav variant="pills" id="newTabMai" className="">
                              <>
                                <Nav.Item>
                                  <Nav.Link
                                    style={{ width: "110px" }}
                                    eventKey="All"
                                    onClick={() => {
                                      setCreatecompose("All");
                                    }}
                                  >
                                    {t("ALL")}
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link
                                    style={{ width: "110px" }}
                                    eventKey="first"
                                    onClick={() => {
                                      setCreatecompose("Chat");
                                    }}
                                  >
                                    {t("Chat")}
                                  </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                  <Nav.Link
                                    style={{ width: "110px" }}
                                    eventKey="second"
                                    onClick={() => {
                                      setCreatecompose("Group");
                                    }}
                                  >
                                    {t("Group")}
                                  </Nav.Link>
                                </Nav.Item>
                              </>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="All">
                                <div className="chat-user-lists">
                                  <Nav
                                    variant="pills"
                                    className="flex-column Vehcle-main-tabs second-section"
                                  >
                                  
                                    {RecentUserList &&
                                    RecentUserList.length > 0 ? (
                                      RecentUserList?.map((item, index) => {
                                        const myId = customerData.id;
                                        const filteredUsers =
                                          item.users?.filter(
                                            (user) => user.user_id != myId
                                          );

                                        return (
                                          <Nav.Item>
                                            <Nav.Link
                                              eventKey={index + 1}
                                              onClick={() => {
                                                setShowResults(true);
                                                setnewmessage([]);
                                                setPage(1);
                                                setChatData(item);
                                                setChatType(
                                                  item.message_thread_is_group
                                                );
                                                handleHistery(
                                                  item.message_thread_id
                                                );
                                                setChatId(
                                                  item.message_thread_id
                                                );
                                                Messagejoin(
                                                  item.message_thread_id
                                                );
                                                Messagegetmembers(
                                                  item.message_thread_id
                                                );
                                                Addgetmembers(
                                                  item.message_thread_id
                                                );
                                                setChatUser(item.users);

                                                setChatUserGroup(
                                                  item.message_thread_is_group ==
                                                    false
                                                    ? filteredUsers[0]
                                                        ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                    : item.message_thread_title
                                                );
                                                setIndex(index + 1);
                                              }}
                                            >
                                              <div className="user-chat-tab">
                                                {/* //model window for click// */}

                                                <div className="left-profile-pic">
                                                  {item.message_thread_is_group ==
                                                  true ? (
                                                    <>
                                                      <div class="circle">
                                                        <div
                                                          class="quarter top-left"
                                                          style={{
                                                            backgroundColor:
                                                              "#F2D8D9",
                                                            borderTopLeftRadius:
                                                              "23px",
                                                          }}
                                                        >
                                                          <div
                                                            class="initial"
                                                            style={{
                                                              marginLeft: 8,
                                                              color: "#643C3F",
                                                              fontSize: 14,
                                                              marginTop: 2,
                                                            }}
                                                          >
                                                            {item?.users[0]
                                                              ? item?.users[0]
                                                                  ?.user_name[0]
                                                              : ""}
                                                          </div>
                                                        </div>
                                                        <div
                                                          class="quarter top-right"
                                                          style={{
                                                            backgroundColor:
                                                              "#DBE4D3",
                                                            borderTopRightRadius:
                                                              "23px",
                                                          }}
                                                        >
                                                          <div
                                                            class="initial"
                                                            style={{
                                                              marginLeft: 2,
                                                              color: "#3E4439",
                                                              fontSize: 14,
                                                            }}
                                                          >
                                                            {!item?.users[1]
                                                              ? item?.users[1]
                                                                  ?.user_name[0]
                                                              : ""}
                                                          </div>
                                                        </div>
                                                        <div
                                                          class="quarter bottom-left"
                                                          style={{
                                                            backgroundColor:
                                                              "#C8D3E4",
                                                            borderBottomLeftRadius:
                                                              "23px",
                                                          }}
                                                        >
                                                          <div
                                                            class="initial"
                                                            style={{
                                                              marginLeft: 6,
                                                              color: "#394C74",
                                                              fontSize: 14,
                                                              marginBottom: 2,
                                                            }}
                                                          >
                                                            {item?.users[2]
                                                              ? item?.users[2]
                                                                  ?.user_name[0]
                                                              : ""}
                                                          </div>
                                                        </div>
                                                        <div
                                                          class="quarter bottom-right"
                                                          style={{
                                                            backgroundColor:
                                                              "#F8E9CD",
                                                            borderBottomRightRadius:
                                                              "23px",
                                                          }}
                                                        >
                                                          <div class="initial">
                                                            +
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Link to="">
                                                        {item?.users
                                                          ?.user_profile_pic ===
                                                          "" ||
                                                        item?.users
                                                          ?.user_profile_pic ===
                                                          null ? (
                                                          <img
                                                            src={ImportUser}
                                                            alt=""
                                                            className=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={
                                                              filteredUsers[0]
                                                                ?.user_profile_pic
                                                                ? filteredUsers[0]
                                                                    ?.user_profile_pic
                                                                : ImportUser
                                                            }
                                                            onError={(ev) => {
                                                              handleErrorImage(
                                                                ev
                                                              );
                                                            }}
                                                            alt=""
                                                            className=""
                                                          />
                                                        )}
                                                      </Link>
                                                    </>
                                                  )}
                                                </div>

                                                <div className="right-name-date ">
                                                  <div className="top-section ">
                                                    <div className="name">
                                                      <label htmlFor="">
                                                        {item.message_thread_title ==
                                                          "" ||
                                                        item.message_thread_title ==
                                                          null
                                                          ? filteredUsers[0]
                                                              ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                          : item.message_thread_title}
                                                      </label>
                                                    </div> 
                                                    <div></div>
                                                    <div className="date">
                                                      <label htmlFor="">
                                                        {
                                                          // item?.message_date_time
                                                        formatTimeToLocal(item?.message_thread_date_time)  
                                                        }
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="bottom-section">
                                                    <label htmlFor="">
                                                      {item?.message_content}
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </Nav.Link>
                                          </Nav.Item>
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
                                  </Nav>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="first">
                                <div className="chat-user-lists ">
                                  <Nav
                                    variant="pills"
                                    className="flex-column Vehcle-main-tabs second-section"
                                  >
                                    {RecentUserList &&
                                    RecentUserList.length > 0 ? (
                                      RecentUserList?.map((item, index) => {
                                        const myId = customerData.id;
                                        const filteredUsers = item.users.filter(
                                          (user) => user.user_id != myId
                                        );

                                        return (
                                          <Nav.Item>
                                            <Nav.Link
                                              eventKey={index + 1}
                                              onClick={() => {
                                                setShowResults(true);
                                                setnewmessage([]);
                                                setPage(1);
                                                setChatData(item);

                                                setChatType(
                                                  item.message_thread_is_group
                                                );

                                                handleHistery(
                                                  item.message_thread_id
                                                );
                                                setChatId(
                                                  item.message_thread_id
                                                );
                                                Messagejoin(
                                                  item.message_thread_id
                                                );
                                                Messagegetmembers(
                                                  item.message_thread_id
                                                );
                                                Addgetmembers(
                                                  item.message_thread_id
                                                );
                                                setChatUser(item.users);
                                                setChatUserGroup(
                                                  item.message_thread_is_group ==
                                                    false
                                                    ? filteredUsers[0]
                                                        ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                    : item.message_thread_title
                                                );
                                                setIndex(index + 1);
                                              }}
                                            >
                                              <div className="user-chat-tab">
                                                {/* //model window for click// */}

                                                <div className="left-profile-pic">
                                                  <Link to="">
                                                    {item?.users
                                                      ?.user_profile_pic ===
                                                      "" ||
                                                    item?.users
                                                      ?.user_profile_pic ===
                                                      null ? (
                                                      <img
                                                        src={ImportUser}
                                                        alt=""
                                                        className=""
                                                      />
                                                    ) : (
                                                      <img
                                                        src={
                                                          filteredUsers[0]
                                                            ?.user_profile_pic
                                                            ? filteredUsers[0]
                                                                ?.user_profile_pic
                                                            : ImportUser
                                                        }
                                                        onError={(ev) => {
                                                          handleErrorImage(ev);
                                                        }}
                                                        alt=""
                                                        className=""
                                                      />
                                                    )}
                                                  </Link>
                                                </div>

                                                <div className="right-name-date ">
                                                  <div className="top-section ">
                                                    <div className="name ">
                                                      <label htmlFor="">
                                                        {item.message_thread_title ==
                                                          "" ||
                                                        item.message_thread_title ==
                                                          null
                                                          ? filteredUsers[0]
                                                              ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                          : item.message_thread_title}
                                                      </label>
                                                    </div>
                                                    <div></div>
                                                    <div className="date">
                                                      <label htmlFor="">
                                                        {
                                                          // item?.message_date_time
                                                          formatTimeToLocal(item?.message_thread_date_time)  
                                                        }
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="bottom-section ">
                                                    <label htmlFor="">
                                                      {item?.message_content}
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </Nav.Link>
                                          </Nav.Item>
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
                                  </Nav>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <div className="chat-user-lists">
                                  <Nav
                                    variant="pills"
                                    className="flex-column Vehcle-main-tabs second-section"
                                  >
                                    {RecentUserList &&
                                    RecentUserList.length > 0 ? (
                                      RecentUserList?.map((item, index) => {
                                        const myId = customerData.customer_id;
                                        const filteredUsers = item.users.filter(
                                          (user) => user.user_id != myId
                                        );
                                        return (
                                          <Nav.Item>
                                            <Nav.Link
                                              eventKey={index + 1}
                                              onClick={() => {
                                                setShowResults(true);
                                                setnewmessage([]);
                                                setPage(1);
                                                setChatData(item);

                                                setChatType(
                                                  item.message_thread_is_group
                                                );

                                                handleHistery(
                                                  item.message_thread_id
                                                );
                                                setChatId(
                                                  item.message_thread_id
                                                );
                                                Messagejoin(
                                                  item.message_thread_id
                                                );
                                                Messagegetmembers(
                                                  item.message_thread_id
                                                );
                                                Addgetmembers(
                                                  item.message_thread_id
                                                );
                                                setChatUser(item.users);
                                                setChatUserGroup(
                                                  item.message_thread_is_group ==
                                                    false
                                                    ? filteredUsers[0]
                                                        ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                    : item.message_thread_title
                                                );
                                                setIndex(index + 1);
                                              }}
                                            >
                                              <div className="user-chat-tab ">
                                                {/* //model window for click// */}

                                                <div className="left-profile-pic">
                                                  {RecentUserList.length > 1 ? (
                                                    <div class="circle">
                                                      <div
                                                        class="quarter top-left"
                                                        style={{
                                                          backgroundColor:
                                                            "#F2D8D9",
                                                          borderTopLeftRadius:
                                                            "23px",
                                                        }}
                                                      >
                                                        <div
                                                          class="initial"
                                                          style={{
                                                            marginLeft: 8,
                                                            color: "#643C3F",
                                                            fontSize: 14,
                                                            marginTop: 2,
                                                          }}
                                                        >
                                                          {item?.users[0]
                                                            ? item?.users[0]
                                                                ?.user_name[0]
                                                            : ""}
                                                        </div>
                                                      </div>
                                                      <div
                                                        class="quarter top-right"
                                                        style={{
                                                          backgroundColor:
                                                            "#DBE4D3",
                                                          borderTopRightRadius:
                                                            "23px",
                                                        }}
                                                      >
                                                        <div
                                                          class="initial"
                                                          style={{
                                                            marginLeft: 2,
                                                            color: "#3E4439",
                                                            fontSize: 14,
                                                          }}
                                                        >
                                                          {item?.users[1]
                                                            ? item?.users[1]
                                                                ?.user_name[0]
                                                            : ""}
                                                        </div>
                                                      </div>
                                                      <div
                                                        class="quarter bottom-left"
                                                        style={{
                                                          backgroundColor:
                                                            "#C8D3E4",
                                                          borderBottomLeftRadius:
                                                            "23px",
                                                        }}
                                                      >
                                                        <div
                                                          class="initial"
                                                          style={{
                                                            marginLeft: 6,
                                                            color: "#394C74",
                                                            fontSize: 14,
                                                            marginBottom: 2,
                                                          }}
                                                        >
                                                          {item?.users[2]
                                                            ? item?.users[2]
                                                                ?.user_name[0]
                                                            : ""}
                                                        </div>
                                                      </div>
                                                      <div
                                                        class="quarter bottom-right"
                                                        style={{
                                                          backgroundColor:
                                                            "#F8E9CD",
                                                          borderBottomRightRadius:
                                                            "23px",
                                                        }}
                                                      >
                                                        <div class="initial">
                                                          +
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      <Link to="">
                                                        {item?.users
                                                          ?.user_profile_pic ===
                                                          "" ||
                                                        item?.users
                                                          ?.user_profile_pic ===
                                                          null ? (
                                                          <img
                                                            src={ImportUser}
                                                            alt=""
                                                            className=""
                                                          />
                                                        ) : (
                                                          <img
                                                            src={
                                                              filteredUsers[0]
                                                                ?.user_profile_pic
                                                                ? filteredUsers[0]
                                                                    ?.user_profile_pic
                                                                : ImportUser
                                                            }
                                                            onError={(ev) => {
                                                              handleErrorImage(
                                                                ev
                                                              );
                                                            }}
                                                            alt=""
                                                            className=""
                                                          />
                                                        )}
                                                      </Link>
                                                    </>
                                                  )}
                                                </div>

                                                <div className="right-name-date ">
                                                  <div className="top-section ">
                                                    <div className="name ">
                                                      <label htmlFor="">
                                                        {item.message_thread_title ==
                                                          "" ||
                                                        item.message_thread_title ==
                                                          null
                                                          ? filteredUsers[0]
                                                              ?.user_name // Assuming you want the first user in the filtered list if it's not a group
                                                          : item.message_thread_title}
                                                      </label>
                                                    </div>
                                                    <div></div>
                                                    <div className="date">
                                                      <label htmlFor="">
                                                        {
                                                          // item?.message_date_time
                                                          formatTimeToLocal(item?.message_thread_date_time)  
                                                        }
                                                      </label>
                                                    </div>
                                                  </div>

                                                  <div className="bottom-section ">
                                                    <label htmlFor="">
                                                      {item?.message_content}
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </Nav.Link>
                                          </Nav.Item>
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
                                  </Nav>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                      </div>

                      {/* <ChatBox /> Body */}

                      <div className="col-lg-9  col-md-12 col-sm-12 right-chat-section right-chat-custom-height-1">
                        <Tab.Content>
                          {/* <Tab.Pane eventKey={UserIndex}> */}
                          <Tab.Pane eventKey="1">
                            {/* <div className="heading-chat-section"> */}
                            <div className={ userRole === 'driver' ? "heading-chat-section d-flex flex-column align-items-start" : 'heading-chat-section'}>
                              <div className="left">
                                <div className="left-profile-pic">
                                  {ChatType == true ? (
                                    <div class="circle">
                                      <div
                                        class="quarter top-left"
                                        style={{
                                          backgroundColor: "#F2D8D9",
                                          borderTopLeftRadius: "23px",
                                        }}
                                      >
                                        <div
                                          class="initial"
                                          style={{
                                            marginLeft: 8,
                                            color: "#643C3F",
                                            fontSize: 14,
                                            marginTop: 2,
                                          }}
                                        >
                                          {ChatData?.users[0]
                                            ? ChatData?.users[0]?.user_name[0]
                                            : ""}
                                        </div>
                                      </div>
                                      <div
                                        class="quarter top-right"
                                        style={{
                                          backgroundColor: "#DBE4D3",
                                          borderTopRightRadius: "23px",
                                        }}
                                      >
                                        <div
                                          class="initial"
                                          style={{
                                            marginLeft: 2,
                                            color: "#3E4439",
                                            fontSize: 14,
                                          }}
                                        >
                                          {!ChatData?.users[1]
                                            ? ChatData?.users[1]?.user_name[0]
                                            : ""}
                                        </div>
                                      </div>
                                      <div
                                        class="quarter bottom-left"
                                        style={{
                                          backgroundColor: "#C8D3E4",
                                          borderBottomLeftRadius: "23px",
                                        }}
                                      >
                                        <div
                                          class="initial"
                                          style={{
                                            marginLeft: 6,
                                            color: "#394C74",
                                            fontSize: 14,
                                            marginBottom: 2,
                                          }}
                                        >
                                          {ChatData?.users[2]
                                            ? ChatData?.users[2]?.user_name[0]
                                            : ""}
                                        </div>
                                      </div>
                                      <div
                                        class="quarter bottom-right"
                                        style={{
                                          backgroundColor: "#F8E9CD",
                                          borderBottomRightRadius: "23px",
                                        }}
                                      >
                                        <div class="initial">+</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
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
                                            src={userProfilePic}
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
                                    </>
                                  )}
                                </div>

                                {Createcompose === "Chat" ? (
                                  <>
                                    <div className="name">
                                      <label htmlFor=""> {ChatUserGroup}</label>
                                    </div>
                                   
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="name "
                                      onClick={() => setModalShow(true)}
                                    >
                                      <label htmlFor="">{ChatUserGroup}</label>
                                    </div>
                                 
                                  </>
                                )}
                              </div>
                              {(userRole === "driver" &&
                            <div style={{width:'50%'}} > <p className=" msg-text-1">Share Whats on your mind!</p></div>
                               )} 
                              {ChatType === false ? (
                                <></>
                              ) : (
                                <>
                                  {customerData.customer_role === "customer" ? (
                                    <>
                                      {Createcompose === "Chat" ? (
                                        <></>
                                      ) : (
                                        <>
                                          <div className="option customer-option">
                                            <Dropdown>
                                              <Dropdown.Toggle>
                                                <img src={option} alt="" />
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu>
                                                <Dropdown.Item>
                                                  <Link
                                                    // to={"/ViewDispatchTrip/"}
                                                    onClick={() =>
                                                      setaddmodalShow(true)
                                                    }
                                                    className="d-block"
                                                  >
                                                    {t("Add People")}
                                                  </Link>
                                                </Dropdown.Item>

                                                {accessRights &&
                                                accessRights?.rights_manage_trips ? (
                                                  <>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        // setShareLink(true);
                                                        // setCurrentTrip(trip.trip_id);
                                                      }}
                                                    >
                                                      <Link
                                                        to="#"
                                                        className="d-block"
                                                        onClick={() =>
                                                          setAboutadd(true)
                                                        }
                                                      >
                                                        {t("About")}
                                                      </Link>
                                                    </Dropdown.Item>

                                                    <Dropdown.Item
                                                      onClick={() => {}}
                                                    >
                                                      <Link
                                                        to="#"
                                                        className="d-block"
                                                        onClick={() =>
                                                          setAboutDeleteModule(
                                                            true
                                                          )
                                                        }
                                                      >
                                                        {t("Delete Group")}
                                                      </Link>
                                                    </Dropdown.Item>
                                                  </>
                                                ) : null}
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        
                                        
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                              
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
                                  // let Mentioned_To =
                                  // chatData.mentioned_to &&
                                  // chatData.mentioned_to.split(',').map(id => Number(id))
                                  // let mensioned = membersArray.filter(
                                  //   member =>
                                  //     Mentioned_To &&
                                  //     Mentioned_To.includes(member.User_Id)
                                  // )
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
                                                      {/* <p className="msg-text">
                                                        {chatData?.message_content.includes(
                                                          "@"
                                                        ) ? (
                                                          <MensionUsers
                                                            text={
                                                              chatData.message_content
                                                            }
                                                            users={mensioned}
                                                            index={i}
                                                          />
                                                        ) : (
                                                          <>
                                                            {
                                                              chatData.message_content
                                                            }
                                                          </>
                                                        )}
                                                      </p> */}
                                                      <p className="msg-text  ">
  {chatData?.message_content.includes('@') ? (
   
    <MensionUsers
      text={chatData.message_content}
      users={mensioned}
      // users={membersArray}
      index={i}
    />
  
  )
 : (
    chatData.message_content
  )}
</p>
                                                    </>
                                                  ) : (
                                                    <p className="msg-text  ">
                                                      {chatData?.message_content.includes(
                                                        "@"
                                                      ) ? (
                                                        <MensionUsers
                                                          text={
                                                            chatData.message_content
                                                          }
                                                          users={mensioned}
                                                          // users={membersArray}
                                                          index={i}
                                                        />
                                                      ) : (
                                                        <>
                                                          {
                                                            chatData.message_content
                                                          }
                                                          
                                                        </>
                                                      )}
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
                                              <Dropdown className="ActionDropdown" drop="start" align='start' >
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  id="dropdown-basic"
                                                  className="ActionToggle custom-toggle"
                                                  // drop='start'
                                                >
                                                  <img
                                                    src={hr_three_dot}
                                                    alt=""
                                                    className="me-3"
                                                  />
                                                </Dropdown.Toggle>

                                                {isWithinHours(
                                                  new Date(
                                                    chatData?.message_date_time
                                                  ),
                                                  new Date(),
                                                  24
                                                ) && (
                                                  <Dropdown.Menu className="ActionMenu " align='start'>
                                                    <ul className="actionnmenulist " >
                                                      {isWithinHours(
                                                        new Date(
                                                          chatData?.message_date_time
                                                        ),
                                                        new Date(),
                                                        24
                                                      ) && (
                                                        <li
                                                          onClick={() => {
                                                            setEditMsg(
                                                              chatData
                                                            );
                                                          }}
                                                        >
                                                          Edit
                                                        </li>
                                                      )}
                                                      {isWithinHours(
                                                        new Date(
                                                          chatData?.message_date_time
                                                        ),
                                                        new Date(),
                                                        10
                                                      ) && (
                                                        <li
                                                          onClick={() => {
                                                            handleHisteryDelelte(
                                                              chatData.message_id,
                                                              chatData.message_thread_id
                                                            );
                                                          }}
                                                        >
                                                          {t("Delete")}
                                                        </li>
                                                      )}
                                                    </ul>
                                                  </Dropdown.Menu>
                                                   
                                                )}
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
                                                  <Dropdown className="ActionDropdown" drop="start" align='start'>
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      id="dropdown-basic"
                                                      className="ActionToggle custom-toggle"
                                                      drop='down'
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
                                                              chatData.message_thread_id
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
                                        <>
                                          {" "}
                                          <div
                                            className=" ms-5"
                                            style={{
                                              color:
                                                "rgba(156, 73, 0, 0.5019607843)",
                                            }}
                                          >
                                            {chatData?.sender_name}
                                          </div>
                                          <div className="receive-msg">
                                            <div className="msg-with-img">
                                              {chatData.sender_pic === "" ||
                                              chatData.sender_pic === null ? (
                                                <img
                                                  src={ImportUser}
                                                  alt=""
                                                  className="custom-Margin"
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
                                                  className="custom-Margin"
                                                />
                                              )}
                                            </div>
                                            {chatData.message_content == null ||
                                            chatData.message_content ==
                                              "" ? null : (
                                              <>
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
                                                          // drop='down'
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
                                              </>
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
                                        chatData.files.map(
                                          (filedata, index) => {
                                            return (
                                              <div className="receive-msg">
                                                <div className="right-receive-msg">
                                                  <div className="receive-msg-main">
                                                    {/* <img src={img2} alt="" /> */}
                                                    <img
                                                      src={filedata.file_path}
                                                      key={
                                                        "file" +
                                                        filedata.file_id
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
                                                          drop='down'
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
                                          }
                                        )}
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

                                {newmessage?.map((newMsg, i) => {
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
                                            {newMsg?.message_status ===
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
                                                          <MensionUsers
                                                            text={
                                                              newMsg.message_content
                                                            }
                                                            users={mensioned}
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
                                                      ) ? (
                                                        <MensionUsers
                                                          text={
                                                            newMsg.message_content
                                                          }
                                                          users={mensioned}
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
                                              <Dropdown className="ActionDropdown" drop="start" align='start'>
                                                <Dropdown.Toggle
                                                  variant="success"
                                                  id="dropdown-basic"
                                                  className="ActionToggle custom-toggle"
                                                
                                                >
                                                  <img
                                                    src={hr_three_dot}
                                                    alt=""
                                                    className="me-3"
                                                  />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="ActionMenu" align='start'>
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
                                                          newMsg.message_thread_id
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
                                          newMsg.files.map(
                                            (fileData, index) => {
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
                                                    <Dropdown className="ActionDropdown" drop="start" align='start'>
                                                      <Dropdown.Toggle
                                                        variant="success"
                                                        id="dropdown-basic"
                                                        className="ActionToggle custom-toggle"
                                                        // drop='down'
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
                                                                newMsg.message_thread_id
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
                                            }
                                          )}
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
                                                  className="custom-Margin"
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
                                                  className="custom-Margin"
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
                                                      className="ActionToggle "
                                                      // drop='down'
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
                                                    <Dropdown className="ActionDropdown" drop="start" align='start'>
                                                      <Dropdown.Toggle
                                                        variant="success"
                                                        id="dropdown-basic"
                                                        className="ActionToggle custom-toggle"
                                                        // drop='down'
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
                                                                newMsg.message_thread_id
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
                                        /* position:'absolute', */ color:
                                          "white",
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
                                  <EmojiPicker
                                    onEmojiClick={(e) => {
                                      setMessage(message + e.emoji);
                                    }}
                                    width="18rem"
                                    height="21rem"
                                    size="0.5rem"
                                    // style={{ bottom: "13rem", right: "35rem" }}
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

                                  <div className="text-input" style={{width:'85%', height:'100%', marginLeft:'2.9rem', border:'none'}}>
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
                                    <Mesnsion
                                      replyTo={replyTo}
                                      sendMessage={sendMessage}
                                      message={message}
                                      setMessage={setMessage}
                                      menstionedUsers={menstionedUsers}
                                      // menstionedUsers={membersArray}
                                      setMenstionedUsers={setMenstionedUsers}
                                      inputRef={inputRef}
                                      
                                    />
                                  </div>
                                  <div className="send-btn">
                                    <Link to="#">
                                      <img
                                        onClick={(e) => {
                                          sendMessage(replyTo);
                                          setReplyTo({});
                                          setEmogi(false);
                                          sendMessage2();
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
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody style={{ color: "#8F4300" }}>
                {AboutList && AboutList.length > 0 ? (
                  AboutList?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
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
              allowClear
              showSearch
              filterOption={(inputValue, option) =>
                
                option.label?.toLowerCase().includes(inputValue.toLowerCase())
              }
            
           
              style={{
                width: "95%",
                color: "rgba(156, 73, 0, 0.5)",
              }}
              // placeholder={`Groups (${groupVehicleList?.length})`}
              placeholder={t("Select")}
              
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
                  style={{ color: "rgba(156, 73, 0)" }}
                >
                  <Space>
                    <div className="d-flex justify-content-start align-items-center">
                      <img
                        src={
                          data?.user_profile_pic
                            ? data?.user_profile_pic
                            : ImportUser
                        } // Assume data.profile_picture contains the URL of the profile picture
                        style={{ width: 30, height: 30, borderRadius: "50%" }}
                        onError={(ev) => {
                          handleErrorImage(ev);
                        }}
                      />
                      <span
                        className="ms-2"
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
          <Table style={{ borderRadius: "5px !importent" }}>
            <thead>
              {/* import Mesnsion from './mesnsion/Mesnsion'; */}
              <tr style={{ color: "#8F4300" }}>
                <th>Sr No</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody style={{ color: "#8F4300" }}>
              {AboutList && AboutList.length > 0 ? (
                AboutList?.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={
                              item?.user_profile_pic
                                ? item?.user_profile_pic
                                : ImportUser
                            } // Assume item.profile_picture contains the URL of the profile picture
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                            }}
                            onError={(ev) => {
                              handleErrorImage(ev);
                            }}
                          />
                        </td>
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
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setAboutadd(false)}>
              Close
            </Button> */}
        </Modal.Footer>
      </Modal>

      {/* </Delete> */}
      <Modal
        show={AboutDeleteModul}
        /* onHide={handleClose} */ centered
        size="lg"
        className="common-model"
      >
        <Modal.Header closeButton onClick={() => setAboutDeleteModule(false)}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setAboutDeleteModule(false)}
          >
            Close
          </Button>
          <Button variant="secondary" onClick={handleDeleteGroup}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyMessages;
