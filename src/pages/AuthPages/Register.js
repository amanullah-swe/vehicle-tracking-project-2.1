import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/images/Web-Application-Logo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../sharedComponent/notify";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate, useLocation } from 'react-router-dom';
import ApiConfig from '../../api/ApiConfig'


// captcha imports 
import ReCAPTCHA from "react-google-recaptcha";
// captcha imports 

// captcha settings 
// const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; this is fake and test key not ment for the production use
const TEST_SITE_KEY = "6LfgrQ0qAAAAAA28AgYPwLtwyAc-Wp5LyAZuVT1_";

const DELAY = 1500;
// captcha settings 



const Register = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [IpData, setIpData] = useState('');
    const [Error, setError] = useState('');
    const [PhoneField, setPhoneField] = useState('');
    const [run_api, set_run_api] = useState(false);
    const [message, set_message] = useState('Something went wrong, try again and fill all the fields.');
    const ref = useRef();
    const [phoneFieldValid, setPhoneFieldValid] = useState(false);
    const [phone_valid, set_phone_valid] = useState(false);
    const [error, set_error] = useState('');
    const handlePhoneChange = (value) => {
        setPhoneField(value);
        const isValid = value.length < 5; // Check if the string length is greater than 5
        setPhoneFieldValid(isValid);
        if (value.length > 5) {
            set_error('')
        } else {
            set_error('Enter Mobile Number')
        }
    };


    const location = useLocation();
    const isInitialMount = useRef(true);

    /*   useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
 
        // Push the current state onto the history stack
        if (true) {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function(event) {
                window.history.go(1);
                // alert("You can't go back from this page.");
            };
        }
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
 
    }, [location]);
 
 
useEffect(()=>{
    // Push the current state onto the history stack
    if (true) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function(event) {
            window.history.go(1);
            // alert("You can't go back from this page.");
        };
    }
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });
}) */

    const [user_data, set_user_data] = useState({
        user_name: '',
        user_mail: '',
        user_password: '',
        user_location: '',
        page_location: 'NA',
        country_name: '',
        city_name: '',
        // user_mobile : '',
        user_message: '',
        user_subject: '',
        inquiry_through: 'NA',
        website_source: 'NA',
        apikey: "7dac0fcac909b349",


    })

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('phoneFieldValid-->', phoneFieldValid)
        // console.log('phone_valid-->', PhoneField.length < 6)
        if (PhoneField.length < 6) {
            set_error('Enter Mobile Number')
        }

        set_phone_valid(true)


        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        }
        setValidated(true);
        if (!phoneFieldValid && PhoneField && user_data?.user_name && user_data?.user_mail && user_data?.user_password) {
            postData2();
            //  run_api && postData(); 
        }
    };
    function onChange(value) {
        console.log("Captcha value:", value);


    }

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();

                // Fetch location data from your API route
                const response = await fetch(`https://api.ipstack.com/${ipData.ip}?access_key=82ef51789ae7b253f10d71b6885bade5`);
                const data = await response.json();
                // console.log('IPdata--->', IpData?.city)
                set_user_data({
                    ...user_data,
                    user_location: IpData?.city
                })
                if (data.error) {
                    setError(data.error);
                    setIpData(null);
                } else {
                    setIpData(data);

                    setError('');
                }
            } catch (err) {
                setError('Failed to fetch IP data');
                setIpData(null);
            }
        };

        fetchUserLocation();
    }, []);

    async function postData() {
        const requestBody = {
            user_name: user_data?.user_name,
            user_mail: user_data?.user_mail,
            user_location: IpData ? IpData?.city : user_data?.user_location,
            page_location: user_data?.page_location,
            // country_name: user_data?.country_name,
            country_name: IpData ? IpData?.country_name : user_data?.country_name,
            user_mobile: PhoneField,
            user_message: user_data?.user_message,
            user_subject: 'VT Customer Registration ',
            inquiry_through: user_data?.inquiry_through,
            website_source: 'vehicletracking.qa',
            apikey: user_data?.apikey,
        };
        try {
            const response = await fetch("https://phonebook.redbytes.in/api/create_email_inquiry/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            //   if (!response.ok) {
            //     throw new Error(`Error: ${response.statusText}`);
            //     notifyError(data?.message)
            //   }

            const data = await response.json();
            //   console.log("Success:", data);
            //   notifySuccess(data?.message)
            //   set_message(data?.message);

            // Handle successful response here (e.g., display success message)
            //   return data;
        } catch (error) {
            //   console.error("Error:", error);
            //   notifyError(error?.message)
            //   notifyError(message)
            // Handle errors here (e.g., display error message)
        }
    }
    async function postData2() {
        const addressParts = [
            IpData?.city || '',
            IpData?.region_name || '',
            IpData?.country_name || 'NA'
        ];

        // Filter out empty strings and join with commas
        const tempCustomerAddress = addressParts.filter(part => part).join(', ');
        const requestBody = {
            temp_customer_name: user_data?.user_name,
            temp_customer_email: user_data?.user_mail,
            temp_customer_city: IpData && IpData?.city ? IpData?.city : user_data?.city_name,

            temp_customer_country: IpData && IpData?.country_name ? IpData?.country_name : 'NA',
            temp_customer_mobile: PhoneField,
            temp_customer_latitude: IpData && IpData?.latitude ? IpData?.latitude : '',
            temp_customer_longitude: IpData && IpData?.longitude ? IpData?.longitude : '',
            temp_customer_password: user_data?.user_password,
            temp_customer_address: tempCustomerAddress,
        };
        try {
            const response = await fetch(ApiConfig.POST_REGISTRATION, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            var data = await response.json();
            /*   if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
                notifyError(data?.message)
            } */


            if (data?.success) {
                set_run_api(true)
                postData();
                //   await postData();  
                notifySuccess(data?.message)
            } else {
                set_run_api(false)
                notifyError(data?.message)

            }

        } catch (error) {
            set_run_api(false)
            console.error("Error:", error);
            notifyError(data?.message)

            // Handle errors here (e.g., display error message)
        }
    }


    // captcha code
    const [callback, setCallback] = useState("not fired");
    const [value, setValue] = useState("[empty]");
    const [load, setLoad] = useState(false);
    const [expired, setExpired] = useState(false);
    const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
    const reCaptchaRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoad(true);
        }, DELAY);

        console.log("didMount - reCaptcha Ref-", reCaptchaRef);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (value) => {
        console.log("Captcha value:", value);
        setValue(value);
        if (value === null) {
            setExpired(true);
            setIsCaptchaChecked(false)
            return;
        }
        setIsCaptchaChecked(true)

    };

    const asyncScriptOnLoad = () => {
        setCallback("called!");
        console.log("scriptLoad - reCaptcha Ref-", reCaptchaRef);
    };


    return (
        <>
            {/* All the styles of this component styles are written in auth scss line number 470 */}
            <div id="registerFile">
                <div className="registerBox">
                    <div className="brandLogo">
                        <img src={logo} height="80" width="200" alt="" />
                    </div>
                    <h1 className="HeadTxt">Business Registration Form</h1>
                    <div className="auth-form">
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className="row">
                                <div className="col-md-6 form_input_main">
                                    <Form.Label className="common-labels">
                                        User Name <span className="red-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your User Name here..."
                                        value={user_data?.user_name}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                user_name: e.target.value,
                                            })

                                        }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please Enter User Name.
                                    </Form.Control.Feedback>
                                </div>

                                {/*  <div className="col-lg-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            Address <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Address"
                                            required
                                            className="text-area"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Address.
                                        </Form.Control.Feedback>
                                    </div> */}
                                {/*   <div className="col-lg-6 ">
                                        <div className="form_input_main">
                                            <Form.Label className="common-labels">
                                                City <span className="red-star">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Country"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Country.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className=" form_input_main select-group">
                                            <Form.Label className="common-labels">
                                                Country <span className="red-star">*</span>
                                            </Form.Label>
                                            <Form.Select
                                                required
                                                as="select"
                                                type="select"
                                                name="Speed_limit"
                                                value={user_data?.country_name} // Define state variable for selected country
                                                onChange={(e)=>{
                                                    set_user_data({
                                                        ...user_data,
                                                        country_name : e.target.value,
                                                    })
        
                                                }}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="50">India</option>
                                                <option value="100">Canada</option>
                                                <option value="150">America</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Enter you Email ID / Mobile Number.
                                            </Form.Control.Feedback>
                                        </div>
                                    </div> */}

                                <div className="col-md-6 form_input_main">
                                    <Form.Label className="common-labels">
                                        Email ID <span className="red-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter you Email ID "
                                        value={user_data?.user_mail}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                user_mail: e.target.value,
                                            })

                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Email.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6 form_input_main">
                                    <Form.Label className="common-labels">
                                        Password <span className="red-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter your Password "
                                        value={user_data?.user_password}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                user_password: e.target.value,
                                            })

                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Password.
                                    </Form.Control.Feedback>
                                </div>

                                <div className="col-md-6 form_input_main">
                                    <Form.Label className="common-labels">
                                        City Name <span className="red-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter User Location here..."
                                        value={IpData?.city /* || user_data?.user_location */}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                user_location: e.target.value,
                                            })

                                        }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please Enter City Name.
                                    </Form.Control.Feedback>
                                </div>
                                {/* <div className= "col-md-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            Page Location <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter page location here..."
                                            value={user_data?.page_location}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    page_location : e.target.value,
                                                })

                                            }}
                                        />
                                
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Page Location.
                                        </Form.Control.Feedback>
                                    </div> */}
                                <div className="col-md-6 form_input_main">
                                    <Form.Label className="common-labels">
                                        Country Name <span className="red-star">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter page location here..."
                                        value={IpData?.country_name || user_data?.country_name}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                country_name: e.target.value,
                                            })

                                        }}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Country Name.
                                    </Form.Control.Feedback>
                                </div>
                                {/*   <div className="col-md-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            Password <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Enter you Email ID "
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Password.
                                        </Form.Control.Feedback>
                                    </div> */}

                                <div className="col-md-6 form_input_main" >
                                    <Form.Label className="common-labels">
                                        Contact Number {/* <span className="red-star">*</span> */}
                                    </Form.Label>
                                    {/* <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter you Email ID "
                                            value={user_data?.user_mobile}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    user_mobile : e.target.value,
                                                })

                                            }}
                                        /> */}

                                    <PhoneInput
                                        country={IpData ? IpData.country_code?.toLowerCase() : ""}
                                        enableSearch={true}
                                        type="text"
                                        id="phonefield"
                                        name="phonefield"

                                        aria-describedby="inputGroupPrepend"
                                        value={PhoneField}
                                        //   onChange={(e) => setPhoneField(e)}
                                        onChange={handlePhoneChange}

                                        placeholder="Phone Number"
                                        //   required
                                        isInvalid={!phoneFieldValid && validated}
                                    />

                                    {/*  { phoneFieldValid && phone_valid  &&  */} <span className=" mt-1" style={{ fontSize: '.875em', color: '#dc3545' }}>{error}</span> {/* } */}

                                    <Form.Control.Feedback type="invalid">
                                        Please Enter your Contact Number.
                                    </Form.Control.Feedback>
                                </div>
                                {/*  <div className="col-md-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            User Subject <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter user subject.. "
                                            value={user_data?.user_subject}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    user_subject : e.target.value,
                                                })

                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter user Subject.
                                        </Form.Control.Feedback>
                                    </div> */}
                                <div className="col-md-12 form_input_main">
                                    <Form.Label className="common-labels">
                                        User Message {/* <span className="red-star">*</span> */}
                                    </Form.Label>
                                    {/* <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter user message.. "
                                            value={user_data?.user_message}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    user_message : e.target.value,
                                                })

                                            }}
                                        /> */}
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter Message"
                                        // required
                                        className="text-area"

                                        value={user_data?.user_message}
                                        onChange={(e) => {
                                            set_user_data({
                                                ...user_data,
                                                user_message: e.target.value,
                                            })

                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter user Message.
                                    </Form.Control.Feedback>
                                </div>
                                {/*    <div className="col-md-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            Inquiry Through <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter ... "
                                            value={user_data?.inquiry_through}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    inquiry_through : e.target.value,
                                                })

                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter user Subject.
                                        </Form.Control.Feedback>
                                    </div>
    */}
                                {/*   <div className="col-md-6 form_input_main select-group">
                                        <Form.Label className="common-labels">
                                            Time Zone. <span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Select
                                            required
                                            as="select"
                                            type="select"
                                            name="Speed_limit"
                                        >
                                            <option value="">Select Timezone</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please Select Timezone.
                                        </Form.Control.Feedback>
                                    </div> */}

                                {/* <div className="col-md-6 form_input_main select-group">
                                        <Form.Label className="common-labels">
                                            Customer Category.
                                        </Form.Label>
                                        <Form.Select
                                            required
                                            as="select"
                                            type="select"
                                            name="Speed_limit"
                                        >
                                            <option value="">
                                                Select Your Category of Business
                                            </option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please Select Your Category of Business.
                                        </Form.Control.Feedback>
                                    </div> */}

                                {/* <div className="col-md-6 form_input_main select-group">
                                        <Form.Label className="common-labels">
                                            Customer Organization Type.
                                        </Form.Label>
                                        <Form.Select
                                            required
                                            as="select"
                                            type="select"
                                            name="Speed_limit"
                                        >
                                            <option value="">Select Organization</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please Select Organization.
                                        </Form.Control.Feedback>
                                    </div> */}

                                {/* <div className="col-md-6 form_input_main select-group">
                                        <Form.Label className="common-labels">
                                            Customer Business Domain name.
                                        </Form.Label>
                                        <Form.Select
                                            required
                                            as="select"
                                            type="select"
                                            name="Speed_limit"
                                        >
                                            <option value="">Select your Business Domain</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="150">150</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please Select your Business Domain.
                                        </Form.Control.Feedback>
                                    </div> */}

                                {/*   <div className="col-md-6 form_input_main">
                                        <Form.Label className="common-labels">
                                            Website Source<span className="red-star">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter website url... "
                                            value={user_data?.website_source}
                                            onChange={(e)=>{
                                                set_user_data({
                                                    ...user_data,
                                                    website_source : e.target.value,
                                                })
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please URL of  website.
                                        </Form.Control.Feedback>
                                    </div> */}
                                {/*  <div className="col-md-3 form_input_main">
                                        <Form.Label className="common-labels">
                                            captcha <span className="red-star">*</span>
                                        </Form.Label>
                                        <div className="capthaParent">
                                            <ReCAPTCHA
                                                ref={ref}
                                                sitekey="Your client site key"
                                                onChange={onChange}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            Please URL of your website.
                                        </Form.Control.Feedback>
                                    </div> */}
                                {/*  <div className="col-md-3 form_input_main">
                                        <Form.Label className="common-labels">
                                        
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            className="mt-2"
                                            placeholder="Type Captcha Here"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please URL of your website.
                                        </Form.Control.Feedback>
                                    </div> */}
                            </div>
                            <div className="mt-3 w-100 mb-2">
                                {load && (
                                    <ReCAPTCHA
                                        // className="w-100"
                                        style={{ display: "inline-block", }}
                                        theme="dark"
                                        ref={reCaptchaRef}
                                        sitekey={TEST_SITE_KEY}
                                        onChange={handleChange}
                                        asyncScriptOnLoad={asyncScriptOnLoad}
                                    />
                                )}
                            </div>






                            <div className="btn-auth">
                                {/* <Link to="/RegistrationLocation"> */}
                                <button type="submit" disabled={!isCaptchaChecked} className="filled-btn" /* onClick={postData} */ >
                                    Save & Proceed
                                </button>
                                {/* </Link> */}

                                <div className="link-style">
                                    <Link to="#">2024 @ Vehicle Tracking</Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
