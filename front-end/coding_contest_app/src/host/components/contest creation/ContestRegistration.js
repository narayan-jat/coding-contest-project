import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import "./ContestRegistration.css";

const ContestRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contestName: "",
    organisationType: "",
    organisationName: "",
    startDateTime: "",
    endDateTime: "",
    contestVisibility: "",
    participantLimit: 500,
    contestImage: null,
  });
  const [imageUploadStatus, setImageUploadStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      contestImage: e.target.files[0],
    });
    setImageUploadStatus("Image uploaded successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.startDateTime) {
      document.querySelector(".start-date input").focus();
      return;
    }

    if (!formData.endDateTime) {
      document.querySelector(".end-date input").focus();
      return;
    }

    if (moment(formData.endDateTime).isBefore(moment(formData.startDateTime))) {
      toast.warn(
        "Make sure end date and time is greater than start date and time"
      );
      return;
    }

    try {
      let formDataToSend = new FormData();
      formDataToSend.append("contest_name", formData.contestName);
      formDataToSend.append("organisation_type", formData.organisationType);
      formDataToSend.append("organisation_name", formData.organisationName);
      formDataToSend.append("start_date_time", formData.startDateTime);
      formDataToSend.append("end_date_time", formData.endDateTime);
      formDataToSend.append("contest_visibility", formData.contestVisibility);
      formDataToSend.append("participant_limit", formData.participantLimit);
      formDataToSend.append("contest_image", formData.contestImage);

      setLoading(true);
      const response = await axios.post(
        "http://192.168.1.201:8000/host/add-contest-details/",
        formDataToSend
      );

      Swal.fire(
        "Contest Created",
        "Now move to forward for questions",
        "success"
      );
    } catch (error) {
      if (!error.response) {
        Swal.fire(
          "Network Error",
          "Please check your internet connection and try again",
          "error"
        );
      } else if (error.response.status === 500) {
        Swal.fire(
          "Contest not created",
          "Oops! Facing internal server error",
          "error"
        );
      } else if (error.response.status === 400) {
        Swal.fire(
          "Bad Request",
          "Please check the submitted data and try again",
          "error"
        );
      } else {
        Swal.fire(
          "Error",
          `An error occurred: ${error.response.statusText}`,
          "error"
        );
      }
    }
    setLoading(false);
  };

  const handleOkClick = () => {
    const outsideClickTarget = document.body;
    if (outsideClickTarget) {
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideClickTarget.dispatchEvent(event);
    }
  };

  const customRenderView = (viewMode, renderDefault) => {
    return (
      <div>
        {renderDefault()}
        {viewMode === 'time' && (
          <button
            type="button"
            id="ok-button"
            onClick={handleOkClick}
          >
            OK
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="contest-detail-filling">
      <LoadingOverlay
        active={loading}
        text="Hold tight digesting the details..."
        spinner={
          <PulseLoader
            color={"black"}
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <div>
          <h2
            style={{ textAlign: "center", fontWeight: 700, paddingTop: "50px" }}
          >
            Create Contest
          </h2>
        </div>

        <div>
          <p style={{ textAlign: "center", fontWeight: 700, padding: "5px 0" }}>
            Host your own contest here on this platform.
          </p>
        </div>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName" required>
              <Form.Label>Contest Name *</Form.Label>
              <Form.Control
                type="text"
                name="contestName"
                placeholder="Enter contest name"
                value={formData.contestName}
                onChange={handleChange}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupOrganisationType"
              required
            >
              <Form.Label>Organization Type *</Form.Label>
              <Form.Select
                name="organisationType"
                aria-label="Select Organization type"
                value={formData.organisationType}
                onChange={handleChange}
                required
                className="form-control-custom"
              >
                <option value="">Select Organization type</option>
                <option value="university">University</option>
                <option value="company">Company</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupOrganisation"
              required
            >
              <Form.Label>Organization Name *</Form.Label>
              <Form.Control
                type="text"
                name="organisationName"
                placeholder="Enter organization name"
                value={formData.organisationName}
                onChange={handleChange}
                required
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupStartDateTime"
              required
            >
              <Form.Label>Select Start Date and Time *</Form.Label>
              <Datetime
                className="start-date date-picker"
                timeFormat={true}
                dateFormat={true}
                renderView={customRenderView}
                inputProps={{
                  placeholder: "Select start date and time",
                  className: "form-control-custom",
                }}
                onChange={(date) =>
                  setFormData({ ...formData, startDateTime: date })
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupEndDateTime"
              required
            >
              <Form.Label>Select End Date and Time *</Form.Label>
              <Datetime
                className="end-date date-picker"
                timeFormat={true}
                dateFormat={true}
                renderView={customRenderView}
                inputProps={{
                  placeholder: "Select end date and time",
                  className: "form-control-custom",
                }}
                onChange={(date) =>
                  setFormData({ ...formData, endDateTime: date })
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGroupVisibility"
              required
            >
              <Form.Label>Contest Visibility *</Form.Label>
              <Form.Select
                name="contestVisibility"
                aria-label="Select contest visibility"
                value={formData.contestVisibility}
                onChange={handleChange}
                required
                className="form-control-custom"
              >
                <option value="">Select contest visibility type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Contest Banner Image *</Form.Label>
              <Form.Control
                id="file-input"
                type="file"
                accept=".jpg, .png, .jpeg, .svg"
                onChange={handleFileChange}
                required
                className="form-control-custom"
              />
              <label htmlFor="file-input" className="custom-file-button">
                Choose File
              </label>
              {formData.contestImage && (
                <div className="file-name-display">
                  Selected file: {formData.contestImage.name}
                </div>
              )}
              <Form.Text muted>
                Please select a JPG, PNG, JPEG, or SVG file.
              </Form.Text>
              {imageUploadStatus && (
                <div style={{ color: "green", marginTop: "10px" }}>
                  {imageUploadStatus}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLimit">
              <Form.Label>Participant Limit</Form.Label>
              <Form.Control
                type="number"
                name="participantLimit"
                placeholder="Enter participant limit"
                value={formData.participantLimit}
                onChange={handleChange}
                className="form-control-custom"
              />
            </Form.Group>

            <div className="formsubmit">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default ContestRegistration;
