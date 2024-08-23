function validatePlanForm() {
 try{
    document.getElementById("planNameError").textContent = "";
    document.getElementById("leavingDateError").textContent = "";
    document.getElementById("returningDateError").textContent = "";

    const planName = document.getElementById("plan-Name").value.trim();
    const leavingDate = document.getElementById("leaving-date-input").value;
    const returningDate = document.getElementById("returning-date-input").value;

    let isValid = true;

    // Validate Plan Name
    if (planName === "" || planName.length > 100) {
        document.getElementById("planNameError").textContent = "Plan Name is required and must be 100 characters or less.";
        isValid = false;
    }

    // Get today's date in yyyy-mm-dd format
    const today = new Date().toISOString().split("T")[0];

    // Validate Leaving Date
    if (leavingDate <= today) {
        document.getElementById("leavingDateError").textContent = "Leaving Date must be after today's date.";
        isValid = false;
    }

    // Validate Returning Date
    if (returningDate <= leavingDate) {
        document.getElementById("returningDateError").textContent = "Returning Date must be after the Leaving Date.";
        isValid = false;
    }
// Check for date overlap with existing plans
const plans = JSON.parse(localStorage.getItem('plansSaved'));
if (!plans) throw new Error("No plans found in local storage.");
for (const plan of plans) {
    if ((leavingDate >= plan.leavingDateInput && leavingDate <= plan.returningDateInput) || 
        (returningDate >= plan.leavingDateInput && returningDate <= plan.returningDateInput) ||
        (leavingDate <= plan.leavingDateInput && returningDate >= plan.returningDateInput)) {
        document.getElementById("leavingDateError").textContent = "The selected dates overlap with an existing plan.";
        document.getElementById("returningDateError").textContent = "The selected dates overlap with an existing plan.";
        isValid = false;
        break;
    }
}
    // Prevent form submission if there are validation errors
    return isValid;

  }
  catch (error) {
    console.error("Error in validatePlanForm function:", error.message);
    throw new Error(error.message)
  }
}
  export {validatePlanForm}