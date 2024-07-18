import { React, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { color, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { Form, Nav, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Calendar from "../../assets/images/calendar.svg";
import import_icon from "../../assets/images/import_icon.svg";
import export_icon from "../../assets/images/export_icon.svg";
import UserLogo from "../../assets/images/UserLogo.svg";
import UpGreen from "../../assets/images/UpGreen.svg";
import User_admistraion from "../../assets/images/User_admisrtation.svg";
import User_transport from "../../assets/images/User_transport.svg";
import User_driver from "../../assets/images/User_driver1.svg";
import User_manager from "../../assets/images/User_manager.svg";
import User_assistent from "../../assets/images/User_assistent.svg";
import User_others from "../../assets/images/User_others.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const UserDashboard = () => {

  const accessRights = useSelector((state) => state.auth.accessRights);
  const userRole = accessRights && accessRights.rights_role;

  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allD, setAllD] = useState("first")
  const [all, setAll] = useState("all")
  const [allw, setAllw] = useState("allW")
  const { t, i18n } = useTranslation();


  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  // logins chart
  const [state, setState] = useState({
    series: [
      {
        name: "Web",
        data: [31, 100, 28, 51, 42, 109, 100],
      },
      {
        name: "Mobile",
        data: [11, 20, 100, 32, 34, 52, 41],
      },
    ],
    chart: {
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    options: {
      chart: {
        height: 440,
        toolbar: {
          show: false,
        },
      },
      colors: ["#803900", "#C7A180"],
      fill: {
        type: "fill",
      },
      grid: {
        show: false,
      },

      stroke: {
        curve: "smooth",
        width: 1,
        colors: ["#803900", "#C7A180"],
      },

      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
    },
  });

  //Driver chart daily


  const [barState, setBarState] = useState({
    series: [
      {
        name: "Amount",
        data: [
          30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32, 45, 12, 65, 74, 14,
          90, 45, 10, 87, 12, 80, 10,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#D5297F"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#D5297F"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
        labels: {
          color: ["#8F430080"],
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [administrator, setAdministrator] = useState({
    series: [
      {
        name: "Amount",
        data: [
          10, 32, 45, 12, 65, 74, 14, 90, 45, 10, 87, 12, 80, 10, 30, 20, 40,
          10, 30, 50, 35, 20, 40, 20,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#761CD4"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#761CD4"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
   
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [fleetManager, setFleetManager] = useState({
    series: [
      {
        name: "Amount",
        data: [
          30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32, 45, 12, 65, 74, 14,
          90, 45, 10, 87, 12, 80, 10,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#2F7DD3"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#2F7DD3"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
       
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [vehicleAssistant, setVehicleAssistant] = useState({
    series: [
      {
        name: "Amount",
        data: [
          10, 32, 45, 12, 65, 74, 14, 90, 45, 10, 87, 12, 80, 10, 30, 20, 40,
          10, 30, 50, 35, 20, 40, 20,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#21C47B"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#21C47B"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [transportManager, setTransportManager] = useState({
    series: [
      {
        name: "Amount",
        data: [
          30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32, 45, 12, 65, 74, 14,
          90, 45, 10, 87, 12, 80, 10,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF7621"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#FF7621"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
     
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [other, setOther] = useState({
    series: [
      {
        name: "Amount",
        data: [
          10, 32, 45, 12, 65, 74, 14, 90, 45, 10, 87, 12, 80, 10, 30, 20, 40,
          10, 30, 50, 35, 20, 40, 20,
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#F3CF26"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#F3CF26"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ],
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  // Driver Weekly Chart
  const [initialW, setInitialW] = useState({
    // colors: ["red", "green", "blue", "orange"],
    // options: {
    // plotOptions: {
    //     bar: {
    //         columnWidth: "60%",
    //         distributed: false,
    //     }
    // },

    // },

    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
        ],
      },
    ],
    colors: ["red", "green", "blue", "orange"],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
          // color:["red"]
        },
      },
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#D5297F",
        "#761CD4",
        "#2F7DD3",
        "#21C47B",
        "#FF7621",
        "#F3CF26",
        "#D5297F",
      ],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["transparant"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
       
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [driverW, setDriverW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#D5297F"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#D5297F"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
       
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [administratorW, setAdministratorW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#761CD4"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#761CD4"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
   
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [fleetManagerW, setFleetManagerW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#2F7DD3"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#2F7DD3"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [vehicleAssistantW, setVehicleAssistantW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#21C47B"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#21C47B"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [transportManagerW, setTransportManagerW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF7621"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#FF7621"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
   
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [othersW, setOthersW] = useState({
    series: [
      {
        name: "sales",
        data: [
          {
            x: "2019/01/01",
            y: 20,
          },
          {
            x: "2019/04/01",
            y: 10,
          },
          {
            x: "2019/07/01",
            y: 8,
          },
          {
            x: "2019/10/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 2,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 5,
          },
          {
            x: "2020/01/01",
            y: 15,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 23,
          },
          {
            x: "2020/01/01",
            y: 16,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/07/01",
            y: 7,
          },
          {
            x: "2020/10/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 14,
          },
          {
            x: "2020/01/01",
            y: 7,
          },
          {
            x: "2020/01/01",
            y: 24,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 13,
          },
          {
            x: "2020/01/01",
            y: 12,
          },
          {
            x: "2020/01/01",
            y: 19,
          },
          {
            x: "2020/01/01",
            y: 18,
          },
          {
            x: "2020/01/01",
            y: 20,
          },
          {
            x: "2020/01/01",
            y: 9,
          },
          {
            x: "2020/01/01",
            y: 10,
          },
        ],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#F3CF26"],
      stroke: {
        curve: "straight",
        width: 0.5,
        colors: ["#F3CF26"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            colors: ["#8F430080", "#8F430080", "#8F430080", "#8F430080"],
          },
          groups: [
            { title: "Week 1", cols: 7 },
            { title: "Week 2", cols: 7 },
            { title: "Week 3", cols: 7 },
            { title: "Week 4", cols: 7 },
          ],
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
         
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  // Initial Monthly chart

  const [initial, setInitial] = useState({
    series: [
      {
        data: [99, 22, 10, 20, 40, 47, 98, 63, 20, 99, 10, 44],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    colors: ["red", "green", "blue", "orange"],
    options: {
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
        },
      },
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          " Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            // colors: ["#8F430080", "#8F430080"],
            fontSize: "12px",
          },
        },
      },
    },
  });

  const [driverM, setDriverM] = useState({
    series: [
      {
        name: "Amount",
        data: [30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#D5297F"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#D5297F"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [administratorM, setAdministratorM] = useState({
    series: [
      {
        name: "Amount",
        data: [50, 35, 20, 40, 20, 10, 32, 30, 20, 40, 10, 30],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#761CD4"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#761CD4"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [fleetManagerM, setFleetManagerM] = useState({
    series: [
      {
        name: "Amount",
        data: [32, 30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#2F7DD3"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#2F7DD3"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
       
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [vehicleAssistantM, setVehicleAssistantM] = useState({
    series: [
      {
        name: "Amount",
        data: [30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10, 32],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#21C47B"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#21C47B"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [transportManagerM, setTransportManagerM] = useState({
    series: [
      {
        name: "Amount",
        data: [32, 30, 20, 40, 10, 30, 50, 35, 20, 40, 20, 10],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF7621"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#FF7621"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  const [otherM, setOtherM] = useState({
    series: [
      {
        name: "Amount",
        data: [50, 35, 20, 40, 20, 10, 32, 30, 20, 40, 10, 30],
      },
    ],
    chart: {
      height: 450,
      type: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "red",
    },
    options: {
      chart: {
        height: 540,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      colors: ["#F3CF26"],
      // colors: ['#F6EFE9', 'blue', 'green'],
      stroke: {
        curve: "straight",
        width: 2,
        colors: ["#F3CF26"],
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      xaxis: {
        type: "day",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      grid: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    
          return (
            '<div class="Utility_cab">' +
            "<span>" +
            series[0][dataPointIndex] +
            "</span>" +
            "Hrs" +
            "</div>"
          );
        },
      },
    },
  });

  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper">
        <div className="holidays-filter-wrapper">
          <div className="left-wrapper">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="innerSelectBox weekCounter datepicker-main"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="date from"
                >
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    placeholderText="Date From"
                  />
                  <img src={Calendar} className="calendarLogo" alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="innerSelectBox weekCounter datepicker-main"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="date to"
                >
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    placeholderText="Date From"
                  />
                  <img src={Calendar} className="calendarLogo" alt="" />
                </div>
              </div>
            </div>
          </div>
          {
            userRole === "customer" ||
              (accessRights &&
                accessRights?.rights_manage_user_insights) ? (
              <div className="right-wrapper">
                <Link to="#" className="import-icon">
                  <img src={import_icon} alt="" />
                </Link>
                <Link to="#" className="export-icon">
                  <img src={export_icon} alt="" />
                </Link>
              </div>
            ) : null
          }
        </div>

        <div id="UserDashboard">
          <div className="row">
            <div className="col-lg-8">
              <div className="Summary">
                <div className="heading">
                  <p>{t("User's Summary")}</p>
                </div>
                <div className="body row">
                  <div className="col-lg-4">
                    <div className="left">
                      <div className="top">
                        <img src={UserLogo} alt="" />
                        <div className="count">
                          <p className="totleN">600</p>
                          <p className="totleT">{t("Totle Users")}</p>
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="ratioCount">
                          <p className="incress">{t("Increased by")} 50%</p>
                          <img src={UpGreen} alt="" />
                        </div>
                        <p className="time">*{t("As per last month")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="right">
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <div className="single_card">
                            <img src={User_admistraion} alt="" />
                            <div className="count">
                              <div className="totle">10</div>
                              <div className="label">{t("Administrator")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="single_card">
                            <img src={User_manager} alt="" />
                            <div className="count">
                              <div className="totle">103</div>
                              <div className="label">{t("Fleet Manager")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="single_card">
                            <img src={User_transport} alt="" />
                            <div className="count">
                              <div className="totle">98</div>
                              <div className="label">{t("Transport Manager")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="single_card">
                            <img src={User_assistent} alt="" />
                            <div className="count">
                              <div className="totle">136</div>
                              <div className="label">{t("Vehicle Assistant")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="single_card">
                            <img src={User_driver} alt="" />
                            <div className="count">
                              <div className="totle">53</div>
                              <div className="label">{t("Drivers")}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="single_card">
                            <img src={User_others} alt="" />
                            <div className="count">
                              <div className="totle">32</div>
                              <div className="label">{t("Others")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="Logins">
                <div className="heading">
                  <p>{t("Device Logins")}</p>
                </div>
                <div className="body">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="logintype">
                        <div className="top">
                          <p className="type">{t("Web Logins")}</p>
                          <div className="indicatorWeb"></div>
                        </div>
                        <div className="totleLogin">730</div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="logintype">
                        <div className="top">
                          <p className="type">{t("Mobile Logins")}</p>
                          <div className="indicatorMob"></div>
                        </div>
                        <div className="totleLogin">350</div>
                      </div>
                    </div>
                    <div className="col-lg-12 ps-0 ps-0">
                      <Chart
                        options={state.auth.options}
                        series={state.auth.series}
                        type="area"
                        width="100%"
                        height="160"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="timeSpendsByUser">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="heading">
                    <p>{t("Top Time Spends by User's")}</p>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item
                        onClick={() => {
                          setAllD("DailyInitial");
                        }}
                      >
                        <Nav.Link eventKey="first">{t("Daily")}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item
                        onClick={() => {
                          setAllw("allw");
                        }}
                      >
                        <Nav.Link eventKey="second">{t("Weekly")}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item
                        onClick={() => {
                          setAll("all");
                        }}
                      >
                        <Nav.Link eventKey="three">{t("Monthly")}</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="body">
                        <Tab.Container id="left-tabs-example" activeKey={allD}>
                          <div className="heading">
                            <div className="">
                              <p>{t("Top Spend by")} </p>
                              <p className="map_heading">{t("Driver")}</p>
                            </div>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item
                                onClick={() => {
                                  setAllD("first");
                                }}
                              >
                                <Nav.Link eventKey="first">
                                  <div className="Driver colormap"></div>
                                  <p>{t("Driver")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllD("second");
                                }}
                              >
                                <Nav.Link eventKey="second">
                                  <div className="Administrator colormap"></div>
                                  <p>{t("Administrator")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllD("four");
                                }}
                              >
                                <Nav.Link eventKey="four">
                                  <div className="FleetManager colormap"></div>
                                  <p>{t("Fleet Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllD("five");
                                }}
                              >
                                <Nav.Link eventKey="five">
                                  <div className="VehicleAssistant colormap"></div>
                                  <p>{t("Vehicle Assistant")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllD("six");
                                }}
                              >
                                <Nav.Link eventKey="six">
                                  <div className="TransportManager colormap"></div>
                                  <p>{t("Transport Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllD("seven");
                                }}
                              >
                                <Nav.Link eventKey="seven">
                                  <div className="Other colormap"></div>
                                  <p>{t("Other's")}</p>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </div>
                          <Tab.Content>

                            <Tab.Pane eventKey="first">
                              <div className="map_body">
                                <div className="map_chart">
                                  {/* <div className="top">
                                                                        <div className="bar_main">
                                                                            <div className="vlabels">
                                                                                <p className="vbar_lbe">24h</p>
                                                                                <p className="vbar_lbe">15h</p>
                                                                                <p className="vbar_lbe">10h</p>
                                                                                <p className="vbar_lbe">5h</p>
                                                                                <p className="vbar_lbe">0</p>
                                                                            </div>
                                                                            <div className="bar bar10">
                                                                                <p>10 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar70">
                                                                                <p>70 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar20">
                                                                                <p>20 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar50">
                                                                                <p>50 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar40">
                                                                                <p>40 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar30">
                                                                                <p>30 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar10">
                                                                                <p>10 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar80">
                                                                                <p>80 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar60">
                                                                                <p>60 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar70">
                                                                                <p>70 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar80">
                                                                                <p>80 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar50">
                                                                                <p>50 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar40">
                                                                                <p>40 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar10">
                                                                                <p>10 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar90">
                                                                                <p>90 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar10">
                                                                                <p>10 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar50">
                                                                                <p>50 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar10">
                                                                                <p>10 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar90">
                                                                                <p>90 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar40">
                                                                                <p>40 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar40">
                                                                                <p>40 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar100">
                                                                                <p>100 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar40">
                                                                                <p>40 Hrs</p>
                                                                            </div>
                                                                            <div className="bar bar80">
                                                                                <p>80 Hrs</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bottom">
                                                                        <p className="common">Jan</p>
                                                                        <div className="bar_labels">
                                                                            <p>1</p>
                                                                            <p>2</p>
                                                                            <p>3</p>
                                                                            <p>4</p>
                                                                            <p>5</p>
                                                                            <p>6</p>
                                                                            <p>7</p>
                                                                            <p>8</p>
                                                                            <p>9</p>
                                                                            <p>10</p>
                                                                            <p>11</p>
                                                                            <p>12</p>
                                                                            <p>13</p>
                                                                            <p>14</p>
                                                                            <p>15</p>
                                                                            <p>16</p>
                                                                            <p>17</p>
                                                                            <p>18</p>
                                                                            <p>19</p>
                                                                            <p>20</p>
                                                                            <p>21</p>
                                                                            <p>22</p>
                                                                            <p>23</p>
                                                                            <p>24</p>
                                                                        </div>
                                                                    </div> */}
                                  <Chart
                                    options={barState.options}
                                    series={barState.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <div className="map_body">
                                <div className="map_chart">
                                  <Chart
                                    options={administrator.options}
                                    series={administrator.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="four">
                              <div className="map_body">
                                <div className="map_chart">
                                  <Chart
                                    options={fleetManager.options}
                                    series={fleetManager.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="five">
                              <div className="map_body">
                                <div className="map_chart">
                                  <Chart
                                    options={vehicleAssistant.options}
                                    series={vehicleAssistant.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="six">
                              <div className="map_body">
                                <div className="map_chart">
                                  <Chart
                                    options={transportManager.options}
                                    series={transportManager.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="seven">
                              <div className="map_body">
                                <div className="map_chart">
                                  <Chart
                                    options={other.options}
                                    series={other.series}
                                    type="bar"
                                    width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="body">
                        <Tab.Container id="left-tabs-example" activeKey={allw}>
                          <div className="heading">
                            <div className="">
                              <p>{t("Top Spend by")} </p>
                              <p className="map_heading"> {t("Fleet Manager")}</p>
                            </div>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item
                                onClick={() => {
                                  setAllw("first");
                                }}
                              >
                                <Nav.Link eventKey="first">
                                  <div className="Driver colormap"></div>
                                  <p>{t("Driver")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllw("second");
                                }}
                              >
                                <Nav.Link eventKey="second">
                                  <div className="Administrator colormap"></div>
                                  <p>{t("Administrator")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllw("four");
                                }}
                              >
                                <Nav.Link eventKey="four">
                                  <div className="FleetManager colormap"></div>
                                  <p>{t("Fleet Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllw("five");
                                }}
                              >
                                <Nav.Link eventKey="five">
                                  <div className="VehicleAssistant colormap"></div>
                                  <p>{t("Vehicle Assistant")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllw("six");
                                }}
                              >
                                <Nav.Link eventKey="six">
                                  <div className="TransportManager colormap"></div>
                                  <p>{t("Transport Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAllw("seven");
                                }}
                              >
                                <Nav.Link eventKey="seven">
                                  <div className="Other colormap"></div>
                                  <p>{t("Other's")}</p>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </div>
                          <Tab.Content>
                            <Tab.Pane eventKey="allw">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={initialW.options}
                                    series={initialW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="first">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={driverW.options}
                                    series={driverW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={administratorW.options}
                                    series={administratorW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="four">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={fleetManagerW.options}
                                    series={fleetManagerW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="five">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={vehicleAssistantW.options}
                                    series={vehicleAssistantW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="six">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={transportManagerW.options}
                                    series={transportManagerW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="seven">
                              <div className="map_body">
                                <div className="map_chart_weekly">
                                  <Chart
                                    options={othersW.options}
                                    series={othersW.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">
                      <div className="body">
                        <Tab.Container id="left-tabs-example" activeKey={all}>
                          <div className="heading">
                            <div className="">
                              <p>{t("Top Spend by")} </p>
                              <p className="map_heading">{t("Administrator")}</p>
                            </div>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item
                                onClick={() => {
                                  setAll("first");
                                }}
                              >
                                <Nav.Link eventKey="first">
                                  <div className="Driver colormap"></div>
                                  <p>{t("Driver")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAll("second");
                                }}
                              >
                                <Nav.Link eventKey="second">
                                  <div className="Administrator colormap"></div>
                                  <p>{t("Administrator")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAll("four");
                                }}
                              >
                                <Nav.Link eventKey="four">
                                  <div className="FleetManager colormap"></div>
                                  <p>{t("Fleet Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAll("five");
                                }}
                              >
                                <Nav.Link eventKey="five">
                                  <div className="VehicleAssistant colormap"></div>
                                  <p>{t("Vehicle Assistant")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAll("six");
                                }}
                              >
                                <Nav.Link eventKey="six">
                                  <div className="TransportManager colormap"></div>
                                  <p>{t("Transport Manager")}</p>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item
                                onClick={() => {
                                  setAll("seven");
                                }}
                              >
                                <Nav.Link eventKey="seven">
                                  <div className="Other colormap"></div>
                                  <p>{t("Other's")}</p>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </div>
                          <Tab.Content>
                            <Tab.Pane eventKey="all">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={initial.options}
                                    series={initial.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="first">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={driverM.options}
                                    series={driverM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={administratorM.options}
                                    series={administratorM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="four">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={fleetManagerM.options}
                                    series={fleetManagerM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="five">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={vehicleAssistantM.options}
                                    series={vehicleAssistantM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="six">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={transportManagerM.options}
                                    series={transportManagerM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="seven">
                              <div className="map_body">
                                <div className="">
                                  <Chart
                                    options={otherM.options}
                                    series={otherM.series}
                                    type="bar"
                                    // width="100%"
                                    height="300"
                                  />
                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="lastActvity">
                <div className="heading">{t("Last Activities")}</div>
                <div className="body">
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Driver Rohit Sharma</span> added <span>30</span> new
                      <span>
                        <Link to="/Drivers">{t("driver's")}</Link>
                      </span>
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Fleet Manager John Doe</span> {t("made a transaction of")}
                      <span>$300</span> {t("to")}
                      <span>
                        <Link to="/ParkingSlot">{t("parking station")}</Link>
                      </span>
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Parking Manager David Miller</span> {t("checked")}
                      <span>
                        <Link to="/Drivers">{t("the driver's")}</Link>
                      </span>{" "}
                      {t("from")} <span>1st June to 30th June</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Vehicle Assistant MS Dhoni </span>{t("made new")}
                      <span>{t("transaction")}</span> {t("of")} <span>$500</span> {t("to")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle accident")} </Link>
                      </span>
                      .
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")} </Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")}</Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")}</Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")} </Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")}</Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span> Driver King Khan</span> {t("checked the")}
                      <span>
                        <Link to="/VehicleAccident">{t("vehicle expenses")} </Link>
                      </span>{" "}
                      {t("from")} <span>1st May to 30th May</span>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="lastOnline">
                <div className="heading">{t("Last Login's")}</div>
                <div className="body">
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Driver Rohit Sharma</span> logged In from WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Fleet Manager John Doe</span> Logged In from Mobile.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Administrator David Miller</span> Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Vehicle Assistant MS Dhoni </span> Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                  <div className="activeList">
                    <div className="time">01-01-2023, 03:15 PM</div>
                    <div className="activePersone">
                      <span>Transport Manager King</span> Khan Logged In from
                      WEB.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="UserTabel">
                <div className="heading">
                  <p className="main">{t("User Alert's")}</p>
                  <p className="viewall">
                    <Link to="/UserAlert">{t("View all")}</Link>
                  </p>
                </div>
                <table className="table tableAdmin">
                  <thead className="tableHead">
                    <tr>
                      <th>{t("Sr.no")}</th>
                      <th>{t("Date & Time")}</th>
                      <th>{t("User Name")}</th>
                      <th>{t("Alert Name")}</th>
                      <th>{t("Location")}</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    <tr>
                      <td>1</td>
                      <td>22-12-2022, 04:04:58 PM</td>
                      <td>Fleet Manager- John Doe</td>
                      <td>Sleep Tracking</td>
                      <td>Vishrantwadi, Pune</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>22-12-2022, 04:04:58 PM</td>
                      <td>Fleet Manager- John Doe</td>
                      <td>Sleep Tracking</td>
                      <td>Vishrantwadi, Pune</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>22-12-2022, 04:04:58 PM</td>
                      <td>Fleet Manager- John Doe</td>
                      <td>Sleep Tracking</td>
                      <td>Vishrantwadi, Pune</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>22-12-2022, 04:04:58 PM</td>
                      <td>Fleet Manager- John Doe</td>
                      <td>Sleep Tracking</td>
                      <td>Vishrantwadi, Pune</td>
                    </tr>
                    <tr>
                      <td>5 </td>
                      <td>22-12-2022, 04:04:58 PM</td>
                      <td>Fleet Manager- John Doe</td>
                      <td>Sleep Tracking</td>
                      <td>Vishrantwadi, Pune</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
