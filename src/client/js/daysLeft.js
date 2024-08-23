function daysLeft(targetDateStr) {
  try{
  // Split the input string and parse the year, month, and day
  const [year, month, day] = targetDateStr.split("-").map(Number);

  // Create a Date object for the target date
  const targetDate = new Date(year, month - 1, day); // Months are zero-indexed

  // Get today's date and reset time to midnight
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Calculate the difference in time (in milliseconds)
  const differenceInTime = targetDate.getTime() - todayDate.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}
catch (error) {
  console.error("Error in daysLeft function:", error.message);
  throw new Error(error.message)
}
}

export { daysLeft };
