export const isValidRoute = (
  route,
  dynamic,
  accessRights,
  addonSettingData,
  userRole,
  userRokleCustomer,
  key
) => {
  let dynamicRoute =
    dynamic != undefined && dynamic?.length > 0
      ? dynamic?.map((route) => route.role_route)
      : [];

  dynamicRoute.length > 0 && localStorage.setItem("allRoute", JSON.stringify(dynamicRoute))
  let updatedData = localStorage.getItem("allRoute")
  let parsedData = updatedData ? JSON.parse(updatedData) : [];

  const excludedRoutes = ['/DashboardShare', '/ShareTrip'];
  const validRoutes = [
    "/ReplayPlayback",
    "/ParkingSlot",
    "/PointOfIntrest",
    "/GeofenceAreas",
    "/AddParkingSlot",
    "/AddPointOfInterest",
    "/AddGeofenceArea",








    "/OfferVehicleMarketPlace",
    "/OfferDriverMarketPlace",
    "/DirectOrderMarketPlace",
    "/OnlineAuction",
    "/TaxExpiryReport",
    "/RegistrationExpiryReport",
    "/InsuranceExpiryReport",
    "/InspectionDueReport",
    "/MaintenanceDuesSoonReport",
    "/DriverLicenceExpiryReport",
    "/VehicleFuelExpenseReport",
    "/VehicleExpenseReport",
    "/MaintenanceOverduesReport",
    "/PickUpPointReport",
    "/TeamMessages",
    "/TeamComposeMessage",
    "/TripActivityReport",
    "/TripManifestReport",
    "/TripAssignedVersusCompleted",
    "/DispatchCustomerOrderReport",
    "/LiveTripLocationReport",
    "/TripVersusPickupCount",
    "/Temperaturereport",
    "/Alert",
    "/ViewOrdersShare",
    "/DriverActivertiyReport",
    "/DriverActivetySummaryReport",
    "/DriverListignitionReport",
    "/DriverBehaviourReport",
    "/TripScheduleEta",
    "/Importdata",
    "/DispatchReport",
    "/RealTimeReport",
    "/UnplannedTripsAutorouting",
    "/NotificationDetails2",
    "/DispatchDashboard",
    "/VehicleLocationReport",
    "/VehicleCountAndCapacity",
    "/VehicleparkingSlot",
    "/ImmobiliserReport",
    "/VehicleLocationSignal",
    "/DashboardDispatch",
    "/VehicleRunningReport",
    "/TripActivity",
    "/test",
    "/ReportFilter",
    "/Reportsall",
    "/Reports",
    " /tripreport",
    "/ReportOverSpeedView",
    "/DashboardShare",
    '/ShareTrip',
    "/VehicleAvailabilityList",
    "/Paid",
    "/Invoiced",
    "/VehicleAvailability",
    "/AvailableVehicleList",
    "/DriverAvailabilityList",
    "/NotificationDetails",
    "/Announcement",
    "/Addaudio",
    "/Email",
    "/EmailDetails",
    "/PushNotification",
    "/NotificationDetails",
    "/MyMessages",
    "/Reports",
    "/GenerateCustomReport",
    "/ScheduleReport",
    "/CreateUser",
    "/AllUsers",
    "/ReportDistributionContactsDetails",
    "/GenerateCustomReport",

    "/ConfigurationChecker",
    "/ParkingManagement",
    "/MyProfile",
    "/FuelManagementDashbord",
    "/FuelManagementDetails",
    "/FuelAlerts",
    "/VehicleNotification",
    //masterStting


    "/AcessRole",
    ///new start
    "/EditProfile",
    "/ChangePasswordProfile",
    "/LockScreen",
    "/Announcement",

    "/Addaudio",

    "/EditAudio",

    "/Email",

    "/EmailDetails",

    "/ComposeEmail",

    "/PushNotification",
    "/NotificationDetails",
    "/ComposeMessage",

    "/MyMessages",
    "/ReportView",
    "/DeliveryReports",
    "/AddPushNotification",
    "/AddTripFleet",
    "/EmailDetailsTm",
    "/EmailDetails",
    "/ComposeEmail",
    "/ComposeEmailHelpler",
    "/DynamicPassword",
    "/ChangePassword",
    "/ChangeDriverPassword",
    "/ChangePassDelivery",
    "/ChangeFleetPass",
    "/ChangeDelPass",
    "/AddDynamicUser",
    "/ViewDynamic",
    // Dispatch Executive
    "/DispatchViewOrder",
    "/AddMerchant_temp",
    "/AddNewOrder",
    "/ViewInvoice",
    "/EditInvoice",
    "/Registration",
    "/Register",

    //Report new Valid routes
    "/ReportsAndStatisticsUsageAudit",
    "/DataUsageR",
    "/MobileAppDetailsR",
    "/TrackingdevicesAndSimDetailsR",
    "/lastLoginDetailsR",
    "/mobleAppUsageDetailsR",
    ...parsedData,
  ];
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_dashboard_map)
  ) {
    validRoutes.push("/Dashboard", "/dashboard");
  }
  if ((userRole === "customer") || (accessRights && accessRights?.rights_view_customer_profile == 1)
  ) {
    validRoutes.push("/CustomerProfile");
  }
  if (
    (userRole === "customer") ||
    // (accessRights && accessRights?.rights_manage_master_customer_profile==1) ||
    (accessRights && accessRights?.rights_manage_customer_profile == 1)
  ) {
    validRoutes.push(
      "/CustomerProfile",
      "/UpdateCustomerProfile",
      "/UpdateCustomerLogo",
      "/LogoUpdate",
      "/UpdateCustomerLogo/logo_logo",
      "/UpdateCustomerLogo/logo_map_logo",
      "/UpdateCustomerLogo/logo_email",
      "/UpdateCustomerLogo/logo_email_banner",
      "/UpdateCustomerLogo/logo_map_bus",
      "/UpdateCustomerLogo/logo_map_bus_available",
      "/UpdateCustomerLogo/logo_bus_idle",
      "/UpdateCustomerLogo/logo_map_bus_untracked",
      "/UpdateCustomerLogo/logo_trip_start_point",
      "/UpdateCustomerLogo/logo_trip_end_point",

    );
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_general_settings)
  ) {
    validRoutes.push("/GeneralSetting");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_integration_settings)
  ) {
    validRoutes.push("/IntegrationSetting");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_transportation_settings)
  ) {
    validRoutes.push("/TransportationSetting");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_notification_settings)
  ) {
    validRoutes.push("/NotificationSetting");
  }
  // "/ReportView"
  if (
    userRokleCustomer == "customer"
    // &&
    // accessRights && accessRights?.rights_manage_access_rights
  ) {
    validRoutes.push("/AccessRight", "/UserRole");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights.rights_view_addon_settings)
  ) {
    validRoutes.push("/AddOnSettings");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights.rights_manage_addon_settings)
  ) {
    validRoutes.push("/AddOnSettings", "/AddOnSettingsCart");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights.vehicle_running_report)
  ) {
    validRoutes.push("/ReportView",);
  }

  if (
    userRole === "customer" ||
    (accessRights && accessRights.rights_view_vehicle || accessRights?.rights_view_vehicle || accessRights?.rights_view_vehicletype || accessRights?.rights_view_vehiclesync || accessRights?.rights_view_vehiclegroup || accessRights?.rights_view_hardware_feature_set)
  ) {
    validRoutes.push("/Vehicle", "/VehicleDetails");
  }

  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_vehicle)
  ) {
    validRoutes.push(
      "/Vehicle",
      "/VehicleDetails",
      "/AddVehicle",
      "/AddVehicleGroup",
      "/NewSyncRequest",
      "/VehicleDetails"
    );
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_vehicletype)
  ) {
    validRoutes.push("/Vehicle");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_vehicletype)
  ) {
    validRoutes.push("/AddVehicleCategory");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_holiday)
  ) {
    validRoutes.push("/Holidays");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_holiday)
  ) {
    validRoutes.push("/Holidays", "/AddHolidays");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_vacation)
  ) {
    validRoutes.push("/Vacations");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_vacation)
  ) {
    validRoutes.push("/Vacations", "/AddVacation");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_parking_station)
  ) {
    validRoutes.push("/ParkingSlot");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_parking_station)
  ) {
    validRoutes.push("/ParkingSlot");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_parking_station)
  ) {
    validRoutes.push("/AddParkingSlot");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_point_of_interest)
  ) {
    validRoutes.push("/PointOfIntrest");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_point_of_interest)
  ) {
    validRoutes.push(
      "/PointOfIntrest",
      "/AddPointOfInterest",
      "/EditPointOfInterest"
    );
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_geofence_area)
  ) {
    validRoutes.push("/GeofenceAreas");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_geofence_area)
  ) {
    validRoutes?.push(
      "/GeofenceAreas",
      "/AddGeofenceArea",
      "/EditGeofenceArea",
      "/AddGeofenceArea"
    );
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_hardware_feature_set)
  ) {
    validRoutes.push("/FeatureSet");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_replay_or_paybacks)
  ) {
    validRoutes.push("/ReplayPlayback");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_parking_management)
  ) {
    validRoutes.push("/ParkingManagement");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_trips)
  ) {
    validRoutes.push("/TripManagement", "/ViewDispatchTrip", "/ViewStop",);
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_trips)
  ) {
    validRoutes.push(
      "/TripManagement",
      "/ViewDispatchTrip",
      "/EditDispatchTrip",
      "/ViewStop",
      "/EditStop"
    );
  }

  if (addonSettingData?.addon_dispatch) {
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_dispatch_settings)
    ) {
      validRoutes.push("/DispatchSetting");
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_helper)
    ) {
      validRoutes.push("/DeliveryPerson", "/ViewDeliveryPerson");
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_helper)
    ) {
      validRoutes.push(
        "/DeliveryPerson",
        "/AddDeliveryPerson",
        "/ViewDeliveryPerson",
        "/ChangePassDelivery"
      );
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_dispatch_customer)
    ) {
      validRoutes.push("/ViewDispatch", "/DispatchCustomer");
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_dispatch_customer)
    ) {
      validRoutes.push(
        "/ViewDispatch",
        "/DispatchCustomer",
        "/DispatchCustomer",
        "/AddDispatchCustomer",
        "/EditCustomerDispatch"
      );
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_orders)
    ) {
      validRoutes.push("/ViewDispatch", "/DispatchCustomer");
    }
    validRoutes.push(
      "/DispatchOrder",
      "/ViewOrders",
      "/VehicleBooking",
      "/VehicleBooking2",
      "/VehicleBookingList",
      "/DeliveryRequest",
      "/AddOrder",
      "/Merchant",
      "/AddMerchant",
      "/EditMerchant",
      "/ManualRouting",
      "/ViewMerchant"
    );
  }
  //user Section
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_admin)
  ) {
    validRoutes.push("/administrator", "/view");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_tm)
  ) {
    validRoutes.push("/TransportManager", "/ViewTransportManager");
  }
  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_tm)
  ) {
    validRoutes.push(
      "/TransportManager",
      "/AddTransportManager",
      "/EditTransportManager",
      "/ViewTransportManager",
      "/ChangePassword"
    );
  }

  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_manage_driver)
  ) {
    validRoutes.push(
      "/Drivers",
      "/AddDrivers",
      "/ViewDrivers",
      "/ChangeDriverPassword"
    );
  }

  if (
    userRole === "customer" ||
    (accessRights && accessRights?.rights_view_driver)
  ) {
    validRoutes.push("/Drivers", "/ViewDrivers");
  }

  if (addonSettingData?.addon_fleetmanager_role) {
    if (userRole === "customer" || accessRights?.rights_view_fleet_manager) {
      validRoutes.push("/ViewFleetManager", "/FleetManager");
    }
    if (userRole === "customer" || accessRights?.rights_manage_fleet_manager) {
      validRoutes?.push(
        "/FleetManager",
        "/AddFleetManager",
        "/ViewFleetManager",
        "/ChangeFleetPass"
      );
    }
  }

  if (addonSettingData?.addon_busassistant_role) {
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_vehicle_assistants)
    ) {
      validRoutes.push("/VehicleAssistants", "/ViewVehicleAssistants");
    }

    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_vehicle_assistants)
    ) {
      validRoutes?.push(
        "/VehicleAssistants",
        "/ViewVehicleAssistants",
        "/ChangeDelPass",
        "/AddVehicleAssistants"
      );
    }
  }



  if (addonSettingData?.addon_vehicle_expense) {
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_accident)
    ) {
      validRoutes.push("/VehicleAccident", "/ViewVehicleAccident",);
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_accident)
    ) {
      validRoutes.push("/VehicleAccident", "/ViewVehicleAccident", "/AddVehicleAccident", "/EditVehicleAccident",);

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_accessory)
    ) {
      validRoutes.push("/VehicleAccesory", "/AddVehicleAccesory", "/ViewVehicleAccesory",);


    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_accessory)
    ) {
      validRoutes.push("/VehicleAccesory",);

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_spare_parts)
    ) {
      validRoutes.push("/VehicleSpareParts", "/ViewVehicleSpareParts");
    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_spare_parts)
    ) {
      validRoutes.push("/VehicleSpareParts", "/ViewVehicleSpareParts", "/AddVehicleSpareParts",
        "/EditVehicleSpareParts",
        "/ViewVehicleSpareParts",);

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_fine)
    ) {
      validRoutes.push("/VehicleFine", "/ViewVehicleFine");

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_fine)
    ) {
      validRoutes.push("/ViewVehicleFine", "/VehicleFine",
        "/AddVehicleFine",
        "/ViewVehicleFine",
        "/EditVehicleFine",);

    }
    if (

      accessRights && accessRights?.rights_view_vehicle_maintainance
    ) {
      excludedRoutes.push("/ViewVehicleMaintenance")
      validRoutes.push("/ViewVehicleMaintenance", "/VehicleMaintenance", "/ViewVehicleMaintenance1");

    }
    if (
      accessRights && accessRights?.rights_manage_vehicle_maintainance
    ) {
      excludedRoutes.push("/ViewVehicleMaintenance")
      validRoutes.push("/VehicleMaintenance",
        "/AddVehicleMaintenance",
        "/ViewVehicleMaintenance",
        "/EditVehicleMaintenance", "/ViewVehicleMaintenance1");

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_view_fuel_expenses)
    ) {
      validRoutes.push("/FuelExpenses", "/ViewFuelExpenses",);

    }
    if (
      userRole === "customer" ||
      (accessRights && accessRights?.rights_manage_fuel_expenses)
    ) {
      validRoutes.push("/FuelExpenses", "/ViewFuelExpenses", "/FuelExpenses",
        "/AddFuelExpenses",
        "/ViewFuelExpenses",
        "/EditFuelExpenses",);

    }


  }

  if (addonSettingData?.addon_manual_routing) {
    validRoutes?.push("/ManualRouting");
  }
  if (addonSettingData?.addon_driver_assessment) {
    validRoutes?.push(
      "/LogChanges",
      "/AvailableVehicleList",
      "/VehicleAvailability",
      "/DriverAvailabilityList",
      "/DriverDutyRoaster"
    );
  }
  if (addonSettingData?.addon_vehicle_inspection) {
    validRoutes.push(
      "/VehicleInspectionDashboard",
      "/VehicleInspection",
      "/VehicleInspectionSettings",
      "/ViewInspectionDetails",
      "/NewInspection",
      "/NewVehicleInspection"
    );
  }
  if (addonSettingData?.addon_vehicle_marketplace) {
    validRoutes.push(
      "/OfferVehicleMarketPlace",
      "/OfferDriverMarketPlace",
      "/OnlineAuctionMarketPlace",
      "/DirectOrderConfirmation",
      "/DirectOrderOfferLoad",
      "/OnlineAuctionVehicleDetails",
      "/AuctionReferenceDetails",
      "/BidAuctionDetails",
      "/DirectOrderReferenceDetails",
      "/AuctionOfferDetails",
      "/OrderConfDetails",
      "/OnlineAuction",
      "/DirectOrderVehicleDetails",
      "/DirectOrderMarketPlace"
    );
  }
  const isValidata = validRoutes?.some((dataRoute) => {
    if (excludedRoutes.includes(dataRoute)) {
      if (route?.includes(excludedRoutes[0])) {
        return true
      }
      if (route?.includes(excludedRoutes[1])) {
        return true
      }
      if (route?.includes(excludedRoutes[2])) {
        return true
      }
    } else {
      const dataRouteRegex = new RegExp(`^${dataRoute?.toLowerCase()}(\/[\\dA-Za-z]+)?$`);
      return dataRouteRegex.test(route?.toLowerCase());
    }

  });
  return isValidata;


};
