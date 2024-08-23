import backgroundImage from "../assets/images/background_Image.jpg";
import createPlanDefaultImage from "../assets/images/create_plan_image.jpg";
import tabLogo from "../assets/images/tabLogo.JPG";
import destinationDefaultImage from "../assets/images/destinationDefaultImage.jpg";
import imageNotFound from "../assets/images/imageNotFound.png";
import { daysLeft } from "./daysLeft.js";
import { getPhoto } from "./getPhoto.js";
import { validatePlanForm } from "./validatePlanForm.js";
import { validateDestForm } from "./validateDestForm.js";
import { getWeatherData } from "./getWeatherData.js";
const planNameInput = document.getElementById("plan-Name");
const leavingDateInput = document.getElementById("leaving-date-input");
const returningDateInput = document.getElementById("returning-date-input");
const createPlanSubmitButton = document.getElementById("createPlan-submitButton");
const planListSection = document.querySelector(".plan-list");
const deleteAllPlans = document.getElementById("deleteAllPlans");
const planListItems = document.querySelector(".planListCardsContent");
const CancelPlanButton = document.getElementById("CancelPlanButton");
const planDetailsSection = document.querySelector(".plan-details");
const addNewDestintationSection = document.querySelector(".addNewDestintation");
let createPlanSection = document.querySelector(".create-Plan");
let createNewPlan = document.getElementById("createNewPlanButton");
let plans = getPlansFromLocalStorage();

// Main function ---Home Page ......................................................................
document.addEventListener("DOMContentLoaded", (e) => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mainElement = document.querySelector("main");
  const createPlanImageelement = document.querySelector(".create-plan-image-container img");

  createPlanImageelement.src = createPlanDefaultImage;
  mainElement.style.backgroundImage = `url(${backgroundImage})`;
  mainElement.style.backgroundPosition = "top";
  mainElement.style.backgroundSize = "cover";
  mainElement.style.backgroundRepeat = "no-repeat";
  e.preventDefault();
  displayPlanList();
  document.querySelector('link[rel="icon"]').href = tabLogo;
  planDetailsSection.style.display = "none";

// add Event Listeners in home page
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  createNewPlan.addEventListener("click", (e) => {
    e.preventDefault();
    createPlanSection.style.display = "flex";
    planListSection.style.display = "none";
  });

  createPlanSubmitButton.addEventListener("click", (e) => {
    let isValid = validatePlanForm();
    console.log("isValidPlan", isValid);
    if (isValid == true) {
      e.preventDefault();
      addPlan();
      createPlanSection.style.display = "none";
      planListSection.style.display = "block";
    } else {
      createPlanSection.style.display = "flex";
      planListSection.style.display = "none";
    }
  });

  document.getElementById("plan-Name").addEventListener("blur", async (e) => {
    try {
      let item = e.target.value;
      console.log(item + "55555555");
      createPlanImageelement.src = await getPhoto(item);
    } catch (error) {
      console.error("Error fetching the photo:", error);
      createPlanImageelement.alt = "Image not available";
      createPlanImageelement.src = imageNotFound;
    }
  });

  document.getElementById("leaving-date-input").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        Client.validatePlanForm();
      }
    });

  deleteAllPlans.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("plansSaved", JSON.stringify([]));
    window.location.reload();
  });

  CancelPlanButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.location.reload();
  });
});

// helper functions......................................................................

function addPlan() {
  let planItems = {
    planNameInput: planNameInput.value,
    leavingDateInput: leavingDateInput.value,
    returningDateInput: returningDateInput.value,
    destinations: [],
  };
  plans.push(planItems);
  localStorage.setItem("plansSaved", JSON.stringify(plans));
  planListItems.innerHTML = "";
  displayPlanList();
}

