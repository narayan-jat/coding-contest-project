import React from "react";
import { Image } from "react-bootstrap";
import { FaLocationArrow, FaCalendar, FaGlobe } from "react-icons/fa";
import "./styles/ContestDetails.css";

const ContestDetails = () => {
  return (
    <div className="contest-details">
      <div className="contest-details-images">
        <div className="image1-div">
          <Image
            className="image1"
            src="/media/contest detailes/image.webp"
            alt="Example"
          ></Image>
          <div className="image2-div">
            <Image
              className="image2"
              src="/media/contest_images/coding.png"
              alt="Example"
            ></Image>
          </div>
        </div>
      </div>l
      <div className="contest-details-metadata">
        <div>
            <h2>Hack Hard</h2>
            <div style={{paddingLeft: "10px"}}>
                <p><FaGlobe size={20}></FaGlobe> Shri Ram swaroop memorial university</p>
                <p> <FaLocationArrow size={20}></FaLocationArrow> Murda, Rajsamand India</p>
                <p><FaCalendar size={15}></FaCalendar> Last updated on: 23/06/2024</p>
            </div>
        </div>
        <h3 className="deadline-heading">Dates and Deadlines</h3>
        <div className="contest-details-metadata-right">
            <p>Registration ends on: 23/04/2024 at 12 AM</p>
            <p>Starts On: 24/06/2024 at 8:30 PM</p>
            <p>Contest Duration: 180 Minutes</p>
            <p>Participant Limit: 500</p>
            <p>Number of questions: 15</p>
        </div>
      </div>
      <div className="contest-other-details">
          <h3>About Contest</h3>
          <div>
            <h4>Details</h4>
            <p></p>
          </div>
      </div>
    </div>
  );
};

export default ContestDetails;
