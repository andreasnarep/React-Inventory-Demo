import React from "react";
import ReactDOM from "react-dom";
import "./Home.css"; // Import CSS file for styling
import logo from "../../images/logo.jpg"; // Import your logo image
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Header from "../Header";
import api from '../../api/axiosConfig';

const Home = () => {
  const currentMonth = getMonthAsString(new Date().getMonth());
  const [month, setMonth] = useState(currentMonth);
  const [completedBQDoors, setCompletedBQDoors] = useState([]);
  const [completedPoloDoors, setCompletedPoloDoors] = useState([]);
  const [completedBQWindows, setCompletedBQWindows] = useState([]);
  const [completedBQWindowsQuantity, setCompletedBQWindowsQuantity] = useState(0);
  const [completedBQDoorsQuantity, setCompletedBQDoorsQuantity] = useState(0);
  const [completedPoloDoorsQuantity, setCompletedPoloDoorsQuantity] = useState(0);

  const completedItems = {
    bqUksed: 15,
    bqAknad: 10,
    poloUksed: 5
  };

  useEffect(() => {
    getBQDoors(currentMonth);
    getBQWindows(currentMonth);
    getPoloDoors(currentMonth);
  }, []);

  function findBQWindowsQuantity(completedBQWindows) {
    // Check if the input array is provided
    if (!completedBQWindows || !Array.isArray(completedBQWindows)) {
      return 0;
    }

    // Use reduce to sum up the quantities of windows
    const totalQuantity = completedBQWindows.reduce((accumulator, currentWindow) => {
      return accumulator + currentWindow.quantity; // Add the quantity of each window to the accumulator
    }, 0); // Start with an initial value of 0 for the accumulator

    setCompletedBQWindowsQuantity(totalQuantity);
  };
  
  function findBQDoorsQuantity(completedBQDoors) {
    // Check if the input array is provided
    if (!completedBQDoors || !Array.isArray(completedBQDoors)) {
      return 0;
    }

    // Use reduce to sum up the quantities of windows
    const totalQuantity = completedBQDoors.reduce((accumulator, currentWindow) => {
      return accumulator + currentWindow.quantity; // Add the quantity of each window to the accumulator
    }, 0); // Start with an initial value of 0 for the accumulator

    setCompletedBQDoorsQuantity(totalQuantity);
  };
  
  function findPoloDoorsQuantity(completedPoloDoors) {
    // Check if the input array is provided
    if (!completedPoloDoors || !Array.isArray(completedPoloDoors)) {
      return 0;
    }

    // Use reduce to sum up the quantities of windows
    const totalQuantity = completedPoloDoors.reduce((accumulator, currentDoor) => {
      return accumulator + currentDoor.quantity; // Add the quantity of each window to the accumulator
    }, 0); // Start with an initial value of 0 for the accumulator

    setCompletedPoloDoorsQuantity(totalQuantity);
  };

  const getBQDoors = async (month) => {
    try {
      const response = await api.get("/api/main-page/bq-doors/" + month);
      const bqDoorData = response.data;
      console.log(response);
      //setDoorNames(names);
      //setDoorType(names[0]);
      console.log(bqDoorData);
      //setInventoryItems(response.data);
      setCompletedBQDoors(bqDoorData);
      findBQDoorsQuantity(bqDoorData);
    } catch (err) {
      console.log(err);
    }
  }
  
  const getPoloDoors = async (month) => {
    try {
      const response = await api.get("/api/main-page/polo-doors/" + month);
      const poloDoorData = response.data;
      console.log(response);
      //setDoorNames(names);
      //setDoorType(names[0]);
      console.log(poloDoorData);
      //setInventoryItems(response.data);
      setCompletedPoloDoors(poloDoorData);
      findPoloDoorsQuantity(poloDoorData);
    } catch (err) {
      console.log(err);
    }
  }

  const getBQWindows = async (month) => {
    try {
      const response = await api.get("/api/main-page/bq-windows/" + month);
      const bqWindowData = response.data;
      console.log(response);
      //setDoorNames(names);
      //setDoorType(names[0]);
      console.log(bqWindowData);
      //setInventoryItems(response.data);
      setCompletedBQWindows(bqWindowData);
      findBQWindowsQuantity(bqWindowData);
    } catch (err) {
      console.log(err);
    }
  }

  // Modal use state for polo doors
  const [isPoloDoorsOpen, setIsPoloDoorsOpen] = useState(false);
  const openPoloDoors = () => setIsPoloDoorsOpen(true);
  const closePoloDoors = () => setIsPoloDoorsOpen(false);

  // Modal use state for bq doors
  const [isBQDoorsOpen, setIsBQDoorsOpen] = useState(false);
  const openBQDoors = () => setIsBQDoorsOpen(true);
  const closeBQDoors = () => setIsBQDoorsOpen(false);

  // Modal use state for bq windows
  const [isBQWindowsOpen, setIsBQWindowsOpen] = useState(false);
  const openBQWindows = () => setIsBQWindowsOpen(true);
  const closeBQWindows = () => setIsBQWindowsOpen(false);

  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  //const [month, setMonth] = useState("");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);

    getBQDoors(e.target.value);
    getBQWindows(e.target.value);
    getPoloDoors(e.target.value);
  };

  function showBQDoorsMonthlyDetails() {
    console.log("bq doors monthly pressed");
  };

  function showBQWindowsMonthlyDetails() {
    console.log("bq windows monthly pressed");
  };

  function showPoloDoorsMonthlyDetails() {
    console.log("polo doors monthly pressed");
  };

  function getMonthAsString(monthNumber) {
    switch (monthNumber) {
      case 0:
        return "Jaanuar";
      case 1:
        return "Veebruar";
      case 2:
        return "Märts";
      case 3:
        return "Aprill";
      case 4:
        return "Mai";
      case 5:
        return "Juuni";
      case 6:
        return "Juuli";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "Oktoober";
      case 10:
        return "November";
      case 11:
        return "Detsember";
      default:
        throw new Error("Wrong month value proposed!");
    }
  }

  const dataForModal = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 }
  ];

  return (
    <div className="main-container">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <Header></Header>
      <div className="content">
        <div class="dropdown">
          <select className="home-month-select" onChange={handleMonthChange} value={month}>
            <option className="dropvalue" value="Jaanuar">Jaanuar</option>
            <option className="dropvalue" value="Veebruar">Veebruar</option>
            <option className="dropvalue" value="Märts">Märts</option>
            <option className="dropvalue" value="Aprill">Aprill</option>
            <option className="dropvalue" value="Mai">Mai</option>
            <option className="dropvalue" value="Juuni">Juuni</option>
            <option className="dropvalue" value="Juuli">Juuli</option>
            <option className="dropvalue" value="August">August</option>
            <option className="dropvalue" value="September">September</option>
            <option className="dropvalue" value="Oktoober">Oktoober</option>
            <option className="dropvalue" value="November">November</option>
            <option className="dropvalue" value="Detsember">Detsember</option>
          </select>
        </div>
        <div class="card-container">
          <div onClick={openBQDoors} class="card">
            <h2 class="card-title">BQ Uksed</h2>
            <p class="card-content">{completedBQDoorsQuantity}</p>
          </div>
          <div onClick={openBQWindows} class="card">
            <h2 class="card-title">BQ Aknad</h2>
            <p class="card-content">{completedBQWindowsQuantity}</p>
          </div>
          <div onClick={openPoloDoors} class="card">
            <h2 class="card-title">Polo Uksed</h2>
            <p class="card-content">{completedPoloDoorsQuantity}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isPoloDoorsOpen} onClose={closePoloDoors} title="Polo Uksed" data={completedPoloDoors}></Modal>
      <Modal isOpen={isBQDoorsOpen} onClose={closeBQDoors} title="BQ Uksed" data={completedBQDoors}></Modal>
      <Modal isOpen={isBQWindowsOpen} onClose={closeBQWindows} title="BQ Aknad" data={completedBQWindows}></Modal>

    </div>
  );
};

export default Home;