async function displayPlanList() {
  const blankPlanList = document.querySelector(".blank-plan-list");
  planListItems.innerHTML = ""; // Clear the list before displaying

  const plansSaved = getPlansFromLocalStorage();
  if (plansSaved.length === 0) {
    blankPlanList.style.display = "block";
    planListItems.style.display = "none";
  } else {
    blankPlanList.style.display = "none";
    planListItems.style.display = "flex";

    for (let i = 0; i < plansSaved.length; i++) {
      const planListCard = document.createElement("div");
      planListCard.classList.add("planListCard");
      planListCard.innerHTML = `
        <h4 class="planCardTitle">${plansSaved[i].planNameInput}</h4>
        <div class="planImage">
        <img src="" class="planNameImage" alt=""/>
        </div>
         <div class="planTimeDetails">
          <div class="planLeaving">
            <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" id="date-up" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier">
              <path id="secondary" d="M3,9H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V9A0,0,0,0,1,3,9Z" style="fill: #2cba56; stroke-width: 2;"/>
              <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21ZM16,3V6M8,3V6m4,7v4" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
              <polyline id="primary-2" data-name="primary" points="10 15 12 13 14 15" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
              </g>
              </svg>
            <p class="plan-leaving-date">${plansSaved[i].leavingDateInput}</p>
          </div>
          <div class="planReturning">
            <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" id="date-down" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
  
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              
              <g id="SVGRepo_iconCarrier">
              
              <path id="secondary" d="M3,9H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V9A0,0,0,0,1,3,9Z" style="fill: #d73737; stroke-width: 2;"/>
              
              <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21ZM16,3V6M8,3V6m4,11V13" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
              
              <polyline id="primary-2" data-name="primary" points="10 15 12 17 14 15" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
              
              </g>
              
              </svg>
              <p class="plan-returning-date">${
                plansSaved[i].returningDateInput
              }</p>
          </div>
          <div class="planRemainingDays">
            <svg fill="#eda507" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#eda507">
  
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              
              <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M422.957,478.609h-16.696v-89.044c0-58.16-33.276-108.601-81.734-133.565c48.954-25.22,81.734-75.864,81.734-133.565 V33.391h16.696c9.217,0,16.696-7.473,16.696-16.696C439.652,7.473,432.174,0,422.957,0C355.995,0,156.678,0,89.044,0 c-9.217,0-16.696,7.473-16.696,16.696c0,9.223,7.479,16.696,16.696,16.696h16.696v89.044c0,57.692,32.771,108.341,81.734,133.565 c-48.459,24.964-81.734,75.405-81.734,133.565v89.044H89.044c-9.217,0-16.696,7.473-16.696,16.696 c0,9.223,7.479,16.696,16.696,16.696c111.521,0,222.498,0,333.913,0c9.217,0,16.696-7.473,16.696-16.696 C439.652,486.082,432.174,478.609,422.957,478.609z M139.641,132.511c-0.817-9.509-0.511-5.456-0.511-99.12H372.87 c0,93.664,0.306,89.611-0.511,99.12H139.641z M372.87,459.661c-92.104-76.755-88.747-75.372-100.174-79.41v-18.512 c0-9.223-7.479-16.696-16.696-16.696s-16.696,7.473-16.696,16.696v18.511c-11.307,3.996-7.768,2.403-100.174,79.41v-70.095 c0-58.759,43.63-107.391,100.174-115.536v20.927c0,9.223,7.479,16.696,16.696,16.696s16.696-7.473,16.696-16.696v-20.927 c56.544,8.145,100.174,56.777,100.174,115.536V459.661z"/> </g> </g> </g>
              
              </svg>
              <p class="plan-remaining-days-count">${daysLeft(
                plansSaved[i].leavingDateInput
              )} days</p>
          </div>
       </div>
       <p class="planItemDetailInstruction"> Click on Details button to  to add destinations to your plan</p>

        <div class="planListcardButtons">
      <button id="planItemDetailButton${i}" class="planActionDetails">Details</button>
      <button id="planItemDeleteButton${i}" class="planActionDelete">Delete</button>
      </div>
        `;

      const planListCardsContent = document.querySelector(
        ".planListCardsContent"
      );
      planListCardsContent.appendChild(planListCard);
    }

    for (let i = 0; i < plansSaved.length; i++) {
      const planName = plansSaved[i].planNameInput;
      if (daysLeft(plansSaved[i].leavingDateInput) <= 7) {
        document.querySelector(".plan-remaining-days-count").style.cssText = `
      background-color:red;
      padding:5px;
      `;
      }

      const imgElements = document.querySelectorAll(".planImage img");
      try {
        const imageUrl = await getPhoto(planName);
        imgElements[i].src = imageUrl;
      } catch (error) {
        console.error("Error fetching the photo:", error);
        imgElements[i].alt = "Image not available";
        imgElements[i].src = imageNotFound;
      }

      const button = document.getElementById(`planItemDetailButton${i}`);
      button.addEventListener("click", function (e) {
        e.preventDefault();
        handleDetailsButtonClick(i);
      });
      document
        .getElementById(`planItemDeleteButton${i}`)
        .addEventListener("click", (e) => {
          e.preventDefault();
          deletePlan(i);
        });
    }
  }
}

