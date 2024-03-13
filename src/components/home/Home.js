import React from "react";
import ReactDOM from "react-dom";
import "./Home.css"; // Import CSS file for styling
import logo from "../../images/logo.jpg"; // Import your logo image
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Header from "../Header";

const Home = () => {

  const completedItems = {
    bqUksed: 15,
    bqAknad: 10,
    poloUksed: 5
  };

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

  const [month, setMonth] = useState("");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
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

  const dataForModal = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 }
  ];

  return (
    <div className="main-container">
      <Header></Header>
      <div className="content">
        <div class="dropdown">
          <select onChange={handleMonthChange} value={month}>
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
            <p class="card-content">15</p>
          </div>
          <div onClick={openBQWindows} class="card">
            <h2 class="card-title">BQ Aknad</h2>
            <p class="card-content">20</p>
          </div>
          <div onClick={openPoloDoors} class="card">
            <h2 class="card-title">Polo Uksed</h2>
            <p class="card-content">75</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isPoloDoorsOpen} onClose={closePoloDoors} title="Polo Uksed" data={dataForModal}></Modal>
      <Modal isOpen={isBQDoorsOpen} onClose={closeBQDoors} title="BQ Uksed" data={dataForModal}></Modal>
      <Modal isOpen={isBQWindowsOpen} onClose={closeBQWindows} title="BQ Aknad" data={dataForModal}></Modal>
    </div>
  );
};

export default Home;