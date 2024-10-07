import React, { useState, useEffect } from "react";
import "./AboutContest.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField, {
  FileInputField,
} from "../../../utilities/FormComponents";
import { HOST_ENDPOINT, BASE_SERVER_URL, CONTESTS } from "../../../Constants";
import { sendData } from "../../apis/ApiRequests";
import { storage } from "../../../firebase/firebase";
import showSwalAlert from "../../../utilities/AlertComponents";
import { useUser } from "../../../context/user";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router-dom";

function AboutContest({ contestUrl }) {
  const { contestId } = useParams();
  const { current: user } = useUser();
  const [loading, setLoading] = useState(false);
  console.log(contestId);
  const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "edit/details/";

  // Input fields definition
  const inputFields = [
    { label: "About", name: "about" },
    { label: "Eligibility", name: "eligibility" },
    { label: "Rules", name: "rules" },
    { label: "Others", name: "others" },
  ];
  // Form handler for input fields
  const {
    formData: aboutData,
    handleInputChange,
    handleFileChange,
    imageUploadStatus,
  } = useFormHandler({
    contest: "",
    about: "",
    eligibility: "",
    others: "",
    rules: "",
    bannerImage: null,
  });

  // Function to handle form submission
  const handleAboutSubmit = async () => {
    setLoading(true); // Set loading to true at the start
    const aboutFormData = new FormData();
    aboutFormData.append("contest", contestId);
    aboutFormData.append("about", aboutData.about);
    aboutFormData.append("eligibility", aboutData.eligibility);
    aboutFormData.append("rules", aboutData.rules);
    aboutFormData.append("others", aboutData.others);

    // Handle banner image upload if available
    if (aboutData.bannerImage) {
      const uniqueImageName = user?.uid + aboutData.bannerImage.name;
      const storageRef = ref(storage, `images/${uniqueImageName}`);

      try {
        const snapshot = await uploadBytes(storageRef, aboutData.bannerImage);
        const imageUrl = await getDownloadURL(snapshot.ref);
        aboutFormData.append("contest_banner_image", imageUrl);
      } catch (error) {
        showSwalAlert({
          icon: "error",
          title: "Image Upload Error",
          text: "Failed to upload contest banner image. Please try again.",
        });
        setLoading(false);
        return; // Stop further execution if image upload fails
      }
    }

    // Send form data to the backend
    try {
      await sendData(url, aboutFormData);
      showSwalAlert({
        icon: "success",
        title: "Success",
        text: "Contest details updated successfully!",
      });
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: "Submission Error",
        text: "Failed to submit contest details. Please try again.",
      });
    } finally {
      setLoading(false); // Always set loading to false after submission
    }
  };

  return (
    <div>
      <LoadingOverlay
        active={loading}
        text="It will not take more than few seconds"
        spinner={
          <PulseLoader
            color={"var(--text-color)"}
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <div className="about-contest">
          <div className="about-contest-header">
            <h2 style={{ fontWeight: 600 }}>About the Contest</h2>
            <Link
              to=""
              style={{ textDecoration: "none", color: "var(--text-color)" }}
            >
              {contestUrl}www.codehut.com/hackHard
            </Link>
          </div>
          <div className="about-form">
            <Form>
              <FileInputField
                label="Contest Banner Image"
                name="bannerImage"
                onChange={(event) => handleFileChange(event, 1024 * 1024)}
                required={false}
                groupClass="mb-3 about-input-field"
                labelClass="text-area-label"
                controlClass="form-control-custom"
                accept=".jpg, .png, .jpeg, .svg"
                value={aboutData.bannerImage}
                helperText="Please select a JPG, PNG, JPEG, or SVG file."
                uploadStatus={imageUploadStatus}
              />
              {inputFields.map((field, index) => (
                <TextAreaField
                  key={index}
                  label={field.label}
                  name={field.name}
                  value={aboutData[field.name]}
                  onChange={handleInputChange}
                  controlId={`ControlTextarea${index}`}
                  groupClass={"about-input-field"}
                  labelClass={"text-area-label"}
                  controlClass={"text-area-control"}
                />
              ))}
            </Form>
          </div>
        </div>
        <ContestEditFooter saveChanges={handleAboutSubmit} />
      </LoadingOverlay>
    </div>
  );
}

export default AboutContest;
