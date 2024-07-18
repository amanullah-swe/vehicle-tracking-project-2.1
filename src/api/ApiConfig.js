// const BASE_URL = "http://192.168.1.68:3002/"  /// Zulkharnain
// const BASE_URL = "http://192.168.1.70:3002/"  /// chandni
// const BASE_URL = "http://192.168.16.1:3002/"  /* amer */
// const BASE_URL = "http://192.168.56.1:3002/"  /* amer */
// const BASE_URL = "http://192.168.1.38:3002/"  /* amer */

//  const BASE_URL = "http://192.168.1.45:3002/"  /// vinod//



// const BASE_URL = "http://192.168.0.148:3002/"  /// amir wifi /
// 
const BASE_URL = "https://api.vehicletracking.qa:3002/";   /* Stage */
// const BASE_URL = "https://api.vehicletracking.qa:3002/";
// const BASE_URL = "http://203.129.225.99:3002/"  /// AWD server

// const BASE_URL = "https://api.vehicletracking.qa:3000/"; /// VT

export const ApiConfig = {
  BASE_URL_SHARE: "https://api.vehicletracking.qa:3000/",
  BASE_URL: BASE_URL,
  BASE_URL_FOR_IMAGES: BASE_URL,
  BASE_URL_FOR_IMAGES_L: "https://app.vehicletracking.qa/",
  /* Vehicle API url Start*/
  USER_LOGIN: BASE_URL + 'login',
  brand: BASE_URL + 'brand',
  USER_FORGET: BASE_URL + 'forgetpassword',
  USER_OTPVERIFICATION: BASE_URL + 'changepassword',
  // USER MODAL ///
  NOTIFICATION_API: BASE_URL + 'notification/notification-list',
  USER_ADMINISTRATOR: BASE_URL + 'Administrator/List',
  USER_ADMINISTRATOR_PROFILE: BASE_URL + 'Administrator/Profile',
  USER_ADMINISTRATOR_EXPORT: BASE_URL + 'Administrator/exports',
  USER_TRANSPORT: BASE_URL + 'TransportManager/List',
  USER_TRANSPORT_VIEW: BASE_URL + 'TransportManager/Profile',
  USER_TRANSPORT_ADD: BASE_URL + 'TransportManager/Add',
  USER_TRANSPORT_UPDATE: BASE_URL + 'TransportManager/UpdateProfile',
  USER_TRANSPORT_CHANGEPASSWORD: BASE_URL + 'TransportManager/ChangePassword',
  USER_TRANSPORT_BLOCK: BASE_URL + 'TransportManager/Block',
  USER_TRANSPORT_UN_BLOCK: BASE_URL + 'TransportManager/UnBlock',
  USER_TRANSPORT_Resigned: BASE_URL + 'TransportManager/Resigned',
  USER_TRANSPORT_Un_Resigned: BASE_URL + 'TransportManager/UnResigned',
  USER_TRANSPORT_DELETE: BASE_URL + 'TransportManager/Delete',
  /// Delivery Person ///
  DELIVERY_PERSON_LIST: BASE_URL + 'DeliveryPerson/List',
  DELIVERY_PERSON_VIEW: BASE_URL + 'DeliveryPerson/Profile',
  DELIVERY_PERSON_CHANGE_PASSWORD: BASE_URL + 'DeliveryPerson/ChangePassword',
  DELIVERY_PERSON_BLOCK: BASE_URL + 'DeliveryPerson/Block',
  DELIVERY_PERSON_UN_BLOCK: BASE_URL + 'DeliveryPerson/UnBlock',
  DELIVERY_PERSON_RESIGNED: BASE_URL + 'DeliveryPerson/Resigned',
  DELIVERY_PERSON_UN_RESIGNED: BASE_URL + 'DeliveryPerson/UnResigned',
  DELIVERY_PERSON_DELETE: BASE_URL + 'DeliveryPerson/Delete',
  DELIVERY_PERSON_DRUPDOWN: BASE_URL + 'DeliveryPerson/DropdownList',
  DELIVERY_PERSON_ADD: BASE_URL + 'DeliveryPerson/Add',
  DELIVERY_PERSON_UPDATE: BASE_URL + 'DeliveryPerson/UpdateProfile',
  //Fleet Manager
  FLEET_ADD: BASE_URL + 'FleetManager/Add',
  FLEET_UPDATE_PROFLIE: BASE_URL + 'FleetManager/UpdateProfile',
  FLEET_MANAGER_LIST: BASE_URL + 'FleetManager/List',
  FlEET_MANAGER_BLOCK: BASE_URL + 'FleetManager/Block',
  FlEET_MANAGER_UN_BLOCK: BASE_URL + 'FleetManager/UnBlock',
  FLEET_MANAGER_RESIGEN: BASE_URL + 'FleetManager/Resigned',
  FLEET_MANAGER_UN_RESIGEN: BASE_URL + 'FleetManager/UnResigned',
  FLEET_MANAGER_DELETE: BASE_URL + 'FleetManager/Delete',
  FLEET_MANAGER_CHANGE_PASSWOED: BASE_URL + 'FleetManager/ChangePassword',
  FLEET_MANAGER_VIEW: BASE_URL + 'FleetManager/Profile',
  //Vehicle Asistants
  VEHICLE_ASISTANTS_ADD: BASE_URL + 'VehicleAsistant/Add',
  VEHICLE_ASISTANTS_UPDATE: BASE_URL + 'VehicleAsistant/UpdateProfile',
  VEHICLE_ASISTANTS_LIST: BASE_URL + 'VehicleAsistant/List',
  VEHICLE_ASISTANTS_BLOOK: BASE_URL + 'VehicleAsistant/Block',
  VEHICLE_ASISTANTS_UN_BLOOK: BASE_URL + 'VehicleAsistant/UnBlock',
  VEHICLE_RESIGEN: BASE_URL + 'VehicleAsistant/Resigned',
  VEHICLE_UN_RESIGEN: BASE_URL + 'VehicleAsistant/UnResigned',
  VEHICLE_ASISTANTS: BASE_URL + 'VehicleAsistant/Delete',
  VEHICLE_ASISTANTS_PROFLIE: BASE_URL + 'VehicleAsistant/Profile',
  VEHICLE_ASISTANTS_CHANGE_PASSWORD:
    BASE_URL + 'VehicleAsistant/ChangePassword',
  // Drivers
  DRIVERS_ADD: BASE_URL + 'drivers/addNewDriver',
  DRIVER_DROPDOWN: BASE_URL + 'drivers/driver_drodown',
  DRIVERS_UPDATE: BASE_URL + 'drivers/updateDriverDetails',
  DRIVER_PROFLE: BASE_URL + 'drivers/driverDetails',
  DRIVERS_LIST: BASE_URL + 'drivers/driversList',
  DRIVERS_BLOCK: BASE_URL + 'drivers/blockUser',
  DRIVERS_UN_BLOCK: BASE_URL + 'drivers/UnBlock',
  DRIVERS_RESIGEN: BASE_URL + 'drivers/resignUser',
  DRIVERS_UN_RESIGEN: BASE_URL + 'drivers/UnResigned',
  DRIVERS_DELETE: BASE_URL + 'drivers/deleteUser',
  DRIVERS_PASSWORD: BASE_URL + 'drivers/updatePassword',
  DRIVERS_TRIPS: BASE_URL + 'drivers/tripDetails',
  ///Vehicle Accident
  VEHICLE_ACCIDENT_LIST: BASE_URL + 'api/vehicle-accident',
  VEHICLE_PROFLIE: BASE_URL + 'api/vehicle-accident-details',
  VEHICLE_ASSISTANTS: BASE_URL + 'api/delete-vehicle-accident-details',
  VEHICLE_ASSISTANTS_ADD: BASE_URL + 'api/create-vehicle-accident-details',
  VEHICLE_ACCIDENT_UPDATE: BASE_URL + 'api/update-vehicle-accident-details',
  VEHICLE_ACCIDENT_DRAIVER_LIST: BASE_URL + 'api/driver-details',
  VEHICLE_ACCIDENT_VEHICALE_LIST: BASE_URL + 'api/vehicle-details',
  VEHICLE_ACCIDENT_FILTER: BASE_URL + 'api/search-vehicle-accident',
  VEHICLE_ACCIDENT_INVOICE_DELETE: BASE_URL + 'api/delete-expenses-file',
  VEHICLE_ACCIDENT_INVOICE_UPDATE: BASE_URL + 'api/create-expenses-file',


  //Vehicle Accessory
  Vehicle_ACCESSORY_LIST: BASE_URL + 'api/vehicle-accessory-list',
  Vehicle_ACCESSORY_DELETE: BASE_URL + 'api/delete-accessory-details',
  Vehicle_ACCESSORY_Profile: BASE_URL + 'api/vehicle-accessory-details/',
  Vehicle_ACCESSORY_ADD: BASE_URL + 'api/add-accessory-details',
  Vehicle_ACCESSORY_Update: BASE_URL + 'api/edit-accessory-details',
  Vehicle_ACCESSORY_FILTER: BASE_URL + 'api/search-accessory-details',

  VEHICLE_SPARE_PARTS: BASE_URL + 'api/vehicleSparepartsList',
  VEHICLE_SPARE_PARTS_DELETE: BASE_URL + 'api/deleteVehicleSpareparts',
  Vehicle_ACCESSORY_PROFLIE: BASE_URL + 'api/vehicleSparepartsDetailsById/',
  Vehicle_Accessory_update: BASE_URL + 'api/updateVehicleSpareParts',
  VEHICLE_ACCESSORY_ADD: BASE_URL + 'api/newVehicleSpareparts',
  VEHICLE_SPARE_PART: BASE_URL + 'api/searchSparepartDetails',

  /// Vehicle Fine //
  VEHICLE_FINE: BASE_URL + 'api/vehicleFineList',
  VEHICLE_FINE_DELTE: BASE_URL + 'api/deleteFine',
  VEHICLE_FINE_PROFILE: BASE_URL + 'api/singleFineDetails/',
  VEHICLE_FINE_ADD: BASE_URL + 'api/newVehicleFine',
  VEHICLE_FINE_UPDATE: BASE_URL + 'api/updateVehicleFine',
  VEHICLE_FINE_FILTER: BASE_URL + 'api/searchFinesDetails',
  // Vehicle Feet
  VEHICLE_FLEET_LIST: BASE_URL + 'api/fleet-maintainance-list',
  VEHICLEFLEET_DELETE: BASE_URL + 'api/delete-fleet-maintainance-details',
  VEHICLEFLEET_PROFLIE: BASE_URL + 'api/view-fleet-maintainance/',
  VEHICLEFLEET_ADD: BASE_URL + 'api/add-fleet-maintainance-details',
  VEHICLFLEET_UPDATE: BASE_URL + 'api/edit-fleet-maintainance-details',
  VEHICLEFLEET_FILTER: BASE_URL + 'api/search-fleet-maintainance-details',

  /// Vehicle Fuel
  VEHICLE_FUEL_LIST: BASE_URL + 'api/fuel-expenses-list',
  VEHICLE_FUEL_DELETE: BASE_URL + 'api/delete-fuel-expenses',
  VEHICLE_FUEL_FILTER: BASE_URL + 'api/search-fuel-expenses',
  VEHICLE_FUEL_PROFLIE: BASE_URL + 'api/view-fuel-expenses/',
  VEHICLE_FUEL_ADD: BASE_URL + 'api/add-fuel-expenses',
  VEHICLE_FUEL_UPDATE: BASE_URL + 'api/edit-fuel-expenses',

  /// New Vehicle Maintenance
  MAINTENANCE_LIST: BASE_URL + 'api/maintainance-list',
  MAINTENANCE_VIEW_ALL: BASE_URL + 'api/view-maintainance/',
  ADD_VEHICLE_MAINTENANCE: BASE_URL + 'api/add-vehicle-maintainance',
  UPDATE_VEHICLE_MAINTENANCE: BASE_URL + 'api/update-mainatainance-details',
  SINGLE_VEHICLE_MAINTENANCE_DETAILS:
    BASE_URL + 'api/single-view-maintainance/',
  /// Comincation Modul
  COMINCATION_LIST: BASE_URL + 'communication/announcement-list',
  ADD_CMINICATION: BASE_URL + 'communication/announcement-add',
  COMINCATION_PROFLIE:
    BASE_URL + 'communication/announcement-view?announcement_id=',
  COMINCATION_UPDATE: BASE_URL + 'communication/announcement-update',
  COMINCATION_DELETE: BASE_URL + 'communication/announcement-delete',

  // Push Notifaction
  PUSH_NOTIFACTION_TRANSPORT_LIST:
    BASE_URL + 'communication/push-transport-list',
  PUSH_NOTIFACTION_DRIVER_LIST:
    BASE_URL + 'communication/push-notification-list',
  PUSHI_NOTIFICATION_PROFLIE: BASE_URL + 'communication/push-notification-view',
  PUSHI_NOTIFICATION_TM: BASE_URL + 'communication/push-transport-view',
  ADD_PUSH_TM: BASE_URL + 'communication/push-transport-add',
  ADD_PUSH_VEICILE: BASE_URL + 'communication/push-notification-add',
  TRASPORTATION_LIST: BASE_URL + 'communication/push-transport-drop-down',
  DERIVER_VECHILE_LIST: BASE_URL + 'communication/push-notification-drop-down',
  DROP_DOWN_LIST_DRIVER:
    BASE_URL + 'communication/push-driver-vehicle-drop-down',

  // Email
  ADMINISTRATOR_EMAIL: BASE_URL + 'communication/email-staff-list',
  EMAIL_DRIVER_AND_DELIVER: BASE_URL + 'communication/email-drivers-list',
  EMAIL_HELPER_LIST: BASE_URL + 'communication/email-helper-list',
  VIEW_EMAIL_TM: BASE_URL + 'communication/email-user-profile-view',
  VIEW_DRIVER: BASE_URL + 'communication/email-drivers-profile',
  VIEW_ASSISMENT: BASE_URL + 'communication/email-helper-profile',
  ADD_TM: BASE_URL + 'communication/email-user-add',
  ADD_DRIVER: BASE_URL + 'communication/email-drivers-add',
  ADD_VEHICLE: BASE_URL + 'communication/email-helper-add',

  // Chat Support
  COMPOSE_MESSAGE_ADD: BASE_URL + 'chat/compose-message',
  USERS_LIST: BASE_URL + 'chat/users-list',
  RECENT_CHAT_USER: BASE_URL + 'chat/recent-chats',
  RECENT_CHAT_USER_New: BASE_URL + 'chat/recent-chats',
  RECENT_CHAT_HISTERY: BASE_URL + 'chat/chat-history',
  RECENT_CHAT_DELETE: BASE_URL + 'chat/delete-message',
  SAERCH_USER: BASE_URL + 'chat/search-user',
  UPLOAD_CHAT_FILES: BASE_URL + 'chat/upload-file',

  //maintenance
  MANTENANCE_REPORT: BASE_URL + 'customer/reports/maintenance/overdues',
  MANTENANCE_DUES_SOON_REPORT: BASE_URL + 'customer/reports/maintenance/maintenanceduesoon',
  MANTENANCE_DRIVER_lICENCE_EXPIRY: BASE_URL + 'customer/reports/drivervehicle/driverlicenceexpiry',
  //// Export Api
  TRASPORTATION_EXPORT: BASE_URL + 'TransportManager/exports',
  DRIVER_EXPORT: BASE_URL + 'drivers/exports',
  DELAVER_PARSON: BASE_URL + 'DeliveryPerson/exports',
  FLEEET_MANAGER: BASE_URL + 'FleetManager/exports',
  VEHICEL_ASISTAN_EXPORT: BASE_URL + 'VehicleAsistant/exports',
  VEHICLE_ACCIDENT_EXPORT: BASE_URL + 'api/vehicle-accident-list-export',
  VEHICLE_EXSIDENT_EXPORT: BASE_URL + 'api/search-vehicle-accident-export',
  VEHICLE_ACCESSORY_LIST_EXPORT: BASE_URL + 'api/vehicle-accessory-list-export',
  VEHICLE_ACCESSORY_FILTER_EXPORT:
    BASE_URL + 'api/search-accessory-details-export',
  VEHICLE_SPARE_PARTS_LIST_EXPORT:
    BASE_URL + 'api/vehicle-Spare-Parts-List-export',
  VEHICLE_SPARE_PART_FILTER: BASE_URL + 'api/Search-Spare-parts-Details-export',
  FLEET_MANTENSE_LIST_EXPORT: BASE_URL + 'api/fleet-maintainance-list-export',
  VEHICLE_MANTENSE_FILTER:
    BASE_URL + 'api/search-fleet-maintainance-details-export',
  VEHICLE_FINE_LIST_EXPORT: BASE_URL + 'api/vehicle-fine-list-export',
  VEHICLE_FINE_FILTER_EXPORT: BASE_URL + 'api/search-fine-details-export',
  VEHICEL_FULE_LIST_EXPORT: BASE_URL + 'api/fuel-expenses-list-export',
  VEHICEL_FULE_FILTER: BASE_URL + 'api/search-fuel-expenses-export',
  ANNOUNCEMENT_EXPORT: BASE_URL + 'communication/announcement-list-export',
  EMAIL_LIST_EXPORTL: BASE_URL + 'communication/email-staff-list-export',
  EMAIL_DRIVER_EXPORT: BASE_URL + 'communication/email-drivers-list-export',
  VEHICLE_LIST_EXPOERT: BASE_URL + 'communication/email-helper-list-export',
  PUSH_NOTIFACTION_EXPORT:
    BASE_URL + 'communication/push-transport-list-export',
  PUSHI_NOTIFICATION_DRIVER_EXPOERT:
    BASE_URL + 'communication/push-notification-list-export',
  PUSH_NOTIFACTION_VEJICLOE_EXPORT:
    BASE_URL + 'communication/push-notification-list-export',
  TRIPE_LIST: BASE_URL + 'trip/trip-list-export',
  HOLIDAYA_LIST_EXPORT: BASE_URL + 'holiday/getFilterHoliday-export',
  VACATION_LIST_EXPORT: BASE_URL + 'vacation/FilterVacations-export',
  PARKING_POINT_OF_INTERST: BASE_URL + 'ParkingStation/List-export',
  POINT_OF_INTEREST_EXPORT:
    BASE_URL + 'PointOfInterest/getFilterLocation-export',
  GEOFANCE_AREA_LIST_EXPORT: BASE_URL + 'geofence/filterGeofenceArea-export',

  // USER Role Api

  USERS_ROLE_CREATE_API: BASE_URL + 'accessRights/create-role',
  USERS_ROLE_LIST: BASE_URL + 'accessRights/role-list',
  USER_ROLE_ALL_LIST: BASE_URL + 'accessRights/AllRoles',
  USER_ROLE_DELETE: BASE_URL + 'accessRights/delete-role',
  USERS_ROLE_VIEW: BASE_URL + 'accessRights/view-role/',
  UPDATE_USER_ROLE: BASE_URL + 'accessRights/update-role',
  LIST_USER_ROLE: BASE_URL + 'DynamicUsers/List',
  ADD_USER_ROLE: BASE_URL + 'DynamicUsers/Add',
  USER_PROFILE: BASE_URL + 'DynamicUsers/Profile',
  USER_CHANGE_PASSOWRD: BASE_URL + 'DynamicUsers/ChangePassword',
  USER_UPDATE_PASSWORD: BASE_URL + 'update-user-password',
  USER_ROLE_BLOCK: BASE_URL + 'DynamicUsers/Block',
  USER_ROLE_UNBLOCK: BASE_URL + 'DynamicUsers/UnBlock',
  USER_ROLE_RESING: BASE_URL + 'DynamicUsers/Resigned',
  USER_ROLE_UNRESING: BASE_URL + 'DynamicUsers/UnResigned',
  USER_ROLE_XPERTE: BASE_URL + 'DynamicUsers/exports',
  USER_ROLE_UPDATE: BASE_URL + 'DynamicUsers/UpdateProfile',
  ////// VECHILE INSPATION START
  VEHICEL_INSPATION_CATEGORY: BASE_URL + 'vehicle-inspection/Dropdowns',
  VEHICEL_INSPATION_SUB_CATEGORY: BASE_URL + 'vehicle-inspection/Dropdowns',
  SETP_1_INSPATION: BASE_URL + 'vehicle-inspection/AddConfiguration1',
  GET_INSPATION_DATA: BASE_URL + 'vehicle-inspection/GetConfiguration1',
  PART_CATOGERY: BASE_URL + 'vehicle-inspection/Dropdowns',

  ////// VEHICLE AVAILABILITY START
  VEHICLE_LIST_REPORT: BASE_URL + 'customer/reports/vehiclelist',
  TRIP_LIST_REPORT: BASE_URL + 'customer/reports/triplist',
  DRIVER_LIST_REPORT: BASE_URL + 'customer/reports/userslist',

  VEHICEL_AVALIVALITY_DROPDAWAN:
    BASE_URL + 'vehicleAvailability/getVehicleList',

  VEHICEL_AVALIVALITY_DATA:
    BASE_URL + 'vehicleAvailability/getAvailableVehicleByCalendar',
  VEHICEL_AVALIVALITY_LIST:
    BASE_URL + 'vehicleAvailability/getAvailableVehicles',

  ////// Driver AVAILABILITY  END
  DRIVER_AVALIVALITY_DROPDAWAN: BASE_URL + 'driverAvailability/getDriverList',
  DRIVER_AVALIVALITY_DATA:
    BASE_URL + 'driverAvailability/getAvailableDriverByCalendar',
  DRIVER_AVALIVALITY_LIST: BASE_URL + 'driverAvailability/getAvailableDrivers',
  /* Vehicle API url End*/
  // master data section
  //vehicle  section
  //vehicle with subcategory  All
  // Online
  // Offline
  // Untracked/Not Tracked Yet
  //  vehicle  Report 
  GET_REPORT_LSIT: BASE_URL + "customer/reports/",
  GET_VEHICLE_COUNT_AND_SEATS: BASE_URL + "customer/reports/graph/vehiclecountandseatcapacity",
  GET_VEHICLE_SPEEDING_REPORT: BASE_URL + "customer/reports/vehiclespeed",
  GET_VEHICLE_INSURANCE_EXPIRY_REPORT: BASE_URL + "customer/reports/maintenance/insuranceexpiry",
  GET_VEHICLE_TAX_EXPIRY_REPORT: BASE_URL + "customer/reports/maintenance/taxexpiry",
  GET_VEHICLE_REGISTRATION_EXPIRY_REPORT: BASE_URL + "customer/reports/maintenance/registrationexpiry",
  GET_VEHICLE_INSPECTION_EXPIRY_REPORT: BASE_URL + "customer/reports/maintenance/inspection_expiry",
  GET_VEHICLE_FUEL_EXPENSE_REPORT: BASE_URL + "customer/reports/finance/fuel_expense",
  GET_VEHICLE_EXPENSE_REPORT: BASE_URL + "customer/reports/finance/expense",



  // Dispatch Dashboard 
  GET_DISPACH_DASHBORD_SUMMARY: BASE_URL + "dispatch/dispatch-Managment-Order-Summary",
  GET_DISPACH_DASHBORD_STATIC: BASE_URL + "dispatch/dispatch-today-statistics",
  GET_DISPACH_DASHBORD_DURALBAL: BASE_URL + "dispatch/dispatch-Managment-Deliverable?driver_id=",
  GET_DISPACH_DASHBORD_LIST: BASE_URL + "dispatch/dispatch-dashbord-listing",

  // export vehicle section
  GET_VEHICLE_LIST_EXPORT: BASE_URL + 'vehicle/getVehicle-export',
  GET_VEHICLE_CATEGORY_EXPORT: BASE_URL + 'vehicle/vehicleCategories-export',
  GET_VEHICLE_GROUP_EXPORT: BASE_URL + 'vehicle/vehicleGroups-export',
  GET_VEHICLE_SYNC_EXPORT: BASE_URL + 'vehicle/SyncRequestList-export',
  GET_FEATURE_LIST_EXPORT: BASE_URL + 'feature-set/export-vehicle-feature-list',
  GET_VEHICLE_SUB_CATEGORY_EXPORT: BASE_URL + 'vehicle/vehiclesByCategory-export',
  VEHICLE_LISTGROUPVIEW_EXPORT: BASE_URL + 'vehicle/groupVehicles-export',
  //vehicle tab
  GET_VEHICLE_LIST: BASE_URL + 'vehicle/getVehicle',
  GET_VEHICLES_ALL_LIST: BASE_URL + 'Vehicle/allVehicles',
  VEHICLE_FEATURE_LIST: BASE_URL + 'feature-set/list',
  VEHICLE_FEATURE_LIST_BUY: BASE_URL + 'feature-set/buy-feature-list',
  VEHICLE_FEATURE_LIST_TO_BUY: BASE_URL + 'feature-set/get-feature-to-buy',
  VEHICLE_FEATURE_LIST_TO_BUY_PRICE: BASE_URL + 'feature-set/add-feature',
  VEHICLE_FEATURE_LIST_TO_MYCARD: BASE_URL + 'feature-set/already-have-feature-list',
  FEATURELIST_DATA_ALL: BASE_URL + 'feature-set/vehicle-feature-list',
  FEATURELIST_DATA_ACTION: BASE_URL + 'feature-set/feature-switch ',
  VEHICLE_ADD: BASE_URL + 'vehicle/Addvehicle',
  VEHICLE_UPDATE: BASE_URL + 'Vehicle/vehicle-update',
  VEHICLE_SINGLE_DATA: BASE_URL + 'vehicle/vehicleSingle',
  VEHICLE_DELETE: BASE_URL + 'vehicle/vehicle-delete',
  VEHICLE__CATEGORY_DELETE: BASE_URL + 'vehicle/remove-in-category',
  VEHICLE_IMOBILIZATION: BASE_URL + 'vehicle/immobalize-vehicle',
  GET_CUSTOMER_GEOFANCE_AREA: BASE_URL + 'CommonFunctions/TransportationGeofence',
  GET_DISPATCH_SINGLE_VEHICLE: BASE_URL + 'dash-board/get-vehicle',
  //Vehicle Category
  GET_VEHICLE_CATEGORY: BASE_URL + 'vehicle/vehicleCategories',
  GET_VEHICLE_SUB_CATEGORY: BASE_URL + 'vehicle/vehiclesByCategory',
  VEHICLE_ADDCATEGORY: BASE_URL + 'vehicle/AddVehicleCategory',
  GET_ALL_ICONS: BASE_URL + 'vehicle/allIcons',
  VEHICLE_UPDATECATEGORY: BASE_URL + 'Vehicle/UpdateVehicleCategory',
  VEHICLE_SINGLE_CATEGORY: BASE_URL + 'vehicle/editVehicleCategory',
  MQTTCONNECTION: BASE_URL + 'dash-board/view-live-list',
  GET_VEHICLE_SINGLE_API_TRACK: BASE_URL + 'dash-board/get-vehicle-imei',
  //VehicleGroup
  GET_VEHICLE_GROUP: BASE_URL + 'vehicle/vehicleGroups',
  VEHICLE_ADDGROUP: BASE_URL + 'vehicle/AddVehicleGroup',
  VEHICLE_GROUP_EDIT_DATA: BASE_URL + 'vehicle/editVehicleGroup',
  // editVehicleGroup
  VEHICLE_LISTGROUPVIEW: BASE_URL + 'vehicle/groupVehicles',
  VEHICLE_UPDATEGROUP: BASE_URL + 'vehicle/updateVehicleGroup',
  VEHICLE_SINGLE_GROUP: BASE_URL + 'vehicle/vehicleSinglegroup',
  VEHICLEGROUP_DELETE: BASE_URL + 'vehicle/deleteVehicleGroup',
  GROUP_VEHICLE_DELETE: BASE_URL + 'vehicle/deleteVehicleById',
  VEHICLEGROUP_MANAGER_DROPDOWN: BASE_URL + 'vehicle/groupManagers',
  VEHICLEGROUP_AllVEHICLE_DROPDOWN: BASE_URL + 'vehicle/allVehicles',
  //Sync
  GET_VEHICLE_SYNC: BASE_URL + 'vehicle/SyncRequestList',
  VEHICLE_DROWPDOWN: BASE_URL + 'vehicle/DropdownList',
  VEHICLE_DROWPDOWN_DEFAULT_CATEGORY: BASE_URL + 'vehicle/default-category',
  VEHICLE_DROWPDOWN_MANAGER: BASE_URL + 'vehicle/groupManagers',
  VEHICLE_ADDSync: BASE_URL + 'vehicle/AddNewSyncRequest',
  // VEHICLE_UPDATESync: BASE_URL + "vehicle/UpdateNewSyncRequest",
  // VEHICLE_SINGLE_SYNC: BASE_URL + "vehicle/vehicleSinglesync",
  //comman options
  VEHICLE_DETAILS: BASE_URL + 'vehicle/vehicle-view',
  VEHICLE_DETAILS_SINGLE: BASE_URL + 'vehicle/vehicle-single',
  VEHICLE_HELTH: BASE_URL + 'vehicle/vehicle-health-status',
  CURRENT_POSITION: BASE_URL + 'vehicle/vehicle-current-position',
  // ASSIGN_EMPLOYEE:BASE_URL + "vehicle/employee",
  BUS_ASSISTANT: BASE_URL + 'vehicle/assigned-employee-helper',
  DRIVERS_ASSIST: BASE_URL + 'vehicle/assigned-employee-driver',
  ASSIGN_TRIP_DETAILS: BASE_URL + 'vehicle/assigned-trip-details',
  ASSIGN_TRIP_DETAILS_DELETE: BASE_URL + 'vehicle/assigned-trip-details-delete',
  CONFIURATION_INF_GPRS: BASE_URL + 'vehicle/gprs',
  CONFIURATION_INF_DF: BASE_URL + 'vehicle/frquency',
  ALERT_DATA: BASE_URL + 'vehicle/alert',
  // play back Trips api
  GET_COMPLETED_TRIPS_DROPDOWN: BASE_URL + 'playback/tripVehicleDropdown',
  COMPLETED_TRIPS: BASE_URL + 'playback/getCompletedTrips',
  COMPLETED_TRIPS_SINGLE: BASE_URL + 'playback/getSingleTripLocationDetails',
  COMPLETED_TRIPS_EXPORT: BASE_URL + 'playback/vehicleTripHistoryDetailsExport',
  //holidays 03/04/2023
  HOLIDAYSLIST: BASE_URL + 'holiday/getFilterHoliday',
  HOLIDAYSLIST_DELETE: BASE_URL + 'holiday/deleteHoliday',
  HOLIDAYSLIST_ADD: BASE_URL + 'holiday/addHolidays',
  HOLIDAYSLIST_UPDATE: BASE_URL + 'holiday/editHoliday',
  HOLIDAYSLIST_SINGLE: BASE_URL + 'holiday/getSingleHoliday',
  //vacation
  VACATION: BASE_URL + 'vacation/FilterVacations',
  VACATION_NEW: BASE_URL + 'vacation/AllVacations',
  VACATION_DELETE: BASE_URL + 'vacation/deleteVacation',
  VACATION_ADD: BASE_URL + 'vacation/addVacations',
  VACATION_UPDATE: BASE_URL + 'vacation/editVacation',
  VACATION_SINGLE: BASE_URL + 'vacation/getVacationById',
  //Parking Slot
  PARKING_SLOT_LISTS: BASE_URL + 'ParkingStation/List',
  PARKING_SLOT_ADD: BASE_URL + 'ParkingStation/Add',
  PARKING_SLOT_DELETE: BASE_URL + 'ParkingStation/Delete',
  PARKING_SLOT_UPDATE: BASE_URL + 'ParkingStation/Update',
  PARKING_SLOT_SINGLE_EDIT: BASE_URL + 'ParkingStation/Single',
  PARKING_SLOT_DEASSIGN: BASE_URL + 'ParkingStation/Deassign',
  PARKING_SLOT_SUGGESTEDVEHICLE: BASE_URL + 'ParkingStation/suggestedVehicle',
  PARKING_SLOT_ASSIGNVEHICLE: BASE_URL + 'ParkingStation/assignVehicle',
  PARKING_SLOT_STATIONS: BASE_URL + 'ParkingStation/stationlist',

  //Point of Interest
  POINT_OF_INTEREST_LISTS: BASE_URL + 'PointOfInterest/getFilterLocation',
  POINT_OF_INTEREST_ADD: BASE_URL + 'pointOfInterest/Add',
  POINT_OF_INTEREST_DELETE: BASE_URL + 'PointOfInterest/Delete',
  POINT_OF_INTEREST_UPDATE: BASE_URL + 'PointOfInterest/Update',
  POINT_OF_INTEREST_SINGLE_EDIT: BASE_URL + 'pointOfInterest/singleLocation',
  //Geofence Areas
  GEOFANCE_AREA_LISTS: BASE_URL + 'geofence/filterGeofenceArea',
  GEOFANCE_AREA_ADD: BASE_URL + 'geofence/addGeofenceArea',
  GEOFANCE_AREA_DELETE: BASE_URL + 'geofence/deleteGeofence',
  GEOFANCE_AREA_UPDATE: BASE_URL + 'geofence/editGeofence',
  GEOFANCE_AREA_SINGLE_EDIT: BASE_URL + 'geofence/singleGeofenceArea',
  GEOFANCE_AREA_PARENT_LIST: BASE_URL + 'geofence/getParentAreaList',

  //Master setting
  GET_GENRAL_SETTINGS: BASE_URL + 'GeneralSettings/addgeneralSettings',
  GET_CUSTOMER_PROFILE: BASE_URL + 'customerProfile/getCustomerProfile',
  UPDATE_CUSTOMER_PROFILE: BASE_URL + 'customerProfile/updateProfile',
  GET_ALL_LOGO: BASE_URL + 'customerProfile/getAllLogos',
  GET_ALL_GENRAL_SETTING: BASE_URL + 'GeneralSettings/GeneralSettingsList',
  GET_DISPACH_SETTINGS: BASE_URL + 'dispach/dispatchTripDaysList',
  UPDATE_DISPATCH_SETTING: BASE_URL + 'dispach/updatedispachSettings',
  GET_ACCESS_RIGHTS: BASE_URL + 'accessRights/getAllRights',
  GET_ACCESS_RIGHTS_CHECK: BASE_URL + 'accessRights/getRightsCustomer',
  GET_ROLES_FOR_RIGHTS: BASE_URL + 'accessRights/getAllRole',
  UPDATE_ACCESS_RIGHTS: BASE_URL + 'accessRights/updateAccessRights',
  GET_ADD_ON_SETINGS: BASE_URL + 'addon/addonList',
  GET_ADD_ON_SETINGS_SAVE: BASE_URL + 'addon/addon-access',
  GET_ADD_ON_SETINGS_CARD_LIST: BASE_URL + 'addon/cartList',
  ACTIVATE_ADD_ON_NEW: BASE_URL + 'addon/is-activate-addon',
  ACTIVATE_ADD_ON: BASE_URL + 'addon/activateAddon',
  DEACTIVATE_ADD_ON: BASE_URL + 'addon/diactivateAddon',
  ADD_ON_ADD_TO_CARD: BASE_URL + 'addon/is-buy-addon',
  ADDON_PAYMENET_GATEWAY: BASE_URL + 'addon/payments-addon',
  DELETED_ON_ADD_TO_CARD: BASE_URL + 'addon/cartDelete',
  UPDATE_GENRAL_SETTING: BASE_URL + 'GeneralSettings/updateGeneralSettings',
  GET_NOFIFICATION_DATA: BASE_URL + 'Notification/NotificationList',
  UPDATE_NOTIFICATIONS: BASE_URL + 'Notification/addAndEditNotification',
  TRASPORTATION_ADD: BASE_URL + 'TransportationSettings/add',
  UPDATE_LOGO: BASE_URL + 'customerProfile/updateLogos',
  DELETE_LOGO: BASE_URL + 'customerProfile/deleteLogo',
  GET_ALL_SMS_GETWAT: BASE_URL + 'smsIntegration/smsGatewayNameList',
  GET_TIMEZONE_LIST: BASE_URL + 'customerProfile/timeZone',
  CURRNCY_LIST: BASE_URL + 'customerProfile/currency',

  // DISPATCH MANAGEMENT
  DELETE_DISPATCH_PENDING_ORDER: BASE_URL + 'dispatch/order-status-update',
  GET_DISPATCH_LIST: BASE_URL + 'dispatch/dispatch-management?page=',
  GET_VIEW_DISPATCH_DETAILS: BASE_URL + 'dispatch/dispatch-management-view?dispatch_customer_id=',
  UPDATE_DISPATCH_DETAILS: BASE_URL + 'dispatch/dispatch-management',
  DELETE_DISPATCH_DELETE:
    BASE_URL + 'dispatch/dispatch-management?dispatch_customer_id=',
  DELETE_MERCHANT_DELETE: BASE_URL + 'dispatch/merchent-delete',
  MARCHANT_DROPDOWN: BASE_URL + 'dispatch/merchent-dropdown',
  MARCHANT_FILTER_ORDER: BASE_URL + '/dispatch/merchant-filter',
  GET_ORDER_LIST: BASE_URL + 'dispatch/dispatch-management-order?page=',
  VIEW_MULTIPLE_POINT: BASE_URL + 'dispatch/view-multiple-point',
  GET_INTEGRATION_SETTINGS: BASE_URL + 'smsIntegration/sms',
  UPDATE_INTEGRATION_SETTINGS: BASE_URL + 'smsIntegration/updateSms',
  GET_ORDER_DETAILS: BASE_URL + 'dispatch/dispatch-management-order-view?dispatch_package_id=',
  GET_MERCHENT_LIST: BASE_URL + 'dispatch/merchent-list',
  VIEW_MERCHENT: BASE_URL + 'dispatch/merchent-view',
  UPDATE_MERCHENT: BASE_URL + 'dispatch/merchent-update',
  ADD_MERCHENT: BASE_URL + 'dispatch/merchent-add',
  MERCHENT_DROPDOWN: BASE_URL + 'dispatch/merchent-dropdown',
  CUSTOMER_DROPDOWN: BASE_URL + 'dispatch/customer-dropdown',
  VEHICLE_TYPE_DROPDOWN: BASE_URL + 'dispatch/vehicle-type',
  ADD_ORDER: BASE_URL + 'dispatch/order-new',
  ADD_ORDER_NEW: BASE_URL + 'dispatch/multi-order-new',
  UPDATE_ORDER_NEW: BASE_URL + 'dispatch/multi-order-edit',
  // ADD_ORDER_NEW_L: BASE_URL + 'dispatch/view-by-group-code',
  UPDATE_ORDER: BASE_URL + 'dispatch/order-new-update',
  SINGLE_ORDER_DETAILS: BASE_URL + 'dispatch/order-details',
  ADD_VEHICLE_BOOKING: BASE_URL + 'dispatch/vehicle-book-add',
  VEHICLE_BOOKING_LIST: BASE_URL + 'dispatch/vehicle-book-list',
  MANUAL_ROUTE_LIST: BASE_URL + 'dispatch/manual-routing-list',
  MANUAL_VEHICLE_LIST: BASE_URL + 'dispatch/vehicle-list',
  ADD_MANUAL_ROUTING: BASE_URL + 'dispatch/manual-routing-add',
  ADD_MANUAL_ROUTING_VIEW: BASE_URL + 'dispatch/delivery-order-add',
  UPDATE_DRIVER_FOR_TRIP: BASE_URL + 'dispatch/delivery-order-update',
  END_TRIP_ADMIN: BASE_URL + 'dispatch/delivery-status-update',
  VEHICLE_ASSIGN: BASE_URL + 'dispatch/booking-trip',
  FILTERED_VEHICLE_LIST: BASE_URL + 'dispatch/vehicle-list',
  DOWNLOAD_IMPORT_DATA: BASE_URL + "dispatch/import-format",
  IMPORT_ORDER_ADD: BASE_URL + "dispatch/import-order-add",

  // TRIP MANAGEMENT
  REPEAT_TRIP: BASE_URL + 'dispatch/trip-duplicate',
  GET_TRIP_STOP: BASE_URL + 'trip/Stops',
  GET_TRIP_STOP_EXPORT: BASE_URL + 'trip/Stops-export',
  GET_STOP_DETAILS: BASE_URL + 'trip/trip-stop-view',
  GET_STOP_LIST_BY_ID: BASE_URL + 'trip/trip-stop-by-id',
  DELETE_STOP_BY_ID: BASE_URL + 'trip/delete-stop',
  UPDATE_STOP: BASE_URL + 'trip/update-stop',
  GET_TRIP_LIST: BASE_URL + 'trip/trip-list',
  GET_TRIP_DETAILS: BASE_URL + 'trip/trip-details?trip_id=',
  POINT_DETAILS: BASE_URL + 'trip/trip-detail-autofill',
  SHARE_TRIP: BASE_URL + 'trip/share-trip?trip_id=',
  GET_ALL_DRIVERS: BASE_URL + 'api/driver-details',
  GET_ALL_VEHICLES: BASE_URL + 'api/vehicle-details',
  ADD_STOP: BASE_URL + 'trip/add-stop',
  REMOVE_STOP: BASE_URL + 'trip/delete-stop',
  UPDATE_STOP: BASE_URL + 'trip/update-stop',
  POINT_OF_INTEREST_LIST: BASE_URL + 'trip/stop-name-list',
  UPDATE_TRIP: BASE_URL + 'trip/edit-trip',
  ADD_TRIP: BASE_URL + 'trip/new-trip',
  DELETE_TRIP: BASE_URL + 'trip/delete-trip',
  UPDATE_STOP_PRIORITY: BASE_URL + 'trip/updateStopPriority',

  // ================trip_report================
  TRIP_VERSUS_PICKUP_POINT: BASE_URL + 'customer/reports/daily/pickuppoints',
  TRIP_MANIFEST_TRIP: BASE_URL + 'customer/reports/tripmanifest/index',
  LIVE_TRIP_LOCATION_REPORT: BASE_URL + 'customer/reports/livetriplocation',
  TRIP_ASSIGNED_VERSUS_COMPLETED: BASE_URL + 'customer/reports/drivervehicle/tripassignedversuscompleted',
  TRIP_ACTIVITY: BASE_URL + 'customer/reports/tripactivity',
  TRIP_VERSUS_PICKUP_COUNT: BASE_URL + 'customer/reports/tripversuspickup',

  ////////////////////APIS For Dispatch Executive /////////////////////////////////
  GET_POST_DISPATCHEXECUTIVE_NEW_ORDER: BASE_URL + "stopadd/add-trip-stop-by-id",
  POINT_DETAILS: BASE_URL + "trip/trip-detail-autofill",
  GET_DISPATCHEXECUTIVE_VIEW_ORDER_DETAILS: BASE_URL + "stopadd/get-trip-stop-details",
  GET_DISPATCH_ORDER_DETAILS_PDF: BASE_URL + "dispatch-management-order-pdf",
  GET_INVOIC_DETAILS: BASE_URL + "dispatch/ocr-image-to-text",
  UPDATE_INVOIC_DETAILS: BASE_URL + "stopadd/update-details-inv",


  ////////////////////APIS For Dispatch Executive /////////////////////////////////
  POST_REGISTRATION: BASE_URL + "register",


  ///////////////////////////////////////// Usage Static Reports ///////////////////////////////////////
  SYSTEM_REPORT_USAGE_STATISTICS_SYSTEM_USAGE_AUDIT: BASE_URL + "customer/reports/systemusageaudit",
  DATA_USAGE_REPORT_POST_LIST: BASE_URL + "customer/reports/usage_statistics/Data_usage",
  MOBILE_APP_DETAILS_VIEW: BASE_URL + "customer/reports/mobileapp",
  TRACKING_DEVICE_AND_SIM_CARD_DETAILS_LIST_OF_TRACKING_DEVICES: BASE_URL + "customer/reports/tracking/trackingdevices",
  LAST_LOGIN_DETAILS: BASE_URL + "customer/reports/userreport/loginaccess",
  MOBILE_APP_USAGE_DETAILS: BASE_URL + "customer/reports/appusage",



  /////////////////////////////////////////////MARKET PLACE///////////////////////////////////////////////////////
  MARKET_PLACE_ALL_VEHICLE_LIST: BASE_URL + "marketplace/transporter/vehicle/all",
  MARKET_PLACE_VEHICLE_OFFERED_LIST: BASE_URL + "marketplace/transporter/vehicle/offered",
  MARKET_PLACE_VEHICLE_ASSIGN_LIST: BASE_URL + "marketplace/transporter/vehicle/assigned",
  MARKET_PLACE_ENABLE_VEHICLE_OFFER: BASE_URL + "marketplace/transporter/vehicle/enableoffer",
  MARKET_PLACE_DISABLE_VEHICLE_OFFER: BASE_URL + "marketplace/transporter/vehicle/disableoffer",
  MARKET_PLACE_AVAILABLE_LIST: BASE_URL + "marketplace/transporter/vehicle/available",
  MARKET_PLACE_BLOCK_LIST: BASE_URL + "marketplace/transporter/vehicle/blocked",

  MARKET_PLACE_DRIVER_ALL_LIST: BASE_URL + "marketplace/transporter/driver/all",
  MARKET_PLACE_DRIVER_OFFERED_LIST: BASE_URL + "marketplace/transporter/driver/offered",
  MARKET_PLACE_DRIVER_ASSIGNED_LIST: BASE_URL + "marketplace/transporter/driver/assigned",
  MARKET_PLACE_DRIVER_OFFER_ENABLE: BASE_URL + "marketplace/transporter/driver/enable",
  MARKET_PLACE_DRIVER_OFFER_DISABLE: BASE_URL + "marketplace/transporter/driver/disableoffer",
  MARKET_PLACE_DRIVER_BLOCK_LIST: BASE_URL + "marketplace/transporter/driver/blocked",
  MARKET_PLACE_DRIVER_AVAILABLE_LIST: BASE_URL + "marketplace/transporter/driver/available",

}
export default ApiConfig