function getPlansFromLocalStorage() {
  try {
    const storedPlans = localStorage.getItem("plansSaved");
    if (storedPlans === null) {
      localStorage.setItem("plansSaved", JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(storedPlans);
    }
  } catch (e) {
    console.error("Failed to parse plans from local storage:", e);
    return [];
  }
}

function handleDetailsButtonClick(index) {
  showPlanDetails(index);
}

function deletePlan(index) {
  const plansSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("plansSaved")
  );
  plansSavedFromLocalStorage.splice(index, 1);
  localStorage.setItem(
    "plansSaved",
    JSON.stringify(plansSavedFromLocalStorage)
  );
  window.location.reload();
}

function deleteAllDestinationsfnc(index) {
  const plansSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("plansSaved")
  );
  plansSavedFromLocalStorage[index].destinations?.splice(
    0,
    plansSavedFromLocalStorage[index].destinations.length
  );

  localStorage.setItem(
    "plansSaved",
    JSON.stringify(plansSavedFromLocalStorage)
  );

  document.querySelector(".destinationListCardsContent").innerHTML = "";
  window.location.reload(true);
  // const issue = false;
  // updateDestinationList(index, issue);
}

async function addNewDestination() {
  const destinationName = document.getElementById("destination-Name");
  const leavingDateDestInput = document.getElementById(
    "leaving-date-destInput"
  );
  const returningDateDestInput = document.getElementById(
    "returning-date-destInput"
  );

  let destinationItems = {
    destinationCity: destinationName.value,
    leavingDateDestInput: leavingDateDestInput.value,
    returningDateDestInput: returningDateDestInput.value,
  };
  try {
    let weatherForcast = await getWeatherData(
      destinationItems.destinationCity,
      destinationItems.leavingDateDestInput,
      destinationItems.returningDateDestInput
    );
    if (weatherForcast == null) {
      return null;
    }
    destinationItems.maxTemp = weatherForcast.maxTemp;
    destinationItems.minTemp = weatherForcast.minTemp;
    return destinationItems;
  } catch (error) {
    console.error("Error adding new destination:", error);
    return null;
  }
}

