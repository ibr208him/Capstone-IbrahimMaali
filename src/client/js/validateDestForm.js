function validateDestForm(index) {
try{
    document.getElementById("destinationNameError").textContent = "";
    document.getElementById("leavingDateDestError").textContent = "";
    document.getElementById("returningDateDestError").textContent = "";

    const destinationName = document.getElementById("destination-Name").value.trim();
    const leavingDate = document.getElementById("leaving-date-destInput").value;
    const returningDate = document.getElementById("returning-date-destInput").value;

    let isValid = true;

    // Validate Plan Name
    if (destinationName === "" || destinationName.length > 100) {
        document.getElementById("destinationNameError").textContent = "City Name is required and must be 100 characters or less.";
        isValid = false;
    }


    // Validate Returning Date
    if (returningDate <= leavingDate) {
        document.getElementById("returningDateDestError").textContent = "Returning Date must be after the Leaving Date.";
        isValid = false;
    }

    // Validate that destination dates are within plan dates
    const plan = JSON.parse(localStorage.getItem('plansSaved')); 
    console.log('ppppp'+index+'nnnnnn'+plan[index])
    if (!plan || !plan[index]) throw new Error("Plan data is not available.");
    const planLeavingDate = plan[index].leavingDateInput;
    const planReturningDate = plan[index].returningDateInput;

    if (leavingDate < planLeavingDate || leavingDate > planReturningDate) {
        document.getElementById("leavingDateDestError").textContent = `Leaving Leaving Date must be within the Plan's Leaving date ${planLeavingDate} and Returning Date ${planReturningDate}.`;
        isValid = false;
    }

    if (returningDate < planLeavingDate || returningDate > planReturningDate) {
        document.getElementById("returningDateDestError").textContent = `Destination Returning Date must be within the Plan's Leaving date ${planLeavingDate} and Returning Date ${planReturningDate}.`;
        isValid = false;
    }

 // Validate that destination dates do not overlap with existing destinations
for (let i = 0; i < plan[index].destinations.length; i++) {
    const destination = plan[index].destinations[i];
    const existingLeavingDate = destination.leavingDateDestInput;
    const existingReturningDate = destination.returningDateDestInput;

    if (destination.destinationCity.toLowerCase() === destinationName.toLowerCase()) {
        document.getElementById("destinationNameError").textContent = "This city has already been added to the plan.";
        isValid = false;
        break;
    }

    if (
        (leavingDate >= existingLeavingDate && leavingDate <= existingReturningDate) ||
        (returningDate >= existingLeavingDate && returningDate <= existingReturningDate) ||
        (leavingDate <= existingLeavingDate && returningDate >= existingReturningDate)
    ) {
        document.getElementById("leavingDateDestError").textContent = "Destination dates overlap with an existing destination.";
        document.getElementById("returningDateDestError").textContent = "Destination dates overlap with an existing destination.";
        isValid = false;
        break;
    }
}
  return isValid;
}
catch (error) {

    console.error("Error in validateDestForm function:", error.message);
    throw new Error(error.message)
  }
}
  export {validateDestForm}