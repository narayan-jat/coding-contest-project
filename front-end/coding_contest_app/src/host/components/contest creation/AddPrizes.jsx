import React from "react";
import "./AddPrizes.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ContestEditFooter from "./ContestEditFooter";
import { useFormHandler } from "./FormHandlers";
import TextAreaField, { TextInputField } from "../../../utilities/FormComponents";
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";

function AddPrizes({ contestUrl }) {
  const textAreaFields = [
    {
      label: "Prize Description",
      name: "prizeDescription",
    },
    {
      label: "Others",
      name: "others",
    },
  ];

  const inputFields = [
    {
      label: "Prize Position",
      name: "prizePosition",
      type: "text"
    },

    {
      label: "Prize Amount",
      name: "prizeAmount",
      type: "number"
    },
  ];
  const { formData: prizeData, handleInputChange } = useFormHandler({
    contest: 1,
    prizePosition: "",
    prizeDescription: "",
    prizeAmount: "",
    others: "",
  });

  const handlePrizeSubmit = async () => {
    const prizeFormData = new FormData();
    prizeFormData.append("contest", prizeData.contest);
    prizeFormData.append("prize_position", prizeData.prizePosition);
    prizeFormData.append("prize_description", prizeData.prizeDescription);
    prizeFormData.append("prize_amount", prizeData.prizeAmount);
    prizeFormData.append("others", prizeData.others);
    const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "edit/prizes/";
    await sendData(url, prizeFormData);
  };

  return (
    <div>
      <div className="prize-contest">
        <div className="prize-contest-header">
          <h2 style={{ fontWeight: 600 }}>Add Prize</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="prize-form">
          <Form>
          {inputFields.map((field, index) => (
              <TextInputField
                key={index}
                type={field.type}
                label={field.label}
                name={field.name}
                value={prizeData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"prize-input-field"}
                labelClass={"text-area-label"}
                controlClass={"text-area-control"}
              />
            ))}

            {textAreaFields.map((field, index) => (
              <TextAreaField
                key={index}
                label={field.label}
                name={field.name}
                value={prizeData[field.name]}
                onChange={handleInputChange}
                controlId={`ControlTextarea${index}`}
                groupClass={"prize-input-field"}
                labelClass={"text-area-label"}
                controlClass={"text-area-control"}
              />
            ))}
          </Form>
        </div>
      </div>
      <ContestEditFooter saveChanges={handlePrizeSubmit} />
    </div>
  );
}

export default AddPrizes;