function showPlanDetails(index) {
  let plansSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("plansSaved")
  );

  const planDetailsFromTo = document.querySelector(".plan-details-FromTo");
  planDetailsFromTo.innerHTML = `<p>From ${plansSavedFromLocalStorage[index].leavingDateInput}&nbsp; To &nbsp; ${plansSavedFromLocalStorage[index].returningDateInput}</p>`;

  if (plansSavedFromLocalStorage[index].destinations.length == 0) {
    document.querySelector(".blank-destination-list").style.display = "block";
    document.querySelector(".destinationListCardsContent").style.display =
      "none";
  } else {
    document.querySelector(".blank-destination-list").style.display = "none";
    document.querySelector(".destinationListCardsContent").style.display =
      "flex";
  }
  document.querySelector(".destinationListCardsContent").innerHTML = "";
  const planTitle = document.querySelector(".plan-details h4");
  planTitle.textContent = plansSavedFromLocalStorage[index].planNameInput;
  planDetailsSection.style.display = "flex";
  planListSection.style.display = "none";
  addNewDestintationSection.style.display = "none";

  const addDestSubmitButton = document.getElementById("addDestSubmitButton");
  const CanceladdDestButton = document.getElementById("CanceladdDestButton");
  CanceladdDestButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".destinationListCardsContent").innerHTML = "";
    showPlanDetails(index);
  });

  addDestSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    let isValid = validateDestForm(index);
    console.log(isValid + "isValiiiiiiiiid");
    if (!isValid == true) {
      addNewDestintationSection.style.display = "flex";
      planDetailsSection.style.display = "none";
    } else {
      let destination = await addNewDestination(index);
      if (destination != null) {
        addNewDestintationSection.style.display = "none";
        planDetailsSection.style.display = "flex";
        e.preventDefault();
        document.querySelector(".destinationListCardsContent").innerHTML = "";
        console.log(destination + "destttttttttttttttt");
        plansSavedFromLocalStorage[index].destinations.push(destination);
        localStorage.setItem(
          "plansSaved",
          JSON.stringify(plansSavedFromLocalStorage)
        );
        document.querySelector(".destinationListCardsContent").innerHTML = "";
        const issue = true;
        updateDestinationList(index, issue);
      } else {
        const issue = false;
        updateDestinationList(index, issue);
      }
    }
  });
  
  const cancelPlanButton = document.getElementById("cancelPlan");
  cancelPlanButton.addEventListener("click", (e) => {
    e.preventDefault();
    deletePlan(index);
  });

  const deleteAllDestinationsButton = document.getElementById(
    "deleteAllDestinationsButton"
  );
  deleteAllDestinationsButton?.addEventListener("click", (e) => {
    e.preventDefault();
    deleteAllDestinationsfnc(index);
  });

  addNewDestintationSection.style.display = "none";
  planDetailsSection.style.display = "flex";
  const destinationsList = document.querySelector(
    ".destinationListCardsContent"
  );
  destinationsList.innerHTML = "";
  const issue = true;
  updateDestinationList(index, issue);

  let savePlan = document.getElementById("savePlan");
  savePlan.addEventListener("click", (e) => {
    e.preventDefault();
    document.location.reload();
  });

  const addNewDestinationNavButton = document.getElementById(
    "addNewDestinationNavButton"
  );
  addNewDestinationNavButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleAddNewDestination(index);
  });
}

