import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SelectedChallenges.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from "sweetalert2";
import { BASE_SERVER_URL, CONTESTS, HOST_ENDPOINT } from "../../../Constants";
import { useParams } from "react-router-dom";
import { sendData, getData, deleteData } from "../../apis/ApiRequests";

const SelectedChallenges = ({ contestUrl }) => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [wasChallengeAdded, setWasChallengeAdded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const url =
          BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + "edit/challenge/";
        const response = await getData(url);
        const data = response.data.data;
        if (data) {
          setProblems(data);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [wasChallengeAdded]);

  useEffect(() => {
    const fetchContestProblems = async () => {
      try {
        const url =
          BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + "/problems/";
        const response = await getData(url);
        const data = response.data.data;
        if (data) {
          setQuestions(data);
        }
        
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchContestProblems();
  }, [contestId]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCreateChallenge = () => {
    const newTab = window.open("/administration/create/challenge", "_blank");
    const handleMessage = (event) => {
      if (event.data === "formSubmitted") {
        setWasChallengeAdded(!wasChallengeAdded);
        newTab.close();
        navigate(`/administration/contests/${contestId}/edit/challenges`);
      }
    };
    window.addEventListener("message", handleMessage, false);
  };

  const handleQuestionSelection = async (result) => {
    if (result.isConfirmed) {
      const { name: problemId, score } = result.value;
      const problem = problems.find((item) => item.problem_id == problemId);
      const url = BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + "/problems/"
      const problemData = new FormData();
      problemData.append("contest", contestId)
      problemData.append("problem", problem.problem_id)
      problemData.append("order_of_problem_in_contest", 12)
      problemData.append("weightage", score)
      if (problems) {
        const response = await sendData(url, problemData)
        if (response){
          const response2 = await getData(url);
          const data2 = response2.data.data
          if (data2){
            setQuestions(data2);
          }
        }
      }
      console.log("questions", problem);
      console.log(`Problem added with Name: ${problemId}, Score: ${score}`);
    }
  };
  const handleDelete = async (problemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the problem!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${BASE_SERVER_URL}${HOST_ENDPOINT}contests/${contestId}/problems/${problemId}/`;
          await deleteData(url);
          
          const updatedResponse = await getData(BASE_SERVER_URL + HOST_ENDPOINT + CONTESTS + contestId + "/problems/");
          setQuestions(updatedResponse.data.data); // Update state with fresh data
  
          Swal.fire("Deleted!", "The problem has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting problem:", error);
          Swal.fire("Error!", "Failed to delete the problem.", "error");
        }
      }
    });
  };
  
  
  const handleAddChallenge = () => {
    const filterSuggestions = (query, suggestions) => {
      if (!query) return [];
      return suggestions.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    let nameInput, tagInput;

    Swal.fire({
      title: "Add Problems to Contest",
      html: `
          <input id="contest-name" class="swal2-input custom-input" placeholder="Name of problem to search" autocomplete="off" />
          <ul id="name-list" class="autocomplete-list"></ul>
          <input id="contest-score" class="swal2-input custom-input" placeholder="Score for problem"/>
        `,
      // <input id="contest-tag" class="swal2-input custom-input" placeholder="Tag of Contest" autocomplete="off" />
      // <ul id="tag-list" class="autocomplete-list"></ul>
      focusConfirm: false,
      showCancelButton: true,
      reverseButtons: true,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button'
      },
      preConfirm: () => {
        const name = nameInput?.name || "";
        const score = document.getElementById("contest-score").value;
        // const tag = tagInput?.value || '';

        if (!name || !score) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }

        return { name, score };
      },
      didOpen: () => {
        nameInput = document.getElementById("contest-name");
        // tagInput = document.getElementById('contest-tag');
        const nameList = document.getElementById("name-list");
        // const tagList = document.getElementById('tag-list');

        const handleAutocomplete = (
          inputElement,
          suggestionsList,
          suggestionsArray
        ) => {
          inputElement.addEventListener("input", () => {
            const query = inputElement.value;
            const suggestions = filterSuggestions(query, suggestionsArray);
            console.log("sugges", suggestions)
            suggestionsList.innerHTML = "";
            if (suggestions.length === 0) {
              suggestionsList.style.display = "none";
              return;
            }

            suggestions.map((suggestion, index) => {
              const li = document.createElement("li");
              li.textContent = suggestion.name;
              li.addEventListener("click", () => {
                inputElement.value = suggestion.name;
                inputElement.name = suggestion.problem_id;
                suggestionsList.style.display = "none";
              });
              suggestionsList.appendChild(li);
            });

            suggestionsList.style.display = "block";
          });
        };

        handleAutocomplete(nameInput, nameList, problems);

        document.addEventListener("click", (event) => {
          if (!nameInput.contains(event.target))
            nameList.style.display = "none";
          // if (!tagInput.contains(event.target)) tagList.style.display = 'none';
        });
      },
    }).then((result) => {
      handleQuestionSelection(result)
      }
    );
  };

  return (
    <>
      <div className="selected-questions">
        <div className="selected-questions-header">
          <h2 style={{ fontWeight: 600 }}>Contest Challenges</h2>
          <Link
            to=""
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            {contestUrl}www.codehut.com/hackHard
          </Link>
        </div>
        <div className="question-list-container">
          <div className="questions-search-container">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="questions-s-b"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="questions-add">
            <div className="question-create-txt">
              <p>
                To create your own problem. Click{" "}
                <a style={{color: "rgb(89, 89, 247)"}}onClick={handleCreateChallenge}>Here</a>
              </p>
            </div>
            <button className="questions-add-btn" onClick={handleAddChallenge}>
              Add Challenge
            </button>
          </div>
          <div className="questions">
            {questions.map((q) => (
              <div
                key={q.problem.id}
                className="question-card"
                onClick={() => toggleExpand(q.problem.id)}
              >
                <div className="question-header">
                  <p>
                    <strong>{q.problem.name}</strong>
                  </p>
                </div>
                <div
                  className={`question-body ${
                    expandedCard === q.problem.id ? "expanded" : ""
                  }`}
                >
                  {Object.entries(q.problem).map(
                    ([key, value]) =>
                      key !== "id" &&
                      key !== "name" && (
                        <p key={key}>
                          <strong>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </strong>
                          <br />
                          {value}
                        </p>
                      )
                  )}
                </div>
                <div className="buttons-container">
                <button
                    className="questions-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(q.problem.id);
                    }}
                  >
                    Delete
                  </button>
                  <button className="questions-edit-btn">Edit</button>
                  <button
                    className="read-more-button"
                    onClick={() => toggleExpand(q.problem.id)}
                  >
                    {expandedCard === q.problem.id ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedChallenges;
