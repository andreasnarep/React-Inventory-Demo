import React from "react";
import "./Home.css"; // Import CSS file for styling
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Header from "../Header";
import api from '../../api/axiosConfig';
import LoadingMessage from "./LoadingMessage";

const Home = () => {
  const currentMonth = getMonthAsString(new Date().getMonth());
  const [month, setMonth] = useState(currentMonth);
  const [completedBQDoors, setCompletedBQDoors] = useState([]);
  const [completedPoloDoors, setCompletedPoloDoors] = useState([]);
  const [completedBQWindows, setCompletedBQWindows] = useState([]);
  const [completedBQWindowsQuantity, setCompletedBQWindowsQuantity] = useState(0);
  const [completedBQDoorsQuantity, setCompletedBQDoorsQuantity] = useState(0);
  const [completedPoloDoorsQuantity, setCompletedPoloDoorsQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getBQDoors(currentMonth);
      await getBQWindows(currentMonth);
      await getPoloDoors(currentMonth);
      setIsLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleMonthChange = (e) => {
    setMonth(e.target.value);

    getBQDoors(e.target.value);
    getBQWindows(e.target.value);
    getPoloDoors(e.target.value);
  };

  function getMonthAsString(monthNumber) {
    switch (monthNumber) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        throw new Error("Wrong month value proposed!");
    }
  }

  return (
    <div className="main-container">
      {isLoading && <LoadingMessage />}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <Header></Header>
      <div className="content">
        <div class="dropdown">
          <select className="home-month-select" onChange={handleMonthChange} value={month}>
            <option className="dropvalue" value="January">January</option>
            <option className="dropvalue" value="February">February</option>
            <option className="dropvalue" value="March">March</option>
            <option className="dropvalue" value="April">April</option>
            <option className="dropvalue" value="May">May</option>
            <option className="dropvalue" value="June">June</option>
            <option className="dropvalue" value="July">July</option>
            <option className="dropvalue" value="August">August</option>
            <option className="dropvalue" value="September">September</option>
            <option className="dropvalue" value="October">October</option>
            <option className="dropvalue" value="November">November</option>
            <option className="dropvalue" value="December">December</option>
          </select>
        </div>
        <div class="card-container">
          <div onClick={openBQDoors} class="card">
            <h2 class="card-title">BQ Doors</h2>
            <p class="card-content">{completedBQDoorsQuantity}</p>
          </div>
          <div onClick={openBQWindows} class="card">
            <h2 class="card-title">BQ Windows</h2>
            <p class="card-content">{completedBQWindowsQuantity}</p>
          </div>
          <div onClick={openPoloDoors} class="card">
            <h2 class="card-title">Polo Doors</h2>
            <p class="card-content">{completedPoloDoorsQuantity}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isPoloDoorsOpen} onClose={closePoloDoors} title="Polo Doors" data={completedPoloDoors}></Modal>
      <Modal isOpen={isBQDoorsOpen} onClose={closeBQDoors} title="BQ Doors" data={completedBQDoors}></Modal>
      <Modal isOpen={isBQWindowsOpen} onClose={closeBQWindows} title="BQ Windows" data={completedBQWindows}></Modal>

    </div>
  );
};

export default Home;