async function updateDestinationList(indexPlan, issue) {
  document.querySelector(
    ".errorHandlingAddNewDestination .error-content"
  ).innerHTML = "";

  if (issue == true) {
    let plansSavedFromLocalStorage = JSON.parse(
      localStorage.getItem("plansSaved")
    );

    if (plansSavedFromLocalStorage[indexPlan].destinations.length == 0) {

      document.querySelector(".blank-destination-list").style.display = "block";
      document.querySelector(".destinationListCardsContent").style.display =
        "none";
      
    } else {

      document.querySelector(".blank-destination-list").style.display = "none";
      document.querySelector(".destinationListCardsContent").style.display =
        "flex";

      document.querySelector(".destinationListCardsContent").innerHTML = "";

      const currentPlan = plansSavedFromLocalStorage[indexPlan];
      const destinationsForCurrentPlan = currentPlan.destinations;
      const destinationListCardsContent = document.querySelector(
        ".destinationListCardsContent"
      );
      for (let i = 0; i < destinationsForCurrentPlan.length; i++) {
        const destinatiolListCard = document.createElement("div");
        destinatiolListCard.classList.add("destinatiolListCard");
        destinatiolListCard.innerHTML = `
      <h4 class="cardTitle">${
        destinationsForCurrentPlan[i].destinationCity
      }</h4>
      <div class="LocationImage">
      <img src="" class="cityImage" alt=""/>
      </div>
      <div class="cardDetails">
       <div class="destinationTimeDetails">
        <div class="destinationLeaving">
          <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" id="date-up" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier">
            
            <path id="secondary" d="M3,9H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V9A0,0,0,0,1,3,9Z" style="fill: #2cba56; stroke-width: 2;"/>
            
            <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21ZM16,3V6M8,3V6m4,7v4" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
            
            <polyline id="primary-2" data-name="primary" points="10 15 12 13 14 15" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
            
            </g>
            
            </svg>
          <p class="destination-leaving-date">${
            destinationsForCurrentPlan[i].leavingDateDestInput
          }</p>
        </div>
        <div class="destinationReturning">
          <svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" id="date-down" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier">
            
            <path id="secondary" d="M3,9H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V9A0,0,0,0,1,3,9Z" style="fill: #d73737; stroke-width: 2;"/>
            
            <path id="primary" d="M20,21H4a1,1,0,0,1-1-1V9H21V20A1,1,0,0,1,20,21ZM21,5a1,1,0,0,0-1-1H4A1,1,0,0,0,3,5V9H21ZM16,3V6M8,3V6m4,11V13" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
            
            <polyline id="primary-2" data-name="primary" points="10 15 12 17 14 15" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
            
            </g>
            
            </svg>
            <p class="destination-returning-date">${
              destinationsForCurrentPlan[i].returningDateDestInput
            }</p>
        </div>
        <div class="destinationRemainingDays">
          <svg fill="#eda507" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#eda507">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M422.957,478.609h-16.696v-89.044c0-58.16-33.276-108.601-81.734-133.565c48.954-25.22,81.734-75.864,81.734-133.565 V33.391h16.696c9.217,0,16.696-7.473,16.696-16.696C439.652,7.473,432.174,0,422.957,0C355.995,0,156.678,0,89.044,0 c-9.217,0-16.696,7.473-16.696,16.696c0,9.223,7.479,16.696,16.696,16.696h16.696v89.044c0,57.692,32.771,108.341,81.734,133.565 c-48.459,24.964-81.734,75.405-81.734,133.565v89.044H89.044c-9.217,0-16.696,7.473-16.696,16.696 c0,9.223,7.479,16.696,16.696,16.696c111.521,0,222.498,0,333.913,0c9.217,0,16.696-7.473,16.696-16.696 C439.652,486.082,432.174,478.609,422.957,478.609z M139.641,132.511c-0.817-9.509-0.511-5.456-0.511-99.12H372.87 c0,93.664,0.306,89.611-0.511,99.12H139.641z M372.87,459.661c-92.104-76.755-88.747-75.372-100.174-79.41v-18.512 c0-9.223-7.479-16.696-16.696-16.696s-16.696,7.473-16.696,16.696v18.511c-11.307,3.996-7.768,2.403-100.174,79.41v-70.095 c0-58.759,43.63-107.391,100.174-115.536v20.927c0,9.223,7.479,16.696,16.696,16.696s16.696-7.473,16.696-16.696v-20.927 c56.544,8.145,100.174,56.777,100.174,115.536V459.661z"/> </g> </g> </g>
            
            </svg>
            <p class="destination-returning-date">${timeRemainPlan(
              indexPlan,
              i
            )} days</p>
        </div>
     </div>
     <div class="WeatherDetails">
      <div class="minTemp">
        <svg fill="#40a3c4" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">

          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          
          <g id="SVGRepo_iconCarrier"> <g> <g> <path d="m207.8,265.8v-183.8c0-39.1-31.5-71-70.2-71-38.6,0-70.1,31.8-70.1,71v183.9c-35.1,23.6-56.5,63.5-56.5,106.7 0,70.8 56.8,128.4 126.7,128.4 69.8,0 126.7-57.6 126.7-128.4-0.1-43.2-21.4-83.1-56.6-106.8zm-70.1,194.4c-47.3,0-85.8-39.3-85.8-87.5 0-32.5 17.5-62.1 45.8-77.4 6.6-3.6 10.7-10.5 10.7-18v-195.3c0-16.6 13.2-30.1 29.3-30.1 16.2,0 29.3,13.5 29.3,30.1v195.3c0,7.5 4.1,14.4 10.7,18 28.2,15.2 45.8,44.9 45.8,77.4 0,48.2-38.5,87.5-85.8,87.5z"/> <path d="m493.1,340.5c-8.9-6.9-21.7-5.3-28.6,3.6l-49.3,63.5v-362.9c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v362.9l-49.3-63.5c-6.9-8.9-19.7-10.5-28.6-3.6-8.9,6.9-10.5,19.7-3.6,28.7l85.8,110.6c3.9,5 9.8,7.9 16.1,7.9s12.3-2.9 16.1-7.9l85.8-110.6c6.9-8.9 5.3-21.8-3.6-28.7z"/> </g> </g> </g>
          
          </svg>
          <p class="min-temp">${destinationsForCurrentPlan[i].minTemp}°C</p>
      </div>
      <div class="maxTemp">
        <svg width="25px" height="25px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">

          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          
          <g id="SVGRepo_iconCarrier"> <path d="M18 3V21M18 3L15 6M18 3L21 6M7 15.9998C6.44772 15.9998 6 16.4475 6 16.9998C6 17.5521 6.44772 17.9998 7 17.9998C7.55228 17.9998 8 17.5521 8 16.9998C8 16.4475 7.55228 15.9998 7 15.9998ZM7 15.9998V11.9998M7 16.9998L7.00707 17.0069M11 16.9998C11 19.209 9.20914 20.9998 7 20.9998C4.79086 20.9998 3 19.209 3 16.9998C3 15.9854 3.37764 15.0591 4 14.354L4 6C4 4.34315 5.34315 3 7 3C8.65685 3 10 4.34315 10 6V14.354C10.6224 15.0591 11 15.9854 11 16.9998Z" stroke="#f23636" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
          
          </svg>
          <p class="max-temp">${destinationsForCurrentPlan[i].maxTemp}°C</p>
      </div>

     </div>
      </div>
      <button class="deleteDestinationInList">Delete</button>
      `;
        destinationListCardsContent.appendChild(destinatiolListCard);
      }

      let deleteDestinationInList = document.querySelectorAll(
        ".deleteDestinationInList"
      );

      // let timeToStartDestElement = document.querySelectorAll(
      //   ".time-to-start-dest"
      // );
      for (let i = 0; i < destinationsForCurrentPlan.length; i++) {
        const cityName = destinationsForCurrentPlan[i].destinationCity;
        const imgElements = document.querySelectorAll(".cityImage");
        // if (daysLeft(destinationsForCurrentPlan[i].leavingDateDestInput) <= 7) {
        //   timeToStartDestElement[i].style.color = "rgb(250, 5, 5)";
        // }
        try {
          const imageUrl = await getPhoto(cityName);
          imgElements[i].src = imageUrl;
        } catch (error) {
          console.error("Error fetching the photo:", error);
          imgElements[i].alt = "Image not available";
          imgElements[i].src = imageNotFound;
        }
        deleteDestinationInList[i].addEventListener("click", (e) => {
          e.preventDefault();
          deleteDestination(i, indexPlan);
        });
      }
    }
  } 
  else {
    document.querySelector(
      ".errorHandlingAddNewDestination .error-content"
    ).innerHTML =
      "<p>Oops...Error adding destination!</p><p>Please try again!</p>";
    document
      .querySelector(".errorHandlingAddNewDestination .error-content")
      .classList.add("background-red");
  }
}

