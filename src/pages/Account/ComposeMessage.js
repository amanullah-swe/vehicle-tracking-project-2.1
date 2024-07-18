import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import ApiConfig from "../../api/ApiConfig";
import { getWithAuthCall, simplePostCall } from "../../api/ApiServices";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import CommonSelect from "../../sharedComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import ImportUser from "../../assets/images/imagesuser.png";
import Loader from "../../sharedComponent/Loader";
import { Select, Space } from "antd";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ComposeMessage = () => {
  const { Option } = Select;

  const navigate = useNavigate();
  const { sidebar, setSidebar, setCreatecompose, Createcompose } = useContext(AppContext);
  const [userName, setUserName] = useState([]);
  console.log("userName",userName);
  const [userId, setUserID] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, set_loading] = useState(false);
  const [userType, setUserType] = useState([]);
  const [AddAccessry, setAddAccessry] = useState({
    to_id: "",
    subject: "",
    content: "",
  });
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      AddCommpose(event);
    }

    setValidated(true);
  };

  const AddCommpose = (e) => {
    e.preventDefault();
    let newRequestBody = JSON.stringify({
      to_id: Createcompose ==="Chat"? [userName] :userName,
      subject: AddAccessry.subject,
      content: AddAccessry.content,
      isGroup:Createcompose ==="Chat"? false : true
    });
set_loading(true);
    simplePostCall(ApiConfig.COMPOSE_MESSAGE_ADD, newRequestBody)
      .then((res) => {
        if (res.result) {
          console.log("result >>>>",res)
          notifySuccess(res.message);
          navigate(`/MyMessages/${res?.data?.thread_users_thread_id ?? res?.data?.message_thread_id}`);
          setCreatecompose("All")
        } else {
          notifyError(res.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        set_loading(false);
      })
  };

  useEffect(() => {
    geVehicalList();
  }, []);

  function geVehicalList() {
    getWithAuthCall(ApiConfig.USERS_LIST)
      .then((data) => {
        setUserType(data.user_details);
      })
      .catch((error) => {
        console.log("api response", error);
      });
  }
  const { t, i18n } = useTranslation();
  const handleErrorImage = (ev) => {
    ev.target.src = ImportUser;
  };
  return (
    <main className={sidebar ? "taskMain " : "cx-active taskMain"} id="cx-main">

{loading ? <Loader/> : (

      <div id="cx-wrapper" className="ComposeMessage">
        <div className="main-master-wrapper">
          <div className="Heading">
            <p>{t("Compose Message")}</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="innerInputsGen mainVehAccident ">
              <div className="insideInpts">
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 form_input_main">
                    <div className="innerSelectBox weekCounter">
                      <Form.Label className="common-labels">
                        {t("User")}
                      </Form.Label>
                      {/* <Form.Select as="select" type="select" name="Speed_limit">
                      <option value="">Select Person...</option>
                      <option value="0">Person1</option>
                      <option value="1">Person2</option>
                      <option value="2">Person3</option>
                    </Form.Select> */}
                     




                      <Select
                      mode={Createcompose === "Chat"? "single ":"multiple"} // Enable multiple selection
                      style={{
                        width: "95%",
                        color: "rgba(156, 73, 0, 0.5)",
                      }}
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) =>
                        
                        option.label?.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      // placeholder={`Groups (${groupVehicleList?.length})`}
                      placehold={t("Select")}

                      key={"selectedGroupData"}
                      onChange={(selectedValues) => {
                 
                        setUserName(selectedValues);
                        setUserID(selectedValues);
                      }}
                      value={userName}
                      optionLabelProp="label"
                      
                    >
                      {userType?.map((data, index) => (

                        <Option
                          key={data?.user_id}
                          value={data?.user_id}
                          label={data?.user_name}
                          style={{ color: "rgba(156, 73, 0)" }}
                        >
                          <Space >
                            <div className="d-flex justify-content-start align-items-center" >
                          <img
              src={data?.user_profile_pic ? data?.user_profile_pic : ImportUser } // Assume data.profile_picture contains the URL of the profile picture
              // Assume data.profile_picture contains the URL of the profile picture
              // src='https://s3.us-east-2.amazonaws.com/app.vehicletracking.qa/uploads/1000/merchant/1707110309092.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQFXUSQH2O4Z7SRTJ%2F20240527%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240527T132715Z&X-Amz-Expires=600&X-Amz-Signature=669cd78787bf49984ab1ff987b33b87ea60053844f72cc43460961a32a18b44c&X-Amz-SignedHeaders=host&response-content-disposition=inline&response-content-type=image%2Fpng&x-id=GetObject' // Assume data.profile_picture contains the URL of the profile picture
              // src='https://images.unsplash.com/photo-1533450718592-29d45635f0a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Assume data.profile_picture contains the URL of the profile picture
              // alt={data.user_name}
              style={{ width: 30, height: 30, borderRadius: '50%' }}
              onError={(ev) => {
                handleErrorImage(
                  ev
                );
              }}
            />
            {console.log('data?.user_profile_pic-->', data?.user_profile_pic)}
                            <span className="ms-2"
                              role="group"
                              aria-label={data.user_id}
                            >
                              {data.user_name}
                            </span>
                            </div>
                          </Space>
                        </Option>
                      ))}
                    </Select>




                    </div>
                  </div>
                  {Createcompose === "Chat" ? <></> :<>
                  <div className="select_vehicle_icon col-lg-6 col-md-12 col-sm-12 form_input_main">
                    <Form.Label className="common-labels" For="file">
                      Group name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Group name..."
                      onChange={(e) => {
                        setAddAccessry({
                          ...AddAccessry,
                          subject: e.target.value,
                        });
                      }}
                    />
                  </div>
                  
                  </>}
                  
                  {/* <div className="col-lg-12 col-md-12 col-sm-12 form_input_main">
                    <Form.Label className="common-labels" For="file">
                      {t("Content")}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder={t("Type Your Message...")}
                      onChange={(e) => {
                        setAddAccessry({
                          ...AddAccessry,
                          content: e.target.value,
                        });
                      }}
                    />
                  </div> */}
                </div>
              </div>
              {/* Two Bottom Buttons */}
              <div className="d-flex justify-content-end align-items-center btn-wrapper">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/MyMessages");
                  }}
                  class="cx-btn-1"
                >
                  {t("Cancel")}
                </button>
                <button type="submit" class="cx-btn-2">
                  {t("Submit")}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      )}
    </main>
  );
};

export default ComposeMessage;
