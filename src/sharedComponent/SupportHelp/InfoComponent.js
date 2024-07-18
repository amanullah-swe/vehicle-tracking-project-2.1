import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ic_info from "../../assets/images/ic_info.svg";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import redCar from "../../assets/images/red-car-map.svg";
import Accordion from "react-bootstrap/Accordion";
import VehicleG from "../../assets/images/vehicle-green.svg";
import VehicleR from "../../assets/images/vehicle-red.svg";
import route from "../../assets/images/route.svg";
import tool from "../../assets/images/tool.svg";
import customer from "../../assets/images/customer.svg";
import running from "../../assets/images/running.svg";
import parked from "../../assets/images/parked.svg";
import untracked from "../../assets/images/untracked.svg";
import idle from "../../assets/images/idle.svg";
import { useNavigate } from "react-router-dom";
const InfoComponent = () => {
  const navigate = useNavigate();
  const { help_setting_disable, set_help_setting_disable} = useContext(AppContext);
  const handleClose = () => setInfoOpen(false);
  const handleShow = () => setInfoOpen(true);
  const { t, i18n } = useTranslation();
  const { sidebar, infoOpen, setInfoOpen } = useContext(AppContext);
  const currentRoute = useLocation().pathname;
 
  const infoArray = [
    {
      route: "/Dashboard",

      parent: [
        {
          title: t("Dashboard information"),

          description: "",
        },
        {
          title: t("Dashboard information 252898259"),
          description: t("Dashboard Dashboard 75757 Dashboard."),
          img: redCar,
        },
      ],
    },

    {
      route: "/CustomerProfile",

      parent: [
        {
          title: t("profile customer"),
          description: t("CustomerProfile CustomerProfile CustomerProfile."),
        },
      ],
    },
  ];


 const handleDisableHelp = () => {
  // Navigate to the other page
  setInfoOpen(!infoOpen)
  navigate("/GeneralSetting");
  sessionStorage.setItem('t_help_disable', '1')

 }

  return (
   
    <div className="wrapper-info-main">
 { help_setting_disable === 1 ? (<button className="info-btns" onClick={() => setInfoOpen(!infoOpen)}>
        <img src={ic_info} alt="" className="h-40 w-40" />
      </button>  ) : null }

 
      

      <div>
        <Offcanvas
          show={infoOpen}
          onHide={handleClose}
          placement="end"
          className="main-info-wrapper"
        >
         
  <button className="info-btns" onClick={() => setInfoOpen(!infoOpen)}>
    <img src={ic_info} alt="" />
  </button>

         

          <Offcanvas.Body>
            <div className="body-wrapper">
              {(currentRoute ==="/dashboard" || currentRoute ==="/dashboard" ) && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                  {t("Welcome to the Dashboard help module! Here, we'll guide you through the various features and functions available on the dashboard of our software.")}  
                  </p>
                  <p className="help-head-sub">{t("Location Overview:")}</p>
                  <p className="help-paragraph">
                  {t("On the dashboard, you'll find five different kinds of icons representing vehicles:")}  
                  </p>
                  <ul className="help-ol-list mt-2">
                    <li>
                      <img src={customer} alt="" />{t("Customer")}{" "}
                    </li>
                    <li>
                      <img src={running} alt="" />{t("Running")} {" "}
                    </li>
                    <li>
                      <img src={parked} alt="" />{t("Parked")} {" "}
                    </li>
                    <li>
                      <img src={untracked} alt="" />{t("Untracked")} {" "}
                    </li>
                    <li>
                      <img src={idle} alt="" />{t("Idle")} 
                    </li>
                  </ul>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                     {t("Viewing and Searching Vehicles on the Live Map")}   
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                       {t("You can view and search for vehicles based on their colors and groups on the live map. The map allows you to zoom in, zoom out, and even go full screen. Simply click on the desired vehicle on the map to view its status, temperature, last signal received, and last seen location. Additionally, you can access more details by clicking on dots representing the vehicle. These details include options such as track, playback, geofence, alerts, and sharing.")}   
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{t("Groups")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("To manage and organize your vehicles, you'll find a groups dropdown menu. Here, you can select specific vehicle groups to filter the displayed data.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>{t("Vehicle")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("The vehicle dropdown menu allows you to select individual vehicles from the available list.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>{t("Status")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                       {t("Using the status dropdown, you can filter vehicles based on their status, such as running, idle, or parked.")}   
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <img src={VehicleG} alt="" className="ms-4" />
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                        {t("Clicking on a green vehicle icon will show you information about running vehicles, idle vehicles, and parked vehicles.")}  
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        <img src={VehicleR} alt="" className="ms-4" />
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("Clicking on a red vehicle icon will display information about currently untracked and not yet tracked vehicles.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                      <Accordion.Header>
                        <img src={route} alt="" className="ms-4" />
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("By clicking on a yellow vehicle icon, you can access information about scheduled trips and dispatched trips. Clicking on a specific trip provides options to share the trip, track its location, show it on the map, view device and vehicle details, access trip details, and edit trips.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                      <Accordion.Header>
                        <img src={tool} alt="" className="ms-4" />
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          {t("Clicking on the tools icon will open a menu where you can find various useful tools, including the ability to find a specific vehicle, set boundaries, and check traffic information. We hope this guide helps you navigate and utilize the different features available on the dashboard of our software. If you have any further questions or need additional assistance, feel free to reach out to our support team.")}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )}

              {currentRoute === "/CustomerProfile" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                   {t("Customer Settings provides you with the necessary information to manage and customize your customer settings effectively.")} 
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("Profile")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("In the Profile section, you can view your profile information. You also have the option to update your profile details and upload a new logo if needed.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{t("Contact Information")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("Here, you can manage your contact information. Update your email address, phone number.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>{t("General Information")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("This section allows you to modify general information related to your account. You can update your Address, City, Country, Currency, Timezone, Website, and status.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>{t("Subscribe Information")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("Manage your subscription information in this section. You can review your Plancurrent subscription plan, Account type, and Expiry date.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>{t("Server Information")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("Access and update your server information in this section. You can modify server settings, including ports and IP.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>{t("API Information")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                         {t("Here, you can find and manage your API information. You can view Customer ID, and API Key which are essential for integrating our software with other systems or applications.")} 
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
  <Accordion.Header>{t("List of Transport Managers")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph">
      {t(
        "View a list of your transport managers. Clicking on 'View All' will display all the transport managers associated with your account."
      )}
    </p>
  </Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="7">
  <Accordion.Header>{t("List of Vehicles")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph">
      {t(
        "Access a comprehensive list of your vehicles. Clicking on 'View All' will display all the vehicles linked to your account."
      )}
    </p>
  </Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="8">
  <Accordion.Header>{t("Map")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph">
      {t(
        "Utilize the map functionality to mark zones or areas. You can mark areas by drawing freehand, or selecting by square, or by a circle. Furthermore, you have the ability to edit or delete existing marks on the Google Map."
      )}
    </p>
  </Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="9">
  <Accordion.Header>{t("Application Statistics")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph">
      {t(
        "This section provides you with application statistics. You can view relevant data and metrics related to the usage and performance of the software."
      )}
    </p>
    <p className="help-paragraph mt-2">
      {t(
        "We hope this guide helps you navigate and utilize the various features available in the Customer Settings module. If you have any further questions or need additional assistance, feel free to reach out to our support team."
      )}
    </p>
  </Accordion.Body>
</Accordion.Item>

                  </Accordion>
                </div>
              )}

              {/* {currentRoute === "/GeneralSetting" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about various settings and options available in the
                    software. We have organized them into different categories
                    for easy navigation. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Settings</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">Working Days:</p>
                        <p className="help-paragraph mb-2">
                          You can customize the working days by toggling the
                          on/off switches for Monday, Tuesday, Wednesday,
                          Thursday, Friday, and Saturday.
                        </p>
                        <p className="heading-list">Speed Limit:</p>
                        <p className="help-paragraph mb-2">
                          Choose your preferred speed limit from the dropdown
                          menu.
                        </p>
                        <p className="heading-list">
                          Customer Geofence Radius (meter):
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the desired radius for customer geofences from
                          the dropdown.
                        </p>
                        <p className="heading-list">
                          Pickup Point Geofence Radius (meter):
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose the radius for pickup point geofences from the
                          dropdown.
                        </p>
                        <p className="heading-list">
                          Transportation Geofence (KM):
                        </p>
                        <p className="help-paragraph mb-2">
                          Set the transportation geofence radius by selecting an
                          option from the dropdown.
                        </p>
                        <p className="heading-list">Data Records per Page:</p>
                        <p className="help-paragraph mb-2">
                          Customize the number of records displayed per page
                          using the dropdown.
                        </p>
                        <p className="heading-list">Date Format:</p>
                        <p className="help-paragraph mb-2">
                          Select your preferred date format from the dropdown.
                        </p>
                        <p className="heading-list">
                          Duration to Consider Vehicle as Untracked (Minute):
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose the duration threshold, in minutes, for
                          considering a vehicle as untracked from the dropdown.
                        </p>
                        <p className="heading-list">
                          Duration to Consider Vehicle as Idle (Parked):
                        </p>
                        <p className="help-paragraph mb-2">
                          Set the duration threshold, in minutes, for
                          considering a vehicle as idle from the dropdown.
                        </p>
                        <p className="heading-list">Acceleration Threshold:</p>
                        <p className="help-paragraph mb-2">
                          Customize the acceleration threshold by selecting an
                          option from the dropdown.
                        </p>
                        <p className="heading-list">Deceleration Threshold:</p>
                        <p className="help-paragraph mb-2">
                          Choose the deceleration threshold from the dropdown.
                        </p>
                        <p className="heading-list">Historical Movement Map:</p>
                        <p className="help-paragraph mb-2">
                          Select the desired option from the dropdown to view
                          historical movement on the map.
                        </p>
                        <p className="heading-list">
                          Minutes to Consider Trip Historical Movement:
                        </p>
                        <p className="help-paragraph mb-2">
                          Set the duration, in minutes, to consider the trip
                          historical movement from the dropdown.
                        </p>
                        <p className="heading-list">
                          Show Vehicle Label in Google Map:
                        </p>
                        <p className="help-paragraph mb-2">
                          Toggle this switch to display vehicle labels on the
                          Google Map.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Automation Settings</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">
                          Automation Data Collection:
                        </p>
                        <p className="help-paragraph mb-2">
                          Enable or disable automatic data collection by
                          toggling the on/off switch. You can also specify the
                          number of suggestions or anomaly counts by entering
                          them in the text box.
                        </p>
                        <p className="heading-list">
                          Automation Data Optimization:
                        </p>
                        <p className="help-paragraph mb-2">
                          Toggle this switch to optimize data automatically.
                          Specify the minimum number of vehicles in an area to
                          consider it as a parking slot in the text box.
                        </p>
                        <p className="heading-list">Automation Data Update:</p>
                        <p className="help-paragraph mb-2">
                          Toggle this switch to update data automatically.
                          Specify the maximum radius for parking slot creation
                          in the text box.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Help Settings</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          Toggle this switch to enable or disable the help
                          setting.
                        </p>
                        <p className="help-paragraph mt-2">
                          We hope this information helps you navigate and
                          customize the software settings according to your
                          preferences. If you have any further questions, feel
                          free to reach out to our support team for assistance.
                          Happy exploring
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/GeneralSetting" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about various settings and options available in the software. We have organized them into different categories for easy navigation. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Settings")}</Accordion.Header>
        <Accordion.Body>
          <p className="heading-list">{t("Working Days:")}</p>
          <p className="help-paragraph mb-2">
            {t("You can customize the working days by toggling the on/off switches for Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday.")}
          </p>
          <p className="heading-list">{t("Speed Limit:")}</p>
          <p className="help-paragraph mb-2">
            {t("Choose your preferred speed limit from the dropdown menu.")}
          </p>
          <p className="heading-list">{t("Customer Geofence Radius (meter):")}</p>
          <p className="help-paragraph mb-2">
            {t("Select the desired radius for customer geofences from the dropdown.")}
          </p>
          <p className="heading-list">{t("Pickup Point Geofence Radius (meter):")}</p>
          <p className="help-paragraph mb-2">
            {t("Choose the radius for pickup point geofences from the dropdown.")}
          </p>
          <p className="heading-list">{t("Transportation Geofence (KM):")}</p>
          <p className="help-paragraph mb-2">
            {t("Set the transportation geofence radius by selecting an option from the dropdown.")}
          </p>
          <p className="heading-list">{t("Data Records per Page:")}</p>
          <p className="help-paragraph mb-2">
            {t("Customize the number of records displayed per page using the dropdown.")}
          </p>
          <p className="heading-list">{t("Date Format:")}</p>
          <p className="help-paragraph mb-2">
            {t("Select your preferred date format from the dropdown.")}
          </p>
          <p className="heading-list">{t("Duration to Consider Vehicle as Untracked (Minute):")}</p>
          <p className="help-paragraph mb-2">
            {t("Choose the duration threshold, in minutes, for considering a vehicle as untracked from the dropdown.")}
          </p>
          <p className="heading-list">{t("Duration to Consider Vehicle as Idle (Parked):")}</p>
          <p className="help-paragraph mb-2">
            {t("Set the duration threshold, in minutes, for considering a vehicle as idle from the dropdown.")}
          </p>
          <p className="heading-list">{t("Acceleration Threshold:")}</p>
          <p className="help-paragraph mb-2">
            {t("Customize the acceleration threshold by selecting an option from the dropdown.")}
          </p>
          <p className="heading-list">{t("Deceleration Threshold:")}</p>
          <p className="help-paragraph mb-2">
            {t("Choose the deceleration threshold from the dropdown.")}
          </p>
          <p className="heading-list">{t("Historical Movement Map:")}</p>
          <p className="help-paragraph mb-2">
            {t("Select the desired option from the dropdown to view historical movement on the map.")}
          </p>
          <p className="heading-list">{t("Minutes to Consider Trip Historical Movement:")}</p>
          <p className="help-paragraph mb-2">
            {t("Set the duration, in minutes, to consider the trip historical movement from the dropdown.")}
          </p>
          <p className="heading-list">{t("Show Vehicle Label in Google Map:")}</p>
          <p className="help-paragraph mb-2">
            {t("Toggle this switch to display vehicle labels on the Google Map.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Automation Settings")}</Accordion.Header>
        <Accordion.Body>
          <p className="heading-list">{t("Automation Data Collection:")}</p>
          <p className="help-paragraph mb-2">
            {t("Enable or disable automatic data collection by toggling the on/off switch. You can also specify the number of suggestions or anomaly counts by entering them in the text box.")}
          </p>
          <p className="heading-list">{t("Automation Data Optimization:")}</p>
          <p className="help-paragraph mb-2">
            {t("Toggle this switch to optimize data automatically. Specify the minimum number of vehicles in an area to consider it as a parking slot in the text box.")}
          </p>
          <p className="heading-list">{t("Automation Data Update:")}</p>
          <p className="help-paragraph mb-2">
            {t("Toggle this switch to update data automatically. Specify the maximum radius for parking slot creation in the text box.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Help Settings")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("Toggle this switch to enable or disable the help setting.")}
          </p>
          <p className="help-paragraph mt-2">
            {t("We hope this information helps you navigate and customize the software settings according to your preferences. If you have any further questions, feel free to reach out to our support team for assistance. Happy exploring")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}

            {/*   {currentRoute === "/IntegrationSetting" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Integration Settings available in the software.
                    These settings allow you to configure the SMS Gateway for
                    sending messages. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        SMS Gateway Toggle (On/Off)
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list mb-2">
                          Toggle this switch to enable or disable the SMS
                          Gateway functionality. When enabled, you can perform
                          the following actions:
                        </p>
                        <p className="heading-list">Recharge:</p>
                        <p className="help-paragraph mb-2">
                          Clicking on this option will redirect you to the
                          payment integration page where you can recharge your
                          SMS Gateway account.
                        </p>
                        <p className="heading-list">Available Messages:</p>
                        <p className="help-paragraph mb-2">
                          View the number of available messages in your account.
                        </p>
                        <p className="heading-list">Account Information:</p>
                        <p className="help-paragraph mb-2">
                          Get an overview of your SMS Gateway account.
                        </p>
                        <p className="heading-list">SMS Gateway Status ID:</p>
                        <p className="help-paragraph mb-2">
                          View the status ID of your SMS Gateway.
                        </p>
                        <p className="heading-list">Balance:</p>
                        <p className="help-paragraph mb-2">
                          Check the balance of your SMS Gateway account.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>SMS Gateway ID</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          Select your SMS Gateway ID from the dropdown menu.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>SMS Gateway Username</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          Enter your SMS Gateway username in the provided
                          textbox.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>SMS Gateway Password</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          Enter your SMS Gateway password in the provided
                          textbox.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>SMS Gateway Sender ID</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          Specify your desired Sender ID for outgoing messages
                          by entering it in the provided textbox.
                        </p>
                        <p className="help-paragraph">
                          By configuring these Integration Settings, you can
                          effectively use the SMS Gateway feature to send
                          messages. If you encounter any issues or have further
                          questions, please don't hesitate to reach out to our
                          support team. They will be happy to assist you.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/IntegrationSetting" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Integration Settings available in the software. These settings allow you to configure the SMS Gateway for sending messages. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("SMS Gateway Toggle (On/Off)")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="heading-list mb-2">
            {t("Toggle this switch to enable or disable the SMS Gateway functionality. When enabled, you can perform the following actions:")}
          </p>
          <p className="heading-list">{t("Recharge:")}</p>
          <p className="help-paragraph mb-2">
            {t("Clicking on this option will redirect you to the payment integration page where you can recharge your SMS Gateway account.")}
          </p>
          <p className="heading-list">{t("Available Messages:")}</p>
          <p className="help-paragraph mb-2">
            {t("View the number of available messages in your account.")}
          </p>
          <p className="heading-list">{t("Account Information:")}</p>
          <p className="help-paragraph mb-2">
            {t("Get an overview of your SMS Gateway account.")}
          </p>
          <p className="heading-list">{t("SMS Gateway Status ID:")}</p>
          <p className="help-paragraph mb-2">
            {t("View the status ID of your SMS Gateway.")}
          </p>
          <p className="heading-list">{t("Balance:")}</p>
          <p className="help-paragraph mb-2">
            {t("Check the balance of your SMS Gateway account.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("SMS Gateway ID")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("Select your SMS Gateway ID from the dropdown menu.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("SMS Gateway Username")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("Enter your SMS Gateway username in the provided textbox.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("SMS Gateway Password")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("Enter your SMS Gateway password in the provided textbox.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>{t("SMS Gateway Sender ID")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("Specify your desired Sender ID for outgoing messages by entering it in the provided textbox.")}
          </p>
          <p className="help-paragraph">
            {t("By configuring these Integration Settings, you can effectively use the SMS Gateway feature to send messages. If you encounter any issues or have further questions, please don't hesitate to reach out to our support team. They will be happy to assist you.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


             {/*  {currentRoute === "/TransportationSetting" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-head-sub">Map</p>
                  <p className="help-paragraph mt-2">
                    Utilize the map functionality to mark zones or areas. You
                    can mark areas by drawing freehand,or selecting by square,
                    or by a circle. Furthermore, you have the ability to edit or
                    delete existing marks on the Google Map.
                  </p>
                </div>
              )} */}
              {currentRoute === "/TransportationSetting" && (
  <div className="" id="help-main-wrapper">
    <p className="help-head-sub">{t("Map")}</p>
    <p className="help-paragraph mt-2">
      {t("Utilize the map functionality to mark zones or areas. You can mark areas by drawing freehand,or selecting by square, or by a circle. Furthermore, you have the ability to edit or delete existing marks on the Google Map.")}
    </p>
  </div>
)}

             {/*  {currentRoute === "/NotificationSetting" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Notification Settings available in the software.
                    These settings allow you to configure notifications for
                    various events and activities. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Notification Table</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">
                          Notification Related Announcements:
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose your preferred method of notification (Push
                          notification, email, or SMS) for receiving
                          announcements.
                        </p>
                        <p className="heading-list">
                          Notification Related Holidays & Vacation:
                        </p>
                        <p className="help-paragraph mb-2">
                          Select how you would like to receive notifications
                          (Push notification, email, or SMS) for holiday and
                          vacation-related information.
                        </p>
                        <p className="heading-list">
                          Notification Related Pickup Points:
                        </p>
                        <p className="help-paragraph mb-2">
                          Configure your notification preferences (Push
                          notification, email, or SMS) for updates related to
                          pickup points.
                        </p>
                        <p className="heading-list">
                          Notify When Vehicle Breaks Speed Limit:
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the notification method (Push notification,
                          email, or SMS) for receiving alerts when a vehicle
                          exceeds the speed limit.
                        </p>
                        <p className="heading-list">
                          Notify When Vehicle Breaks Geofence Boundary:
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose how you want to be notified (Push notification,
                          email, or SMS) when a vehicle crosses the geofence
                          boundary.
                        </p>
                        <p className="heading-list">
                          Notify When Vehicle Tracker External Power is On:
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the desired method of notification (Push
                          notification, email, or SMS) for being alerted when
                          the vehicle tracker's external power is turned on.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Vehicle Related Notification Setting
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">
                          Vehicle Maintenance Notification (Prior Mileage):
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the mileage threshold from the dropdown to
                          receive maintenance notifications.
                        </p>
                        <p className="heading-list">
                          Vehicle Maintenance Notification (Prior Days):
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose the number of days in advance from the dropdown
                          to receive maintenance notifications.
                        </p>
                        <p className="heading-list">
                          Notification of Vehicle Insurance Expiry (Prior Day):
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the number of days in advance from the dropdown
                          to receive alerts about upcoming vehicle insurance
                          expirations.
                        </p>
                        <p className="heading-list">
                          {" "}
                          Notification of Vehicle Permit Expiry (Prior Day):
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose the number of days in advance from the dropdown
                          to receive notifications regarding upcoming vehicle
                          permit expirations.
                        </p>
                        <p className="heading-list">
                          Vehicle Tax Expiry Notification (Prior Day):
                        </p>
                        <p className="help-paragraph mb-2">
                          Select the number of days in advance from the dropdown
                          to receive alerts about upcoming vehicle tax
                          expirations.
                        </p>
                        <p className="heading-list">
                          Notification of Vehicle Next Inspection Date (Prior
                          Day):
                        </p>
                        <p className="help-paragraph mb-2">
                          Choose the number of days in advance from the dropdown
                          to receive notifications about upcoming vehicle
                          inspection dates.
                        </p>

                        <p className="help-paragraph ">
                          By customizing these Notification Settings, you can
                          stay informed about important events and activities
                          related to your vehicles. If you have any questions or
                          need further assistance, please reach out to our
                          support team. They will be glad to help you
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/NotificationSetting" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Notification Settings available in the software. These settings allow you to configure notifications for various events and activities. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Notification Table")}</Accordion.Header>
        <Accordion.Body>
          <p className="heading-list">
            {t("Notification Related Announcements:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Choose your preferred method of notification (Push notification, email, or SMS) for receiving announcements.")}
          </p>
          <p className="heading-list">
            {t("Notification Related Holidays & Vacation:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select how you would like to receive notifications (Push notification, email, or SMS) for holiday and vacation-related information.")}
          </p>
          <p className="heading-list">
            {t("Notification Related Pickup Points:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Configure your notification preferences (Push notification, email, or SMS) for updates related to pickup points.")}
          </p>
          <p className="heading-list">
            {t("Notify When Vehicle Breaks Speed Limit:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select the notification method (Push notification, email, or SMS) for receiving alerts when a vehicle exceeds the speed limit.")}
          </p>
          <p className="heading-list">
            {t("Notify When Vehicle Breaks Geofence Boundary:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Choose how you want to be notified (Push notification, email, or SMS) when a vehicle crosses the geofence boundary.")}
          </p>
          <p className="heading-list">
            {t("Notify When Vehicle Tracker External Power is On:")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select the desired method of notification (Push notification, email, or SMS) for being alerted when the vehicle tracker's external power is turned on.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          {t("Vehicle Related Notification Setting")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="heading-list">
            {t("Vehicle Maintenance Notification (Prior Mileage):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select the mileage threshold from the dropdown to receive maintenance notifications.")}
          </p>
          <p className="heading-list">
            {t("Vehicle Maintenance Notification (Prior Days):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Choose the number of days in advance from the dropdown to receive maintenance notifications.")}
          </p>
          <p className="heading-list">
            {t("Notification of Vehicle Insurance Expiry (Prior Day):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select the number of days in advance from the dropdown to receive alerts about upcoming vehicle insurance expirations.")}
          </p>
          <p className="heading-list">
            {t("Notification of Vehicle Permit Expiry (Prior Day):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Choose the number of days in advance from the dropdown to receive notifications regarding upcoming vehicle permit expirations.")}
          </p>
          <p className="heading-list">
            {t("Vehicle Tax Expiry Notification (Prior Day):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Select the number of days in advance from the dropdown to receive alerts about upcoming vehicle tax expirations.")}
          </p>
          <p className="heading-list">
            {t("Notification of Vehicle Next Inspection Date (Prior Day):")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Choose the number of days in advance from the dropdown to receive notifications about upcoming vehicle inspection dates.")}
          </p>

          <p className="help-paragraph ">
            {t("By customizing these Notification Settings, you can stay informed about important events and activities related to your vehicles. If you have any questions or need further assistance, please reach out to our support team. They will be glad to help you")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}

            {/*   {currentRoute === "/DispatchSetting" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Dispatch Settings available in the software. These
                    settings allow you to configure dispatch-related options for
                    efficient trip planning. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Dispatch Auto Routing Type
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Select the desired auto routing type from the dropdown
                          menu. This option determines how the system
                          automatically routes trips for optimal efficiency.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Select Dispatch Trip Days
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Customize the days for dispatching trips by toggling
                          the on/off switches for Monday, Tuesday, Wednesday,
                          Thursday, Friday, and Saturday. Enable the switches
                          for the specific days you want to include for trip
                          dispatch.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Periodic Trip Times</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          Choose the periodic trip times by selecting options
                          from the dropdown menu. You can add multiple times by
                          clicking the "Add" button, and the added times will be
                          displayed below the listing.
                        </p>
                        <p className="help-paragraph">
                          By configuring these Dispatch Settings, you can
                          optimize the routing of trips and customize the days
                          and times for dispatching trips according to your
                          specific requirements. If you have any questions or
                          need further assistance, please don't hesitate to
                          reach out to our support team. They will be happy to
                          help you.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/DispatchSetting" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Dispatch Settings available in the software. These settings allow you to configure dispatch-related options for efficient trip planning. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Dispatch Auto Routing Type")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("Select the desired auto routing type from the dropdown menu. This option determines how the system automatically routes trips for optimal efficiency.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          {t("Select Dispatch Trip Days")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("Customize the days for dispatching trips by toggling the on/off switches for Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday. Enable the switches for the specific days you want to include for trip dispatch.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          {t("Periodic Trip Times")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("Choose the periodic trip times by selecting options from the dropdown menu. You can add multiple times by clicking the 'Add' button, and the added times will be displayed below the listing.")}
          </p>
          <p className="help-paragraph">
            {t("By configuring these Dispatch Settings, you can optimize the routing of trips and customize the days and times for dispatching trips according to your specific requirements. If you have any questions or need further assistance, please don't hesitate to reach out to our support team. They will be happy to help you.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}




            {/*   {currentRoute === "/AcessRole" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Access Rights settings available in the software.
                  </p>

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Access Rights</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          These settings allow you to manage user roles and
                          their corresponding access to specific features. Let's
                          explore!
                        </p>
                        <p className="heading-list">User Role:</p>
                        <p className="help-paragraph mb-2">
                          Click on the "User Role" option to view a list of
                          existing roles. This list displays the role name,
                          Features, and available actions such as editing and
                          deleting.
                        </p>
                        <p className="heading-list">Create Role:</p>
                        <p className="help-paragraph mb-2">
                          To create a new role, click on the "Create Role"
                          button located on the right side of the screen. You
                          can select a role from the dropdown menu and proceed
                          with creating the role.
                        </p>

                        <p className="help-paragraph mb-2">
                          By using these features, you can manage user roles and
                          their access to different features within the
                          software. This allows you to control the level of
                          access and permissions for each role based on their
                          responsibilities and requirements.
                        </p>

                        <p className="help-paragraph mb-2">
                          If you have any questions or need further assistance
                          regarding Access Rights or managing user roles, please
                          don't hesitate to reach out to our support team. They
                          will be happy to assist you.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/AccessRight" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Access Rights settings available in the software.")}
    </p>

    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Access Rights")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("These settings allow you to manage user roles and their corresponding access to specific features. Let's explore!")}
          </p>
          <p className="heading-list">{t("User Role")}:</p>
          <p className="help-paragraph mb-2">
            {t("Click on the 'User Role' option to view a list of existing roles. This list displays the role name, Features, and available actions such as editing and deleting.")}
          </p>
          <p className="heading-list">{t("Create Role")}:</p>
          <p className="help-paragraph mb-2">
            {t("To create a new role, click on the 'Create Role' button located on the right side of the screen. You can select a role from the dropdown menu and proceed with creating the role.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("By using these features, you can manage user roles and their access to different features within the software. This allows you to control the level of access and permissions for each role based on their responsibilities and requirements.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("If you have any questions or need further assistance regarding Access Rights or managing user roles, please don't hesitate to reach out to our support team. They will be happy to assist you.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


              {/* {currentRoute === "/AddOnSettings" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Add-on Settings available in the software. These
                    settings allow you to enhance your web application by adding
                    various add-ons. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>My Add-ons</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          In this section, you can view all the add-ons that you
                          currently have and are actively using in your
                          Software. This provides an overview of the add-ons you
                          have.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Premium Add-ons</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Browse through the premium add-ons available for
                          purchase. You can explore the different options and
                          add the desired add-ons to your cart by clicking the
                          "Add to Cart" button.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Free Add-ons</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Here, you can find all the add-ons that are available
                          for free. You can view the list of free add-ons and
                          activate them as per your requirements.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Add to Cart</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          In the "Add to Cart" section, you can view the list of
                          add-ons that you have added. You have the option to
                          delete any unwanted add-ons from the cart. The total
                          value of the cart is displayed, and by clicking the
                          "Checkout Now" button, you will be redirected to the
                          payment integration to complete the purchase.
                        </p>
                        <p className="help-paragraph ">
                          By utilizing these Add-on Settings, you can enhance
                          the functionality and features of your Software by
                          adding premium or free add-ons. If you have any
                          questions or need further assistance regarding the
                          Add-on Settings or the installation process, please
                          feel free to contact our support team. They will be
                          delighted to assist you.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/AddOnSettings" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Add-on Settings available in the software. These settings allow you to enhance your web application by adding various add-ons. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("My Add-ons")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("In this section, you can view all the add-ons that you currently have and are actively using in your Software. This provides an overview of the add-ons you have.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Premium Add-ons")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("Browse through the premium add-ons available for purchase. You can explore the different options and add the desired add-ons to your cart by clicking the 'Add to Cart' button.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Free Add-ons")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("Here, you can find all the add-ons that are available for free. You can view the list of free add-ons and activate them as per your requirements.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("Add to Cart")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("In the 'Add to Cart' section, you can view the list of add-ons that you have added. You have the option to delete any unwanted add-ons from the cart. The total value of the cart is displayed, and by clicking the 'Checkout Now' button, you will be redirected to the payment integration to complete the purchase.")}
          </p>
          <p className="help-paragraph ">
            {t("By utilizing these Add-on Settings, you can enhance the functionality and features of your Software by adding premium or free add-ons. If you have any questions or need further assistance regarding the Add-on Settings or the installation process, please feel free to contact our support team. They will be delighted to assist you.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


              {/* {currentRoute === "/LogChanges" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Log Changes feature available in the software.
                    This feature allows you to track and view the changes made
                    by users. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Search User</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          You can search for a specific user by entering their
                          username in the search bar. This will help you filter
                          the log changes related to that particular user.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Select Date</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          You can select a specific date from the calendar to
                          narrow down the log changes to a particular day. This
                          helps in pinpointing the changes made on a specific
                          date.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>View Log Listings</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Once you have entered the user name and selected the
                          date, you will see a list of log entries. Each entry
                          will display the user name, date and time of the
                          change, and a brief log description.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>View Changes</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          In the "Action" column, you will find a field labeled
                          "View Changes." By clicking on this field, you can see
                          the detailed changes made by the user. This provides a
                          comprehensive view of the modifications and updates
                          made to the system.
                        </p>
                        <p className="help-paragraph ">
                          By utilizing the Log Changes feature, you can track
                          user activities, view log entries, and access detailed
                          information about the changes made. This helps in
                          monitoring and maintaining an audit trail of system
                          modifications. If you have any questions or need
                          further assistance, please don't hesitate to reach out
                          to our support team. They will be happy to assist you.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/LogChanges" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Log Changes feature available in the software. This feature allows you to track and view the changes made by users. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Search User")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("You can search for a specific user by entering their username in the search bar. This will help you filter the log changes related to that particular user.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Select Date")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("You can select a specific date from the calendar to narrow down the log changes to a particular day. This helps in pinpointing the changes made on a specific date.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("View Log Listings")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("Once you have entered the user name and selected the date, you will see a list of log entries. Each entry will display the user name, date and time of the change, and a brief log description.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("View Changes")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("In the 'Action' column, you will find a field labeled 'View Changes.' By clicking on this field, you can see the detailed changes made by the user. This provides a comprehensive view of the modifications and updates made to the system.")}
          </p>
          <p className="help-paragraph ">
            {t("By utilizing the Log Changes feature, you can track user activities, view log entries, and access detailed information about the changes made. This helps in monitoring and maintaining an audit trail of system modifications. If you have any questions or need further assistance, please don't hesitate to reach out to our support team. They will be happy to assist you.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


            {/*   {currentRoute === "/Vehicle" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help section! Here, you'll find information
                    about the Vehicle-related features available in the
                    software. These features allow you to manage and track
                    vehicles efficiently. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Add Vehicle</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To add a new vehicle, click on the "Add Vehicle"
                          button located on the right side of the screen. This
                          will open a form where you can enter the vehicle
                          details.
                        </p>

                        <p className="heading-list">Adding a Vehicle:</p>
                        <p className="help-paragraph mb-2">
                          When adding a vehicle, you will need to provide the
                          following details:
                        </p>

                        <p className="help-paragraph mb-2">
                          Vehicle Information: Enter the relevant information
                          about the vehicle.
                        </p>

                        <p className="help-paragraph mb-2">
                          Tracking Device: Provide details about the tracking
                          device associated with the vehicle.
                        </p>

                        <p className="help-paragraph mb-2">
                          Temperature Sensor: Specify if the vehicle has a
                          temperature sensor.
                        </p>

                        <p className="help-paragraph mb-2">
                          Validity Information: Set the validity information for
                          the vehicle.
                        </p>
                        <p className="help-paragraph mb-2">
                          Vehicle Geo-fence: Define the geo-fence settings for
                          the vehicle.
                        </p>
                        <p className="help-paragraph mb-2">
                          By utilizing these vehicle-related features, you can
                          efficiently manage and track your vehicles within the
                          software. If you have any questions or need further
                          assistance, Please don't hesitate to reach out to our
                          support team. They will be happy to assist you.
                        </p>

                        <p className="heading-list">Vehicle Listings:</p>

                        <p className="help-paragraph mb-2">
                          You can view vehicle listings categorized into
                          sections: All, Online, Offline, and Untracked/Not
                          Tracked Yet. Each section offers different filters to
                          help you find specific vehicles.
                        </p>
                        <p className="help-paragraph">All Section:</p>
                        <p className="help-paragraph mb-2">
                          "All" section, you can view all vehicles. Use the
                          search bar to search for vehicles by entering details
                          such as vehicle name, vehicle number, and vehicle IM.
                          You can also search by vehicle category, vehicle
                          capacity, and transportation type using the provided
                          filters.
                        </p>
                        <p className="help-paragraph">Online Section:</p>
                        <p className="help-paragraph mb-2">
                          "Online" section displays all vehicles that are
                          currently online. Use the search bar and filters to
                          narrow down your search and find specific online
                          vehicles.
                        </p>
                        <p className="help-paragraph ">Offline Section:</p>
                        <p className="help-paragraph mb-2">
                          "Offline" section, you can view all vehicles that are
                          currently offline. Similar to the previous sections,
                          you can use the search bar and filters to find
                          specific offline vehicles.
                        </p>
                        <p className="help-paragraph">
                          Untracked/Not Tracked Yet Section:
                        </p>
                        <p className="help-paragraph mb-2">
                          "Untracked/Not Tracked Yet" section shows vehicles
                          that have not been tracked yet. You can search for
                          these vehicles using the search bar and filters.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Vehicle category</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">Add Vehicle category:</p>

                        <p className="help-paragraph mb-2">
                          To add a new vehicle category, click on the "Add
                          Vehicle Category" button. You will be presented with a
                          form where you need to fill in the required
                          information. The form typically includes details such
                          as the category name, description, and any additional
                          relevant information.
                        </p>
                        <p className="help-paragraph mb-2">
                          Once you have filled out the form, submit it to add
                          the vehicle category to the system.
                        </p>
                        <p className="heading-list">
                          Vehicle category listings:
                        </p>

                        <p className="help-paragraph mb-2">
                          You can view vehicle listings categorized into
                          sections: All, Online, Offline, and Untracked/Not
                          Tracked Yet. Each section offers different filters to
                          help you find specific vehicles.
                        </p>

                        <p className="help-paragraph ">All Section:</p>
                        <p className="help-paragraph mb-2">
                          "All" section, you can view all vehicles. Use the
                          search bar to search for vehicles by entering details
                          such as vehicle name, vehicle number, and vehicle IM.
                          You can also search by vehicle category, vehicle
                          capacity, and transportation type using the provided
                          filters.
                        </p>
                        <p className="help-paragraph ">Online Section:</p>
                        <p className="help-paragraph mb-2">
                          "Online" section displays all vehicles that are
                          currently online. Use the search bar and filters to
                          narrow down your search and find specific online
                          vehicles.
                        </p>
                        <p className="help-paragraph ">Offline Section:</p>
                        <p className="help-paragraph mb-2">
                          "Offline" section, you can view all vehicles that are
                          currently offline. Similar to the previous sections,
                          you can use the search bar and filters to find
                          specific offline vehicles.
                        </p>
                        <p className="help-paragraph ">
                          Untracked/Not Tracked Yet Section:
                        </p>
                        <p className="help-paragraph mb-2">
                          "Untracked/Not Tracked Yet" section shows vehicles
                          that have not been tracked yet. You can search for
                          these vehicles using the search bar and filters.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Vehicle Group</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          Add a new vehicle group, click on the "Add Vehicle
                          Group" button. You will be directed to a form where
                          you need to provide the necessary details. The form
                          usually includes fields such as the group name,
                          description, and other relevant information.
                        </p>
                        <p className="help-paragraph mb-2">
                          After filling in the required information, submit the
                          form to add the vehicle group to the system.
                        </p>
                        <p className="heading-list">Vehicle Group Listings:</p>
                        <p className="help-paragraph mb-2">
                          You can view vehicle Group listings categorized into
                          sections: All, Online, Offline, and Untracked/Not
                          Tracked Yet. Each section offers different filters to
                          help you find specific vehicles.
                        </p>
                        <p className="help-paragraph ">All Section:</p>
                        <p className="help-paragraph mb-2">
                          "All" section, you can view all vehicles. Use the
                          search bar to search for vehicles by entering details
                          such as vehicle name, vehicle number, and vehicle IM.
                          You can also search by vehicle category, vehicle
                          capacity, and transportation type using the provided
                          filters.
                        </p>
                        <p className="help-paragraph ">Online Section:</p>

                        <p className="help-paragraph mb-2">
                          "Online" section displays all vehicles that are
                          currently online. Use the search bar and filters to
                          narrow down your search and find specific online
                          vehicles.
                        </p>

                        <p className="help-paragraph ">Offline Section:</p>

                        <p className="help-paragraph mb-2">
                          "Offline" section, you can view all vehicles that are
                          currently offline. Similar to the previous sections,
                          you can use the search bar and filters to find
                          specific offline vehicles.
                        </p>
                        <p className="help-paragraph ">
                          Untracked/Not Tracked Yet Section:
                        </p>
                        <p className="help-paragraph mb-2">
                          "Untracked/Not Tracked Yet" section shows vehicles
                          that have not been tracked yet. You can search for
                          these vehicles using the search bar and filters.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Sync</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">Add New Sync Request:</p>

                        <p className="help-paragraph ">
                          If you need to synchronize data or perform a data sync
                          operation, you can use the "Add New Sync Request"
                          option.
                        </p>
                        <p className="help-paragraph ">
                          Click on the option to access the form for adding a
                          new sync request.
                        </p>
                        <p className="help-paragraph ">
                          Fill out the form with the relevant details for the
                          sync operation.
                        </p>

                        <p className="help-paragraph mb-2">
                          Once you have filled in the necessary information,
                          submit the form to initiate the sync request
                        </p>
                        <p className="heading-list">Sync Listings:</p>
                        <p className="help-paragraph mb-2">
                          You can view Sync listings categorized into sections:
                          All, Online, Offline, and Untracked/Not Tracked Yet.
                          Each section offers different filters to help you find
                          specific vehicles.
                        </p>

                        <p className="help-paragraph ">All Section:</p>
                        <p className="help-paragraph mb-2">
                          {" "}
                          "All" section, you can view all vehicles. Use the
                          search bar to search for vehicles by entering details
                          such as vehicle name, vehicle number, and vehicle IM.
                          You can also search by vehicle category, vehicle
                          capacity, and transportation type using the provided
                          filters.
                        </p>
                        <p className="help-paragraph ">Online Section:</p>
                        <p className="help-paragraph mb-2">
                          "Online" section displays all vehicles that are
                          currently online. Use the search bar and filters to
                          narrow down your search and find specific online
                          vehicles.
                        </p>
                        <p className="help-paragraph">Offline Section:</p>
                        <p className="help-paragraph mb-2">
                          "Offline" section, you can view all vehicles that are
                          currently offline. Similar to the previous sections,
                          you can use the search bar and filters to find
                          specific offline vehicles
                        </p>
                        <p className="help-paragraph ">
                          Untracked/Not Tracked Yet Section:
                        </p>
                        <p className="help-paragraph mb-2">
                          "Untracked/Not Tracked Yet" section shows vehicles
                          that have not been tracked yet. You can search for
                          these vehicles using the search bar and filters.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/Vehicle" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    {t("Welcome to the Help section! Here, you'll find information about the Vehicle-related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")}
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("Add Vehicle")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          {t("To add a new vehicle, click on the Add Vehicle button located on the right side of the screen. This will open a form where you can enter the vehicle details.")}
                        </p>

                        <p className="heading-list">{t("Adding a Vehicle:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("When adding a vehicle, you will need to provide the following details:")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("Vehicle Information: Enter the relevant information about the vehicle.")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("Tracking Device: Provide details about the tracking device associated with the vehicle.")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("Temperature Sensor: Specify if the vehicle has a temperature sensor.")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("Validity Information: Set the validity information for the vehicle.")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Vehicle Geo-fence: Define the geo-fence settings for the vehicle.")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("By utilizing these vehicle-related features, you can efficiently manage and track your vehicles within the software. If you have any questions or need further assistance, Please don't hesitate to reach out to our support team. They will be happy to assist you.")}
                        </p>

                        <p className="heading-list">{t("Vehicle Listings:")}</p>

                        <p className="help-paragraph mb-2">
                          {t("You can view vehicle listings categorized into sections: All, Online, Offline, and Untracked/Not Tracked Yet. Each section offers different filters to help you find specific vehicles.")}
                        </p>
                        <p className="help-paragraph">{t("All Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("All section, you can view all vehicles. Use the search bar to search for vehicles by entering details such as vehicle name, vehicle number, and vehicle IM. You can also search by vehicle category, vehicle capacity, and transportation type using the provided filters.")}
                        </p>
                        <p className="help-paragraph">{t("Online Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Online section displays all vehicles that are currently online. Use the search bar and filters to narrow down your search and find specific online vehicles.")}
                        </p>
                        <p className="help-paragraph ">{t("Offline Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Offline section, you can view all vehicles that are currently offline. Similar to the previous sections, you can use the search bar and filters to find specific offline vehicles.")}
                        </p>
                        <p className="help-paragraph">
                          {t("Untracked/Not Tracked Yet Section:")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Untracked/Not Tracked Yet section shows vehicles that have not been tracked yet. You can search for these vehicles using the search bar and filters.")}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{t("Vehicle Category")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">{t("Add Vehicle category:")}</p>

                        <p className="help-paragraph mb-2">
                          {t("To add a new vehicle category, click on the Add Vehicle Category button. You will be presented with a form where you need to fill in the required information. The form typically includes details such as the category name, description, and any additional relevant information.")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Once you have filled out the form, submit it to add the vehicle category to the system.")}
                        </p>
                        <p className="heading-list">
                          {t("Vehicle category listings:")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("You can view vehicle listings categorized into sections: All, Online, Offline, and Untracked/Not Tracked Yet. Each section offers different filters to help you find specific vehicles.")}
                        </p>

                        <p className="help-paragraph ">{t("All Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("All section, you can view all vehicles. Use the search bar to search for vehicles by entering details such as vehicle name, vehicle number, and vehicle IM. You can also search by vehicle category, vehicle capacity, and transportation type using the provided filters.")}
                        </p>
                        <p className="help-paragraph ">{t("Online Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Online section displays all vehicles that are currently online. Use the search bar and filters to narrow down your search and find specific online vehicles.")}
                        </p>
                        <p className="help-paragraph ">{t("Offline Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Offline section, you can view all vehicles that are currently offline. Similar to the previous sections, you can use the search bar and filters to find specific offline vehicles.")}
                        </p>
                        <p className="help-paragraph ">
                          {t("Untracked/Not Tracked Yet Section:")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Untracked/Not Tracked Yet section shows vehicles that have not been tracked yet. You can search for these vehicles using the search bar and filters.")}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>{t("Vehicle Group")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          {t("Add a new vehicle group, click on the Add Vehicle Group button. You will be directed to a form where you need to provide the necessary details. The form usually includes fields such as the group name, description, and other relevant information.")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("After filling in the required information, submit the form to add the vehicle group to the system.")}
                        </p>
                        <p className="heading-list">{t("Vehicle Group Listings:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("You can view vehicle Group listings categorized into sections: All, Online, Offline, and Untracked/Not Tracked Yet. Each section offers different filters to help you find specific vehicles.")}
                        </p>
                        <p className="help-paragraph ">{t("All Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("All section, you can view all vehicles. Use the search bar to search for vehicles by entering details such as vehicle name, vehicle number, and vehicle IM. You can also search by vehicle category, vehicle capacity, and transportation type using the provided filters.")}
                        </p>
                        <p className="help-paragraph ">{t("Online Section:")}</p>

                        <p className="help-paragraph mb-2">
                          {t("Online section displays all vehicles that are currently online. Use the search bar and filters to narrow down your search and find specific online vehicles.")}
                        </p>

                        <p className="help-paragraph ">{t("Offline Section:")}</p>

                        <p className="help-paragraph mb-2">
                          {t("Offline section, you can view all vehicles that are currently offline. Similar to the previous sections, you can use the search bar and filters to find specific offline vehicles.")}
                        </p>
                        <p className="help-paragraph ">
                          {t("Untracked/Not Tracked Yet Section:")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Untracked/Not Tracked Yet section shows vehicles that have not been tracked yet. You can search for these vehicles using the search bar and filters.")}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>{t("Sync")}</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list">{t("Add New Sync Request:")}</p>

                        <p className="help-paragraph ">
                          {t("If you need to synchronize data or perform a data sync operation, you can use the Add New Sync Request option.")}
                        </p>
                        <p className="help-paragraph ">
                          {t("Click on the option to access the form for adding a new sync request.")}
                        </p>
                        <p className="help-paragraph ">
                          {t("Fill out the form with the relevant details for the sync operation.")}
                        </p>

                        <p className="help-paragraph mb-2">
                          {t("Once you have filled in the necessary information, submit the form to initiate the sync request")}
                        </p>
                        <p className="heading-list">{t("Sync Listings:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("You can view Sync listings categorized into sections: All, Online, Offline, and Untracked/Not Tracked Yet. Each section offers different filters to help you find specific vehicles.")}
                        </p>

                        <p className="help-paragraph ">{t("All Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("All section, you can view all vehicles. Use the search bar to search for vehicles by entering details such as vehicle name, vehicle number, and vehicle IM. You can also search by vehicle category, vehicle capacity, and transportation type using the provided filters.")}
                        </p>
                        <p className="help-paragraph ">{t("Online Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Online section displays all vehicles that are currently online. Use the search bar and filters to narrow down your search and find specific online vehicles.")}
                        </p>
                        <p className="help-paragraph">{t("Offline Section:")}</p>
                        <p className="help-paragraph mb-2">
                          {t("Offline section, you can view all vehicles that are currently offline. Similar to the previous sections, you can use the search bar and filters to find specific offline vehicles")}
                        </p>
                        <p className="help-paragraph ">
                          {t("Untracked/Not Tracked Yet Section:")}
                        </p>
                        <p className="help-paragraph mb-2">
                          {t("Untracked/Not Tracked Yet section shows vehicles that have not been tracked yet. You can search for these vehicles using the search bar and filters.")}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )}



{currentRoute === "/DispatchOrder" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                  {t("Welcome to the Help section! Here, you'll find information about the Order-related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")}  
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{t("Import Data")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                         <ul>
                          <li>{t("Import data from an Excel file by clicking \"Import Data\".")}  </li>
                          <li>{t("Download the import format for reference.")} </li>
                          <li>{t("When file is uploaded it will be listed in the order listing page.")} </li>
                         </ul>
                        </p>

                       
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{t("Add Order")} </Accordion.Header>
                      <Accordion.Body>
                        
                        <p className="help-paragraph mb-2">{t("Click \"Add Order\" to create a new order.")}   </p>
                        <p className="help-paragraph mb-2">
                        <ul>
                        <li>{t("Fill out details including date, time, vehicle type, and number of goods.")} </li>
<li>{t("Specify package details like weight, dimensions, and type.")} </li>
<li>{t("Select merchant and warehouse from dropdowns.")} </li>
<li>{t("Pickup address will be auto-fetched.")} </li>
<li>{t("Select customer and delivery address from dropdowns.")} </li>
<li>{t("After saving, the order will be listed in the \"All Orders\" section.")} </li>
<li>{t("Customers receive an email with order details and a link to track the order status.")} </li>

                         </ul>
                        </p>
                      
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>{t("Pending Orders")} </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li><strong>{t("a.")} </strong>{t("In this section, you can find a list of orders that are pending and yet to be processed.")} </li>
    <li><strong>{t("b.")} </strong>{t("You can search for specific orders using order numbers, customer names, or pickup/drop locations.")} </li>
    <li><strong>{t("c.")} </strong>{t("Multiple orders can be assigned simultaneously by selecting them and using the \"Assign Multiple Orders\" button.")} </li>
    <li><strong>{t("d.")} </strong>{t("If manual routing is required, You have three routing options available:")} 
        
            <li>{t("Drawing Shapes: Click on the map to create points and draw shapes to define the route.")} </li>
            <li>{t("Marking Rectangles: Mark rectangular areas on the map to designate specific regions for routing.")} </li>
            <li>{t("Marking Circles: Mark circular areas on the map to highlight central locations or areas of interest for routing.")} </li>
            <li>{t("Assigning Orders: After defining the route using one of the routing options, you can assign orders to the route. Select the appropriate vehicle with a driver for the assigned trip. Click on the \"Assign Trip\" button to finalize the assignment process.")} </li>
        
    </li>
    <li><strong>{t("e.")} </strong>{t("Each order listing includes essential details such as order number, status, pickup/drop locations, customer, and merchant names.")} 
        
            <li><strong style={{color:'#683100'}}>{t("Viewing Orders:")} </strong>{t("To view order details, simply click on the \"View\" button next to the respective order.")} </li>
            <li>{t("Upon clicking, you'll be presented with various sections:")} 
               
                    <li>{t("Assign Trip (If Applicable): If the order requires assignment to a driver, click on \"Assign Trip\" to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.")} </li>
                    <li>{t("Order Summary: This section provides a comprehensive timeline of the order, including:")} 
                      
                            <li>{t("Pick-up Location: Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).")} </li>
                            <li>{t("Order Received: Shows customer name along with scheduled and actual ETA.")} </li>
                            <li>{t("Drop Location: Provides location details with scheduled and actual ETA.")} </li>
                            <li>{t("Shipment Information: Details regarding the shipment, such as Vehicle Type, Weight of good, Length (cm), width (cm), Height (cm), Number of goods, and types of goods")}  </li>
                            <li>{t("Customer Detail: Information about the customer, including Customer name, Customer mobile, Customer email, and Customer rating (After delivery of the product)")}  </li>
                            <li> {t("Order Detail: Specifics about the order, including order number, items ordered, Order date and time and amount and Amount payment type.")} </li>
                            <li>{t("Trip Details: Information related to the trip, including Trip name , Trip ID and Trip time.")} </li>
                            <li>{t("Assigned Driver & Vehicle Details: Details of the assigned driver and the vehicle assigned for delivery.")} </li>
                            <li>{t("Map View: A visual representation of the order's current status and location on the map for easy tracking.")} </li>
                        
                    </li>
                    <li> <strong style={{color:'#683100'}}>{t("Assigning Orders:")} </strong>{t("If an order needs to be assigned to a driver, click on the \"Assign Order\" button.")} 
                       
                            <li>{t("Select the appropriate vehicle and driver from the dropdown menu.")} </li>
                            <li>{t("Once assigned, the order will be updated with the selected driver and vehicle details.")} </li>
                        
                    </li>
                    <li><strong style={{color:'#683100'}}>{t("Editing Orders:")} </strong>{t("To make changes to an existing order, click on the \"Edit Order\" button.")} 
                     
                            <li>{t("You'll be able to modify order details such as delivery address, items ordered, or delivery preferences.")} </li>
                   
                    </li>
            
            </li>
      
    </li>
</ul>
                        </p>

                       
                      </Accordion.Body>
                    </Accordion.Item>
                   {/*  <Accordion.Item eventKey="3">
                      <Accordion.Header>In Progress Orders</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li><strong>a.</strong> This section displays orders that are currently being processed or are in transit.</li>
    <li><strong>b.</strong> Users can opt to view these orders on a map for better visualization by clicking on the "Map View" button.</li>
    <li><strong>c.</strong> Similar to pending orders, multiple in-progress orders can be assigned simultaneously.</li>
    <li><strong>d.</strong> Order listings provide details like order number, status, trip ID, order date/time, driver name, customer, and merchant names.
       
            <li> <strong>Drawing Shapes:</strong> Click on the map to create points and draw shapes to define the route.</li>
            <li><strong> Marking Rectangles:</strong> Mark rectangular areas on the map to designate specific regions for routing.</li>
            <li><strong> Marking Circles:</strong> Mark circular areas on the map to highlight central locations or areas of interest for routing.</li>
            <li><strong> Assigning Orders: </strong>After defining the route using one of the routing options, you can assign orders to the route. Select the appropriate vehicle with a driver for the assigned trip. Click on the "Assign Trip" button to finalize the assignment process.</li>
     
    </li>
    <li><strong>e.</strong> Actions Include:
        
            <li><strong style={{color:'#683100'}}>View Orders:</strong> To view order details, simply click on the "View" button next to the respective order.</li>
            <li>Upon clicking, you'll be presented with various sections:
               
                    <li> Assign Trip (If Applicable): If the order requires assignment to a driver, click on "Assign Trip" to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.</li>
                    <li> Order Summary: This section provides a comprehensive timeline of the order, including:
                     
                            <li> Pick-up Location: Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).</li>
                            <li> Order Received: Shows customer name along with scheduled and actual ETA.</li>
                            <li> Drop Location: Provides location details with scheduled and actual ETA.</li>
                            <li> Shipment Information: Details regarding the shipment, such as package contents, weight, and dimensions.</li>
                            <li> Customer Detail: Information about the customer, including name, contact details, and delivery preferences.</li>
                            <li> Order Detail: Specifics about the order, including order number, items ordered, and any special instructions.</li>
                            <li> Trip Details: Information related to the trip, including driver details, vehicle information, and trip status.</li>
                            <li> Assigned Driver & Vehicle Details: Details of the assigned driver and the vehicle assigned for delivery.</li>
                            <li> Map View: A visual representation of the order's current status and location on the map for easy tracking.</li>
                     
                    </li>
                    <li><strong style={{color:'#683100'}}>Assigning Orders:</strong> If an order needs to be assigned to a driver, click on the "Assign Order" button.
                      
                            <li> Select the appropriate vehicle and driver from the dropdown menu.</li>
                            <li> Once assigned, the order will be updated with the selected driver and vehicle details.</li>
                       
                    </li>
                    <li><strong style={{color:'#683100'}}>Editing Orders:</strong> To make changes to an existing order, click on the "Edit Order" button.
                      
                            <li> You'll be able to modify order details such as delivery address, items ordered, or delivery preferences.</li>
                     
                    </li>
             
            </li>
            <li><strong style={{color:'#683100'}}>Cancel Orders:</strong> To cancel an existing order, click on the "cancel Order" icon.</li>
            <li><strong style={{color:'#683100'}}>Re-assigning Orders:</strong> If an order needs to be re-assigned to a driver, click on the "Re-assign Order" icon.
              
                    <li> Select the appropriate vehicle and driver from the dropdown menu.</li>
                    <li> Once re-assigned, the order will be updated with the selected driver and vehicle details.</li>
               
            </li>
       
    </li>
</ul>


</p>
</Accordion.Body>
                    </Accordion.Item> */}

<Accordion.Item eventKey="3">
  <Accordion.Header>{t("In Progress Orders")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph mb-2">
      <ul>
        <li><strong>{t("a.")}</strong> {t("This section displays orders that are currently being processed or are in transit.")}</li>
        <li><strong>{t("b.")}</strong> {t("Users can opt to view these orders on a map for better visualization by clicking on the \"Map View\" button.")}</li>
        <li><strong>{t("c.")}</strong> {t("Similar to pending orders, multiple in-progress orders can be assigned simultaneously.")}</li>
        <li><strong>{t("d.")}</strong> {t("Order listings provide details like order number, status, trip ID, order date/time, driver name, customer, and merchant names.")}
          
            <li><strong>{t("Drawing Shapes:")}</strong> {t("Click on the map to create points and draw shapes to define the route.")}</li>
            <li><strong>{t("Marking Rectangles:")}</strong> {t("Mark rectangular areas on the map to designate specific regions for routing.")}</li>
            <li><strong>{t("Marking Circles:")}</strong> {t("Mark circular areas on the map to highlight central locations or areas of interest for routing.")}</li>
            <li><strong>{t("Assigning Orders:")}</strong> {t("After defining the route using one of the routing options, you can assign orders to the route. Select the appropriate vehicle with a driver for the assigned trip. Click on the \"Assign Trip\" button to finalize the assignment process.")}</li>
     
        </li>
        <li><strong>{t("e.")}</strong> {t("Actions Include:")}
          
            <li><strong style={{color:'#683100'}}>{t("View Orders:")}</strong> {t("To view order details, simply click on the \"View\" button next to the respective order.")}</li>
            <li>{t("Upon clicking, you'll be presented with various sections:")}
           
                <li>{t("Assign Trip (If Applicable):")} {t("If the order requires assignment to a driver, click on \"Assign Trip\" to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.")}</li>
                <li>{t("Order Summary:")}{t("This section provides a comprehensive timeline of the order, including:")}
               
                    <li><strong>{t("Pick-up Location:")}</strong> {t("Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).")}</li>
                    <li><strong>{t("Order Received:")}</strong> {t("Shows customer name along with scheduled and actual ETA.")}</li>
                    <li><strong>{t("Drop Location:")}</strong> {t("Provides location details with scheduled and actual ETA.")}</li>
                    <li><strong>{t("Shipment Information:")}</strong> {t("Details regarding the shipment, such as package contents, weight, and dimensions.")}</li>
                    <li><strong>{t("Customer Detail:")}</strong> {t("Information about the customer, including name, contact details, and delivery preferences.")}</li>
                    <li><strong>{t("Order Detail:")}</strong> {t("Specifics about the order, including order number, items ordered, and any special instructions.")}</li>
                    <li><strong>{t("Trip Details:")}</strong> {t("Information related to the trip, including driver details, vehicle information, and trip status.")}</li>
                    <li><strong>{t("Assigned Driver & Vehicle Details:")}</strong> {t("Details of the assigned driver and the vehicle assigned for delivery.")}</li>
                    <li><strong>{t("Map View:")}</strong> {t("A visual representation of the order's current status and location on the map for easy tracking.")}</li>
                
                </li>
                <li><strong style={{color:'#683100'}}>{t("Assigning Orders:")}</strong> {t("If an order needs to be assigned to a driver, click on the \"Assign Order\" button.")}
                
                    <li>{t("Select the appropriate vehicle and driver from the dropdown menu.")}</li>
                    <li>{t("Once assigned, the order will be updated with the selected driver and vehicle details.")}</li>
              
                </li>
                <li><strong style={{color:'#683100'}}>{t("Editing Orders:")}</strong> {t("To make changes to an existing order, click on the \"Edit Order\" button.")}
             
                    <li>{t("You'll be able to modify order details such as delivery address, items ordered, or delivery preferences.")}</li>
                 
                </li>
        
            </li>
            <li><strong style={{color:'#683100'}}>{t("Cancel Orders:")}</strong> {t("To cancel an existing order, click on the \"cancel Order\" icon.")}</li>
            <li><strong style={{color:'#683100'}}>{t("Re-assigning Orders:")}</strong> {t("If an order needs to be re-assigned to a driver, click on the \"Re-assign Order\" icon.")}
             
                <li>{t("Select the appropriate vehicle and driver from the dropdown menu.")}</li>
                <li>{t("Once re-assigned, the order will be updated with the selected driver and vehicle details.")}</li>
           
            </li>
         
        </li>
      </ul>
    </p>
  </Accordion.Body>
</Accordion.Item>

           {/*          <Accordion.Item eventKey="4">
                      <Accordion.Header>Order History</Accordion.Header>
                      <Accordion.Body>
                      <p className="help-paragraph mb-2">
                      <ul>
    <li><strong>a.</strong> In the order history section, you'll find a comprehensive record of all past orders.</li>
    <li><strong>b.</strong> Users can search for specific orders using order numbers, customer names, or pickup/drop locations.</li>
    <li><strong>c.</strong> Multiple historical orders can be assigned simultaneously if needed.</li>
    <li><strong>d.</strong> Each order listing contains detailed information including order number, status, trip ID, order date/time, driver name, customer, and merchant names.</li>
    <li><strong>e. Action : </strong>
        
            <li><strong style={{color:"#683100"}}>Viewing Orders:</strong> To view order details, simply click on the "View" button next to the respective order.</li>
            <li>Upon clicking, you'll be presented with various sections:
                
                    <li> Assign Trip (If Applicable): If the order requires assignment to a driver, click on "Assign Trip" to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.</li>
                    <li> Order Summary: This section provides a comprehensive timeline of the order, including:
                        
                            <li><strong> Pick-up Location:</strong> Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).</li>
                            <li><strong> Order Received:</strong> Shows customer name along with scheduled and actual ETA.</li>
                            <li><strong> Drop Location: </strong>Provides location details with scheduled and actual ETA.</li>
                            <li><strong> Shipment Information:</strong> Details regarding the shipment, such as package contents, weight, and dimensions.</li>
                            <li><strong> Customer Detail:</strong> Information about the customer, including name, contact details, and delivery preferences.</li>
                            <li> <strong>Order Detail:</strong> Specifics about the order, including order number, items ordered, and any special instructions.</li>
                            <li> <strong>Trip Details: </strong>Information related to the trip, including driver details, vehicle information, and trip status.</li>
                            <li><strong> Assigned Driver & Vehicle Details:</strong> Details of the assigned driver and the vehicle assigned for delivery.</li>
                            <li><strong> Map View: </strong>A visual representation of the order's current status and location on the map for easy tracking.</li>
                       
                    </li>
               
            </li>
      
    </li>
</ul>
</p>


                      </Accordion.Body>
                    </Accordion.Item> */}

<Accordion.Item eventKey="4">
                      <Accordion.Header>{t("Order History")}</Accordion.Header>
                      <Accordion.Body>
                      <p className="help-paragraph mb-2">
                      <ul>
    <li><strong>{t("a.")} </strong> {t("In the order history section, you'll find a comprehensive record of all past orders.")}</li>
    <li><strong>{t("b.")}</strong> {t("Users can search for specific orders using order numbers, customer names, or pickup/drop locations.")}</li>
    <li><strong>{t("c.")}</strong> {t("Multiple historical orders can be assigned simultaneously if needed.")}</li>
    <li><strong>{t("d.")}</strong> {t("Each order listing contains detailed information including order number, status, trip ID, order date/time, driver name, customer, and merchant names.")}</li>
    <li><strong> {t("e_actions")}    </strong> 
        
            <li><strong style={{color:"#683100"}}>{t("Viewing Orders:")}</strong> {t("To view order details, simply click on the 'View' button next to the respective order.")}</li>
            <li>{t("Upon clicking, you'll be presented with various sections:")}
                
                    <li>{t("Assign Trip (If Applicable): If the order requires assignment to a driver, click on 'Assign Trip' to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.")}</li>
                    <li>{t("Order Summary: This section provides a comprehensive timeline of the order, including:")}
                        
                            <li><strong>{t("Pick-up Location:")}</strong> {t("Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).")}</li>
                            <li><strong>{t("Order Received:")}</strong> {t("Shows customer name along with scheduled and actual ETA.")}</li>
                            <li><strong>{t("Drop Location: ")}</strong>{t("Provides location details with scheduled and actual ETA.")}</li>
                            <li><strong>{t("Shipment Information:")}</strong> {t("Details regarding the shipment, such as package contents, weight, and dimensions.")}</li>
                            <li><strong>{t("Customer Detail:")}</strong> {t("Information about the customer, including name, contact details, and delivery preferences.")}</li>
                            <li> <strong>{t("Order Detail:")}</strong> {t("Specifics about the order, including order number, items ordered, and any special instructions.")}</li>
                            <li> <strong>{t("Trip Details: ")}</strong>{t("Information related to the trip, including driver details, vehicle information, and trip status.")}</li>
                            <li><strong>{t("Assigned Driver & Vehicle Details:")}</strong> {t("Details of the assigned driver and the vehicle assigned for delivery.")}</li>
                            <li><strong>{t("Map View: ")}</strong>{t("A visual representation of the order's current status and location on the map for easy tracking.")}</li>
                       
                    </li>
               
            </li>
      
    </li>
</ul>
</p>


                      </Accordion.Body>
                    </Accordion.Item>


                    
                   

                   {/*  <Accordion.Item eventKey="5">
                      <Accordion.Header>All Orders</Accordion.Header>
                      <Accordion.Body>
                      <p className="help-paragraph mb-2">
                      <ul>
    <li><strong>a.</strong> All Orders: The "All Orders" section provides a consolidated view of all orders.</li>
    <li><strong>b.</strong> Users have the option to search for orders using various criteria such as order numbers, customer names, or pickup/drop locations.</li>
    <li><strong>c.</strong> Similar to other sections, multiple orders can be assigned at once if necessary.</li>
    <li><strong>d.</strong> If manual routing is required, You have three routing options available:
       
            <li> Drawing Shapes: Click on the map to create points and draw shapes to define the route.</li>
            <li> Marking Rectangles: Mark rectangular areas on the map to designate specific regions for routing.</li>
            <li> Marking Circles: Mark circular areas on the map to highlight central locations or areas of interest for routing.</li>
            <li> Assigning Orders: After defining the route using one of the routing options, you can assign orders to the route. Select the appropriate vehicle with a driver for the assigned trip. Click on the "Assign Trip" button to finalize the assignment process.</li>
      
    </li>
    <li><strong>e.</strong> Each order listing contains detailed information including order number, status, trip ID, order date/time, driver name, customer, and merchant names.</li>
    <li><strong>f.</strong> Action:
       
            <li><strong>Viewing Orders:</strong> To view order details, simply click on the "View" button next to the respective order.
               
                    <li>Upon clicking, you'll be presented with various sections:
                       
                            <li> Assign Trip (If Applicable): If the order requires assignment to a driver, click on "Assign Trip" to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.</li>
                            <li> Order Summary: This section provides a comprehensive timeline of the order, including:
                               
                                    <li><strong> Pick-up Location:</strong> Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).</li>
                                    <li><strong> Order Received:</strong> Shows customer name along with scheduled and actual ETA.</li>
                                    <li><strong> Drop Location:</strong> Provides location details with scheduled and actual ETA.</li>
                                    <li><strong> Shipment Information:</strong> Details regarding the shipment, such as package contents, weight, and dimensions.</li>
                                    <li><strong> Customer Detail:</strong> Information about the customer, including name, contact details, and delivery preferences.</li>
                                    <li><strong> Order Detail: </strong>Specifics about the order, including order number, items ordered, and any special instructions.</li>
                                    <li><strong> Trip Details:</strong> Information related to the trip, including driver details, vehicle information, and trip status.</li>
                                    <li><strong> Assigned Driver & Vehicle Details:</strong> Details of the assigned driver and the vehicle assigned for delivery.</li>
                                    <li><strong> Map View:</strong> A visual representation of the order's current status and location on the map for easy tracking.</li>
                              
                            </li>
                       
                    </li>
                    </li>
              
            </li>
            <li><strong>Assigning Orders:</strong>
               
                    <li> If an order needs to be assigned to a driver, click on the "Assign Order" button.</li>
                    <li> Select the appropriate vehicle and driver from the dropdown menu.</li>
                    <li> Once assigned, the order will be updated with the selected driver and vehicle details.</li>
              
            </li>
            <li><strong>Editing Orders:</strong>
               
                    <li> To make changes to an existing order, click on the "Edit Order" button.</li>
                    <li> You'll be able to modify order details such as delivery address, items ordered, or delivery preferences.</li>
             
            </li>
       
</ul>
                   
                     </p>
                     
                     </Accordion.Body>
                    </Accordion.Item> */}


<Accordion.Item eventKey="5">
  <Accordion.Header>{t("All Orders")}</Accordion.Header>
  <Accordion.Body>
    <p className="help-paragraph mb-2">
      <ul>
        <li><strong>{t("a.")}</strong> {t("All Orders: The 'All Orders' section provides a consolidated view of all orders.")}</li>
        <li><strong>{t("b.")}</strong> {t("Users have the option to search for orders using various criteria such as order numbers, customer names, or pickup/drop locations.")}</li>
        <li><strong>{t("c.")}</strong> {t("Similar to other sections, multiple orders can be assigned at once if necessary.")}</li>
        <li><strong>{t("d.")}</strong> {t("If manual routing is required, You have three routing options available:")}</li>
          
            <li>{t("Drawing Shapes")}: {t("Click on the map to create points and draw shapes to define the route.")}</li>
            <li>{t("Marking Rectangles")}: {t("Mark rectangular areas on the map to designate specific regions for routing.")}</li>
            <li>{t("Marking Circles")}: {t("Mark circular areas on the map to highlight central locations or areas of interest for routing.")}</li>
            <li>{t("Assigning Orders")}: {t("After defining the route using one of the routing options, you can assign orders to the route. Select the appropriate vehicle with a driver for the assigned trip. Click on the 'Assign Trip' button to finalize the assignment process.")}</li>
         
        <li><strong>{t("e.")}</strong> {t("Each order listing contains detailed information including order number, status, trip ID, order date/time, driver name, customer, and merchant names.")}</li>
        <li><strong>{t("f.")}</strong> {t("Action:")}</li>
          
            <li><strong>{t("Viewing Orders")}:</strong> {t("To view order details, simply click on the 'View' button next to the respective order.")}</li>
            
              <li>{t("Assign Trip (If Applicable)")}: {t("If the order requires assignment to a driver, click on 'Assign Trip' to select a driver and vehicle from the dropdown menu. Once assigned, the trip details will be updated accordingly.")}</li>
              <li>{t("Order Summary")}: {t("This section provides a comprehensive timeline of the order, including:")}</li>
                
                  <li><strong>{t("Pick-up Location")}:</strong> {t("Displays detailed location information along with scheduled and actual ETA (Estimated Time of Arrival).")}</li>
                  <li><strong>{t("Order Received")}:</strong> {t("Shows customer name along with scheduled and actual ETA.")}</li>
                  <li><strong>{t("Drop Location")}:</strong> {t("Provides location details with scheduled and actual ETA.")}</li>
                  <li><strong>{t("Shipment Information")}:</strong> {t("Details regarding the shipment, such as package contents, weight, and dimensions.")}</li>
                  <li><strong>{t("Customer Detail")}:</strong> {t("Information about the customer, including name, contact details, and delivery preferences.")}</li>
                  <li><strong>{t("Order Detail")}:</strong> {t("Specifics about the order, including order number, items ordered, and any special instructions.")}</li>
                  <li><strong>{t("Trip Details")}:</strong> {t("Information related to the trip, including driver details, vehicle information, and trip status.")}</li>
                  <li><strong>{t("Assigned Driver & Vehicle Details")}:</strong> {t("Details of the assigned driver and the vehicle assigned for delivery.")}</li>
                  <li><strong>{t("Map View")}:</strong> {t("A visual representation of the order's current status and location on the map for easy tracking.")}</li>
               
              <li><strong>{t("Assigning Orders")}:</strong> {t("If an order needs to be assigned to a driver, click on the 'Assign Order' button.")}</li>
                
                  <li>{t("Select the appropriate vehicle and driver from the dropdown menu.")}</li>
                  <li>{t("Once assigned, the order will be updated with the selected driver and vehicle details.")}</li>
               
              <li><strong>{t("Editing Orders")}:</strong> {t("To make changes to an existing order, click on the 'Edit Order' button.")}</li>
                
                  <li>{t("You'll be able to modify order details such as delivery address, items ordered, or delivery preferences.")}</li>
               
           
         
      </ul>
    </p>
  </Accordion.Body>
</Accordion.Item>


                  </Accordion>
                </div>
              )}


{/* {currentRoute === "/DispatchDashboard" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                {t("Welcome to the Help section! Here, you'll find information about the Dispatch Dashboard related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")} 
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                     {t("Order Summary Graphical View")} 
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <p>{t("You can visualize the status of your orders through a graphical representation on the dashboard.")} </p>
<ul>
    <li> Delivered orders are displayed in <span style={{color:"green"}}>green</span> color.</li>
    <li> Orders in progress are displayed in <span style={{color:"orange"}}>orange</span> color.</li>
    <li> Cancelled orders are displayed in <span style={{color:"red"}}>red</span> color.</li>
    <li> Returned orders are displayed in <span style={{color:"darkblue"}}>dark blue</span> color.</li>
</ul>

                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Delivery Person Statistics</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                       
<p>You have access to detailed statistics for each delivery person.</p>
<ul>
    <li> Delivered orders are shown in <span style={{color:'green'}}>green</span>.</li>
    <li> Orders in progress are shown in <span style={{color:'orange'}}>orange</span>.</li>
    <li> Cancelled orders are shown in <span style={{color:'red'}}>red</span>.</li>
    <li> Returned orders are shown in <span style={{color:'darkblue'}}>dark blue</span>.</li>
    <li> Blank entries (indicating no activity) are shown in white.</li>
    <li> Additionally, you can view the profile picture, name, and contact number of each delivery person.</li>
</ul>
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Daily Dispatch Statistics</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <p>To view daily dispatch statistics, simply select a date from the calendar.</p>
<p>Statistics include the:</p>
<ul>
    <li> Total number of orders</li>
    <li> Orders delivered</li>
    <li> Pending orders</li>
    <li> Orders in progress</li>
    <li> Returned orders</li>
    <li> Monthly order count</li>
    <li> Monthly delivery count</li>
</ul>

                        </p>
                        
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Summary View by Date</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <p>You can also view a summary of dispatch activities by selecting a specific date from the calendar.</p>
<p>This summary includes details such as the:</p>
<ul>
    <li> Assigned delivery person</li>
    <li> Order status</li>
    <li> Total distance covered</li>
    <li> Total duration spent on deliveries</li>
</ul>


                        </p>
                        
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/DispatchDashboard" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Dispatch Dashboard related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Order Summary Graphical View")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <p>{t("You can visualize the status of your orders through a graphical representation on the dashboard.")}</p>
            <ul>
              <li> {t("Delivered orders are displayed in")} <span style={{ color: "green" }}>{t("green")}</span>.</li>
              <li> {t("Orders in progress are displayed in")} <span style={{ color: "orange" }}>{t("orange")}</span>.</li>
              <li> {t("Cancelled orders are displayed in")} <span style={{ color: "red" }}>{t("red")}</span>.</li>
              <li> {t("Returned orders are displayed in")} <span style={{ color: "darkblue" }}>{t("dark blue")}</span>.</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Delivery Person Statistics")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            <p>{t("You have access to detailed statistics for each delivery person.")}</p>
            <ul>
              <li> {t("Delivered orders are shown in")} <span style={{ color: 'green' }}>{t("green")}</span>.</li>
              <li> {t("Orders in progress are shown in")} <span style={{ color: 'orange' }}>{t("orange")}</span>.</li>
              <li> {t("Cancelled orders are shown in")} <span style={{ color: 'red' }}>{t("red")}</span>.</li>
              <li> {t("Returned orders are shown in")} <span style={{ color: 'darkblue' }}>{t("dark blue")}</span>.</li>
              <li> {t("Blank entries (indicating no activity) are shown in white")}.</li>
              <li> {t("Additionally, you can view the profile picture, name, and contact number of each delivery person")}.</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Daily Dispatch Statistics")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <p>{t("To view daily dispatch statistics, simply select a date from the calendar.")}</p>
            <p>{t("Statistics include the:")}</p>
            <ul>
              <li> {t("Total number of orders")}</li>
              <li> {t("Orders delivered")}</li>
              <li> {t("Pending orders")}</li>
              <li> {t("Orders in progress")}</li>
              <li> {t("Returned orders")}</li>
              <li> {t("Monthly order count")}</li>
              <li> {t("Monthly delivery count")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("Summary View by Date")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <p>{t("You can also view a summary of dispatch activities by selecting a specific date from the calendar.")}</p>
            <p>{t("This summary includes details such as the:")}</p>
            <ul>
              <li> {t("Assigned delivery person")}</li>
              <li> {t("Order status")}</li>
              <li> {t("Total distance covered")}</li>
              <li> {t("Total duration spent on deliveries")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


{/* {currentRoute === "/Merchant" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                  Welcome to the Help section! Here, you'll find information
                    about the Merchant related features available in the
                    software. These features allow you to manage and track
                    vehicles efficiently. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                      View Merchant
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li> Access merchant information including name, ID, and email.</li>
    <li> Edit or delete merchant details.</li>
</ul>


                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header> Search Functionality</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                        <li>Easily search for merchants using the search bar.</li>

                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Add New Merchant</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li> Click "Add Merchant" to fill out a form for creating a new merchant.</li>
    <li> Upload merchant profile picture.</li>
    <li> Provide basic details and password.</li>
    <li> Fill out warehouse details such as name, address, loading duration, and mark location on the map.</li>
    <li> Add multiple warehouse addresses such as warehouse name, warehouse address, average loading duration, map view to mark the warehouse location.</li>
</ul>


                        </p>
                        
                      </Accordion.Body>
                    </Accordion.Item>
                    
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/Merchant" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Merchant related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("View Merchant")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <ul>
              <li>{t("Access merchant information including name, ID, and email.")}</li>
              <li>{t("Edit or delete merchant details.")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Search Functionality")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            <li>{t("Easily search for merchants using the search bar.")}</li>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Add New Merchant")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <ul>
              <li>{t("Click \"Add Merchant\" to fill out a form for creating a new merchant.")}</li>
              <li>{t("Upload merchant profile picture.")}</li>
              <li>{t("Provide basic details and password.")}</li>
              <li>{t("Fill out warehouse details such as name, address, loading duration, and mark location on the map.")}</li>
              <li>{t("Add multiple warehouse addresses such as warehouse name, warehouse address, average loading duration, map view to mark the warehouse location.")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


{/* {currentRoute === "/DispatchCustomer" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                  Welcome to the Help section! Here, you'll find information
                    about the Dispatch Customer related features available in the
                    software. These features allow you to manage and track
                    vehicles efficiently. Let's explore!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                      View Customer Listings
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li>Access customer details including name, code, email, and mobile number. </li>
    <li> Edit or delete customer information. </li>
</ul>


                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header> Search Functionality</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                        <li>Quickly find customers by name or code.</li>

                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header> Add New Customer</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                        <ul>
    <li> Click "Add Customer" to fill out a form for adding a new customer. </li>
    <li> Provide basic details and customer address including delivery details, contact 
information, and unloading duration(min). </li>
    <li> Add multiple customer addresses if required.</li>
   </ul>


                        </p>
                        
                      </Accordion.Body>
                    </Accordion.Item>
                    
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/DispatchCustomer" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help section! Here, you'll find information about the Dispatch Customer related features available in the software. These features allow you to manage and track vehicles efficiently. Let's explore!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("View Customer Listings")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <ul>
              <li>{t("Access customer details including name, code, email, and mobile number.")}</li>
              <li>{t("Edit or delete customer information.")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Search Functionality")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            <li>{t("Quickly find customers by name or code.")}</li>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Add New Customer")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            <ul>
              <li>{t("Click \"Add Customer\" to fill out a form for adding a new customer.")}</li>
              <li>{t("Provide basic details and customer address including delivery details, contact information, and unloading duration(min).")}</li>
              <li>{t("Add multiple customer addresses if required.")}</li>
            </ul>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}




            {/*   {currentRoute === "/Holidays" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help module for our software's Holidays
                    feature!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Searching for Holidays
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To search for a specific holiday, simply type the
                          holiday name in the search box. The results will be
                          displayed accordingly.
                        </p>
                        <p className="help-paragraph">Selecting Dates:</p>
                        <p className="help-paragraph ">
                          To search for a specific holiday, simply type the
                          holiday name in the search box. The results will be
                          displayed accordingly.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Holiday Listings</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          When you search for holidays, you will see a list of
                          results. Each holiday listing includes the date,
                          description, status, and actions for editing or
                          deleting the holiday.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Add Holiday</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To add a new holiday, click on the "Add Holiday"
                          button located on the right side of the screen. A form
                          will appear.
                        </p>
                        <p className="heading-list">
                          Fill in the required details:
                        </p>
                        <p className="help-paragraph ">
                          Holiday Name: Enter the name of the holiday.
                        </p>
                        <p className="help-paragraph ">
                          Holiday Date: Select the date of the holiday from the
                          calendar.
                        </p>
                        <p className="help-paragraph mb-2">
                          Holiday Description: Provide a brief description of
                          the holiday.
                        </p>

                        <p className="help-paragraph mb-2">
                          Once you've entered all the necessary information,
                          click the "Submit" button to add the holiday to the
                          system.
                        </p>
                        <p className="help-paragraph">
                          We hope this guide helps you navigate and utilize the
                          Holidays feature effectively. If you have any further
                          questions or need assistance, feel free to reach out
                          to our support team.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/Holidays" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help module for our software's Holidays feature!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Searching for Holidays")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To search for a specific holiday, simply type the holiday name in the search box. The results will be displayed accordingly.")}
          </p>
          <p className="help-paragraph">{t("Selecting Dates:")}</p>
          <p className="help-paragraph ">
            {t("To search for a specific holiday, simply type the holiday name in the search box. The results will be displayed accordingly.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Holiday Listings")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("When you search for holidays, you will see a list of results. Each holiday listing includes the date, description, status, and actions for editing or deleting the holiday.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Add Holiday")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To add a new holiday, click on the \"Add Holiday\" button located on the right side of the screen. A form will appear.")}
          </p>
          <p className="heading-list">
            {t("Fill in the required details:")}
          </p>
          <p className="help-paragraph ">
            {t("Holiday Name: Enter the name of the holiday.")}
          </p>
          <p className="help-paragraph ">
            {t("Holiday Date: Select the date of the holiday from the calendar.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Holiday Description: Provide a brief description of the holiday.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("Once you've entered all the necessary information, click the \"Submit\" button to add the holiday to the system.")}
          </p>
          <p className="help-paragraph">
            {t("We hope this guide helps you navigate and utilize the Holidays feature effectively. If you have any further questions or need assistance, feel free to reach out to our support team.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


              {/* {currentRoute === "/Vacations" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help module for our software's Vacation
                    feature!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Searching for Vacations
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To search for a specific vacation, simply type the
                          vacation name in the search box. The results will be
                          displayed accordingly.
                        </p>
                        <p className="help-paragraph">
                          Selecting Dates: You can also search for vacations by
                          selecting a start date and an end date from the
                          calendar. Click on the desired start date and then the
                          end date, and the software will show you the vacations
                          within that time frame.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Vacation Listings</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph ">
                          When you search for vacations, you will see a list of
                          results. Each vacation listing includes the start
                          date, end date, description, status, and actions for
                          editing or deleting the vacation.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Adding a Vacation</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To add a new vacation, click on the "Add Vacation"
                          button located on the right side of the screen. A form
                          will appear.
                        </p>
                        <p className="heading-list">
                          Fill in the required details:
                        </p>
                        <p className="help-paragraph ">
                          Start Date & End Date: Select the start and end dates
                          of the vacation from the calendar.
                        </p>

                        <p className="help-paragraph mb-2">
                          Vacation Description: Provide a brief description of
                          the vacation.
                        </p>

                        <p className="help-paragraph mb-2">
                          Once you've entered all the necessary information,
                          click the "Submit" button to add the vacation to the
                          system.
                        </p>

                        <p className="help-paragraph">
                          We hope this guide helps you navigate and utilize the
                          Vacation feature effectively. If you have any further
                          questions or need assistance, feel free to reach out
                          to our support team.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/Vacations" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help module for our software's Vacation feature!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Searching for Vacations")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To search for a specific vacation, simply type the vacation name in the search box. The results will be displayed accordingly.")}
          </p>
          <p className="help-paragraph">
            {t("Selecting Dates: You can also search for vacations by selecting a start date and an end date from the calendar. Click on the desired start date and then the end date, and the software will show you the vacations within that time frame.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Vacation Listings")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph ">
            {t("When you search for vacations, you will see a list of results. Each vacation listing includes the start date, end date, description, status, and actions for editing or deleting the vacation.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("Adding a Vacation")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To add a new vacation, click on the \"Add Vacation\" button located on the right side of the screen. A form will appear.")}
          </p>
          <p className="heading-list">
            {t("Fill in the required details:")}
          </p>
          <p className="help-paragraph ">
            {t("Start Date & End Date: Select the start and end dates of the vacation from the calendar.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("Vacation Description: Provide a brief description of the vacation.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("Once you've entered all the necessary information, click the \"Submit\" button to add the vacation to the system.")}
          </p>

          <p className="help-paragraph">
            {t("We hope this guide helps you navigate and utilize the Vacation feature effectively. If you have any further questions or need assistance, feel free to reach out to our support team.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}

              {/* {currentRoute === "/ParkingSlot" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help module for our software's Parking
                    Station feature!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Searching for Parking Stations
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          You can search for parking stations by entering the
                          slot name, slot, and address in the respective text
                          boxes. The results will be displayed accordingly.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Mapping the Location</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list ">
                          You have the option to map the location of the parking
                          station on Google Maps. There are three ways to mark
                          the location:
                        </p>
                        <p className="help-paragraph ">
                          Freehand Marking: Use your cursor to draw a shape
                          representing the parking station area on the map.
                        </p>
                        <p className="help-paragraph ">
                          Placing a Square: Place a square marker on the map to
                          indicate the parking station location.
                        </p>
                        <p className="help-paragraph ">
                          Placing a Circle: Place a circular marker on the map
                          to indicate the parking station location.
                        </p>
                        <p className="help-paragraph ">
                          You can also edit or delete the mapped location if
                          needed.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Parking Station Listings
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          All: You can view a list of all parking stations
                          available. Each listing includes the station name,
                          station code, and address.
                        </p>

                        <p className="help-paragraph ">
                          Suggested Parking Stations: You can see suggested
                          parking station addresses that match your search
                          criteria.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Adding a Parking Station
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To add a new parking station, click on the "Add
                          Parking Station" button located on the right side of
                          the page. A form will appear.
                        </p>
                        <p className="heading-list">
                          Fill in the required details:
                        </p>
                        <p className="help-paragraph ">
                          Station Code: Enter the code for the parking station.
                        </p>
                        <p className="help-paragraph ">
                          Station Name: Provide the name of the parking station.
                        </p>
                        <p className="help-paragraph ">
                          Address: Enter the address where the parking station
                          is located.
                        </p>
                        <p className="help-paragraph ">
                          Parking Capacity: Specify the number of available
                          parking spaces.
                        </p>
                        <p className="help-paragraph ">
                          Vehicles: Indicate the types of vehicles allowed in
                          the parking station.
                        </p>
                        <p className="help-paragraph mb-2">
                          Map Location: Map the location of the parking station
                          on Google Maps using any of the available methods.
                        </p>
                        <p className="help-paragraph mb-2">
                          Once you've entered all the necessary information and
                          mapped the location, click the "Submit" button to add
                          the parking station to the system.
                        </p>
                        <p className="help-paragraph ">
                          We hope this guide helps you navigate and utilize the
                          Parking Station feature effectively. If you have any
                          further questions or need assistance, feel free to
                          reach out to our support team.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/ParkingSlot" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help module for our software's Parking Station feature!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Searching for Parking Stations")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("You can search for parking stations by entering the slot name, slot, and address in the respective text boxes. The results will be displayed accordingly.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Mapping the Location")}</Accordion.Header>
        <Accordion.Body>
          <p className="heading-list ">
            {t("You have the option to map the location of the parking station on Google Maps. There are three ways to mark the location:")}
          </p>
          <p className="help-paragraph ">
            {t("Freehand Marking: Use your cursor to draw a shape representing the parking station area on the map.")}
          </p>
          <p className="help-paragraph ">
            {t("Placing a Square: Place a square marker on the map to indicate the parking station location.")}
          </p>
          <p className="help-paragraph ">
            {t("Placing a Circle: Place a circular marker on the map to indicate the parking station location.")}
          </p>
          <p className="help-paragraph ">
            {t("You can also edit or delete the mapped location if needed.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          {t("Parking Station Listings")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("All: You can view a list of all parking stations available. Each listing includes the station name, station code, and address.")}
          </p>

          <p className="help-paragraph ">
            {t("Suggested Parking Stations: You can see suggested parking station addresses that match your search criteria.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          {t("Adding a Parking Station")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To add a new parking station, click on the \"Add Parking Station\" button located on the right side of the page. A form will appear.")}
          </p>
          <p className="heading-list">
            {t("Fill in the required details:")}
          </p>
          <p className="help-paragraph ">
            {t("Station Code: Enter the code for the parking station.")}
          </p>
          <p className="help-paragraph ">
            {t("Station Name: Provide the name of the parking station.")}
          </p>
          <p className="help-paragraph ">
            {t("Address: Enter the address where the parking station is located.")}
          </p>
          <p className="help-paragraph ">
            {t("Parking Capacity: Specify the number of available parking spaces.")}
          </p>
          <p className="help-paragraph ">
            {t("Vehicles: Indicate the types of vehicles allowed in the parking station.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Map Location: Map the location of the parking station on Google Maps using any of the available methods.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Once you've entered all the necessary information and mapped the location, click the \"Submit\" button to add the parking station to the system.")}
          </p>
          <p className="help-paragraph ">
            {t("We hope this guide helps you navigate and utilize the Parking Station feature effectively. If you have any further questions or need assistance, feel free to reach out to our support team.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


              {/* {currentRoute === "/PointOfIntrest" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help module for our software's Point of
                    Interest feature!
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Searching for Locations
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          You can search for specific locations by entering the
                          location name, latitude, longitude, or address in the
                          respective text boxes. The results will be displayed
                          accordingly.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Mapping the Location</Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list ">
                          You have the option to map the location on Google
                          Maps. There are three ways to mark the location:
                        </p>
                        <p className="help-paragraph ">
                          Freehand Marking: Use your cursor to draw a shape
                          representing the area of interest on the map.
                        </p>
                        <p className="help-paragraph ">
                          Placing a Square: Place a square marker on the map to
                          indicate the location.
                        </p>
                        <p className="help-paragraph ">
                          Placing a Circle: Place a circular marker on the map
                          to indicate the location.
                        </p>
                        <p className="help-paragraph ">
                          You can also edit or delete the mapped location if
                          needed.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Viewing Point of Interest Listings
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          You can view a list of all the points of interest
                          available. Each listing includes the location name,
                          address, latitude, and longitude.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Adding a Location</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          Add new location: To add a new location, click on the
                          "Add Location" button located on the right side of the
                          page. A form will appear.
                        </p>
                        <p className="heading-list">
                          Fill in the required details:
                        </p>
                        <p className="help-paragraph ">
                          Location Name: Enter the name of the location.
                        </p>
                        <p className="help-paragraph ">
                          Location Address: Provide the address of the location.
                        </p>
                        <p className="help-paragraph mb-2">
                          Map Location: Map the location on Google Maps using
                          any of the available methods.
                        </p>
                        <p className="help-paragraph mb-2">
                          Once you've entered all the necessary information and
                          mapped the location, click the "Submit" button to add
                          the location to the system.
                        </p>
                        <p className="help-paragraph ">
                          We hope this guide helps you navigate and utilize the
                          Point of Interest feature effectively. If you have any
                          further questions or need assistance, feel free to
                          reach out to our support team.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/PointOfIntrest" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help module for our software's Point of Interest feature!")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Searching for Locations")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("You can search for specific locations by entering the location name, latitude, longitude, or address in the respective text boxes. The results will be displayed accordingly.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("Mapping the Location")}</Accordion.Header>
        <Accordion.Body>
          <p className="heading-list ">
            {t("You have the option to map the location on Google Maps. There are three ways to mark the location:")}
          </p>
          <p className="help-paragraph ">
            {t("Freehand Marking: Use your cursor to draw a shape representing the area of interest on the map.")}
          </p>
          <p className="help-paragraph ">
            {t("Placing a Square: Place a square marker on the map to indicate the location.")}
          </p>
          <p className="help-paragraph ">
            {t("Placing a Circle: Place a circular marker on the map to indicate the location.")}
          </p>
          <p className="help-paragraph ">
            {t("You can also edit or delete the mapped location if needed.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          {t("Viewing Point of Interest Listings")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("You can view a list of all the points of interest available. Each listing includes the location name, address, latitude, and longitude.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("Adding a Location")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("Add new location: To add a new location, click on the 'Add Location' button located on the right side of the page. A form will appear.")}
          </p>
          <p className="heading-list">
            {t("Fill in the required details:")}
          </p>
          <p className="help-paragraph ">
            {t("Location Name: Enter the name of the location.")}
          </p>
          <p className="help-paragraph ">
            {t("Location Address: Provide the address of the location.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Map Location: Map the location on Google Maps using any of the available methods.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Once you've entered all the necessary information and mapped the location, click the 'Submit' button to add the location to the system.")}
          </p>
          <p className="help-paragraph ">
            {t("We hope this guide helps you navigate and utilize the Point of Interest feature effectively. If you have any further questions or need assistance, feel free to reach out to our support team.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


              {/* {currentRoute === "/GeofenceAreas" && (
                <div className="" id="help-main-wrapper">
                  <p className="help-paragraph mb-2">
                    Welcome to the Help module for our software's Geofence Areas
                    feature! Here's a user-friendly guide to help you navigate
                    through the different functionalities:
                  </p>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Searching Geofence Areas
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          To search for a specific location, enter the name,
                          latitude, longitude, or address in the provided text
                          box. The system will display the results.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Mapping Locations on Google Maps
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="heading-list ">
                          You can mark locations on Google Maps in three
                          different ways:
                        </p>
                        <p className="help-paragraph ">
                          Freehand marking: Use your mouse or touch input to
                          draw a shape directly on the map.
                        </p>
                        <p className="help-paragraph ">
                          Square placement: Place a square-shaped marker on the
                          map by clicking on the desired location.
                        </p>
                        <p className="help-paragraph ">
                          Circle placement: Similarly, you can place a circular
                          marker on the map.
                        </p>
                        <p className="help-paragraph ">
                          Editing and Deleting Geofence Locations: If you need
                          to make changes, you have the option to edit or delete
                          the mapped geofence areas. Simply select the specific
                          location on the map and choose the appropriate action.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Viewing All Geofence Areas
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph">
                          To see a comprehensive list of all geofence areas,
                          navigate to the designated section. You'll find the
                          location name, address, latitude, and longitude
                          displayed for each area.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Adding Geofence Areas</Accordion.Header>
                      <Accordion.Body>
                        <p className="help-paragraph mb-2">
                          To add a new geofence area, click on the "Add
                          Geofence" button located on the right side of the
                          page.
                        </p>

                        <p className="help-paragraph mb-2">
                          Fill in the required information, such as Parent Area,
                          Geofence areas, address, Landmark, City/state,
                          Country, and Area speed limit.
                        </p>
                        <p className="help-paragraph mb-2">
                          Use the mapping tools, as mentioned earlier, to mark
                          the location on the Google Map.
                        </p>
                        <p className="help-paragraph mb-2">
                          After mapping, you can further edit or delete the
                          location if needed. Once you're satisfied with the
                          details and the mapped area, submit the form to save
                          the geofence area.
                        </p>
                        <p className="help-paragraph ">
                          We hope this user-friendly guide helps you navigate
                          and utilize the Geofence Areas feature effectively. If
                          you have any further questions or need additional
                          assistance, feel free to reach out to our support
                          team.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )} */}

{currentRoute === "/GeofenceAreas" && (
  <div className="" id="help-main-wrapper">
    <p className="help-paragraph mb-2">
      {t("Welcome to the Help module for our software's Geofence Areas feature! Here's a user-friendly guide to help you navigate through the different functionalities:")}
    </p>

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {t("Searching Geofence Areas")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("To search for a specific location, enter the name, latitude, longitude, or address in the provided text box. The system will display the results.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          {t("Mapping Locations on Google Maps")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="heading-list ">
            {t("You can mark locations on Google Maps in three different ways:")}
          </p>
          <p className="help-paragraph ">
            {t("Freehand marking: Use your mouse or touch input to draw a shape directly on the map.")}
          </p>
          <p className="help-paragraph ">
            {t("Square placement: Place a square-shaped marker on the map by clicking on the desired location.")}
          </p>
          <p className="help-paragraph ">
            {t("Circle placement: Similarly, you can place a circular marker on the map.")}
          </p>
          <p className="help-paragraph ">
            {t("Editing and Deleting Geofence Locations: If you need to make changes, you have the option to edit or delete the mapped geofence areas. Simply select the specific location on the map and choose the appropriate action.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          {t("Viewing All Geofence Areas")}
        </Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph">
            {t("To see a comprehensive list of all geofence areas, navigate to the designated section. You'll find the location name, address, latitude, and longitude displayed for each area.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>{t("Adding Geofence Areas")}</Accordion.Header>
        <Accordion.Body>
          <p className="help-paragraph mb-2">
            {t("To add a new geofence area, click on the 'Add Geofence' button located on the right side of the page.")}
          </p>

          <p className="help-paragraph mb-2">
            {t("Fill in the required information, such as Parent Area, Geofence areas, address, Landmark, City/state, Country, and Area speed limit.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("Use the mapping tools, as mentioned earlier, to mark the location on the Google Map.")}
          </p>
          <p className="help-paragraph mb-2">
            {t("After mapping, you can further edit or delete the location if needed. Once you're satisfied with the details and the mapped area, submit the form to save the geofence area.")}
          </p>
          <p className="help-paragraph ">
            {t("We hope this user-friendly guide helps you navigate and utilize the Geofence Areas feature effectively. If you have any further questions or need additional assistance, feel free to reach out to our support team.")}
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
)}


            </div>
            
            <div className="footer">
              <div className="">
              <div className="d-flex mb-4">
              <label htmlFor="">{t("Disable Help menu ?")}</label>
              <div className="inner-footer " style={{marginLeft :'3.89rem'}}>
                <button className="cx-btn-2" onClick={handleDisableHelp}>{t("Yes")}</button>
                {/* <button className="cx-btn-1">{t("No")}</button> */}
              </div>
              </div>
              <div className="d-flex">
              <label htmlFor="">{t("Was this information helpful")} ?</label>
              <div className="inner-footer">
                <button className="cx-btn-2">{t("Yes")}</button>
                <button className="cx-btn-1">{t("No")}</button>
              </div>
              </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default InfoComponent;