function deleteDestination(iDest, iPlan) {
  const plansSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("plansSaved")
  );
  plansSavedFromLocalStorage[iPlan].destinations.splice(iDest, 1);
  localStorage.setItem(
    "plansSaved",
    JSON.stringify(plansSavedFromLocalStorage)
  );
  document.querySelector(".destinationListCardsContent").innerHTML = "";
  window.location.reload(true);
  // const issue = true;
  // updateDestinationList(iPlan, issue);
}

function handleAddNewDestination() {
  addNewDestintationSection.style.display = "flex";
  planDetailsSection.style.display = "none";
  const destinationName = document.getElementById("destination-Name");
  const defaultDestImage = document.querySelector(
    ".add-destination-image-container img"
  );
  defaultDestImage.src = destinationDefaultImage;

  destinationName.addEventListener("blur", function () {
    const city = destinationName.value.trim();
    if (city) {
      setDestImageSection(city);
    }
  });
  destinationName.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      const city = destinationName.value.trim();
      if (city) {
        setDestImageSection(city);
      }
    }
  });
}

function timeRemainPlan(indexPlan, index) {
  let plansSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("plansSaved")
  );
  const currentPlan = plansSavedFromLocalStorage[indexPlan];
  const destinationsForCurrentPlan = currentPlan.destinations;
  return daysLeft(destinationsForCurrentPlan[index].leavingDateDestInput);
}

async function setDestImageSection(cityName) {
  const defaultDestImage = document.querySelector(
    ".add-destination-image-container img"
  );
  defaultDestImage.src = destinationDefaultImage;

  try {
    const imageUrl = await getPhoto(cityName);
    defaultDestImage.src = imageUrl;
  } catch (error) {
    console.error("Error fetching the photo:", error);
    defaultDestImage.alt = "Image not available";
    defaultDestImage.src = imageNotFound;
  }
}
