// <div className="Vehcle-main-tabs">
// <div className="main-master-wrapper" id="View_Report_Header">
//   <div className="all-vehical-head row vehicle-top-inputs">
//     <div className="input-section-wrapper">
//       <div className="row">
//         <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Trip Name"
//           />
//         </div>
//         <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">

//               <select
//             className="form-select"
//             aria-label="Default select example"
//             placeholder="Vehicle"
//           >
//             <option value={0}>Vehicle</option>
//             {vehicleList.map((vehicle) => (
//               <option key={vehicle.vehicle_id}>
//                 {vehicle.vehicle_number}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-lg-3 col-md-6 col-sm-12 mb-3 innerSelectBox weekcounder">
//           <select
//             className="form-select"
//             aria-label="Default select example"
//             placeholder="Driver"
//             onChange={(e) => setSelectedDriver(e.target.value)}
//             value={selectedDriver}
//           >
//             <option value={0}>Driver</option>
//             {drivers.map(({ userId, userName }) => (
//               <option key={userId} value={userId}>
//                 {userName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//     <div className="right-export-btn-section-wrapper">
//       <Link to="#">
//         <div className="c-pointer">
//           <img src={Export} alt="" />
//         </div>
//       </Link>
//       <div className="c-pointer">

//       </div>
//     </div>
//   </div>
//   <div className="yauto">
//     <div className="totalTabelHeight">
//       <table className="table tableAdmin tabelheiht">
//         <thead className="tableHead">
//           <tr>
//             <th>{t("trip_vehicle_id")}</th>
//             <th>{t("trip_route_id")}</th>
//             <th>{t("trip_type")}</th>
//             <th>{t("trip_shift")}</th>
//             <th>{t("trip_status")}</th>
//             <th>{t("trip_driver_id")}</th>
//             <th>{t("trip_helper_id")}</th>
//             <th>{t("vehicle_imei")}</th>
//             <th>{t("vehicle_status")}</th>
//             <th>{t("Action")}</th>
//           </tr>
//         </thead>
//         <tbody className="tableBody">
//           {tripActivity?.map((tripmodel) => (
//             <tr key={tripmodel.trip_id}>
//               <td>{tripmodel.trip_vehicle_id}</td>
//               <td>{tripmodel.trip_route_id}</td>
//               <td>{tripmodel.trip_type}</td>
//               <td>{tripmodel.trip_shift}</td>
//               <td>{tripmodel.trip_status}</td>
//               <td>{tripmodel.trip_driver_id}</td>
//               <td>{tripmodel.trip_helper_id}</td>
//               <td>{tripmodel.vehicle_imei}</td>
//               <td>{tripmodel.vehicle_status}</td>
//               <td>
//                 <div className="innerFlex">
//                   <Link to="/NotificationDetails ">
//                     <img src={View} className="me-3" alt="" />
//                   </Link>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
// </div>