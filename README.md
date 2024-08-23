# FEND Capstone - Travel App

## Overview

The FEND Capstone is a web-based application that helps users plan their trips by creating, managing, and viewing travel plans. Users can add multiple destinations to a travel plan, set departure and return dates, and even get weather forecasts for their destinations. The application stores all plans and destinations locally in the browser's storage, ensuring that users' data persists even after they close the browser.

## Features

- **Create New Travel Plans:** Users can create new travel plans by providing a name, departure date, and return date.
- **Manage Existing Plans:** Users can view a list of all their travel plans, see details of each plan, and delete individual plans or all plans at once.
- **Add Destinations:** Users can add destinations to their travel plans, including details such as city name, departure date, and return date.
- **Weather Forecast:** When a destination is added, the application fetches the weather forecast for that destination during the specified dates and displays it to the user.
- **Local Storage:** All plans and destinations are stored in the browser's local storage, so they remain available even after the page is refreshed or the browser is closed.

## Technologies Used

- **HTML**: Used for structuring the content of the web pages.
- **CSS (Commented Out)**: Although present as a reference, the CSS file for styling is not linked in the provided code (`navbar.css` is commented out).
- **JavaScript**:
  - Manipulates the DOM to handle form submissions, plan creation, and the display of plans and destinations.
  - Stores and retrieves plans from `localStorage`.
  - Handles asynchronous operations, such as fetching weather data for destinations (the `getWeatherData` function is referenced but not provided).
- **LocalStorage**: Used to persist plans and their associated data between sessions.
- **Service Workers (Commented Out)**: The commented-out service worker code suggests plans for making the web application available offline in the future.

## Node.js Version

- **Node.js Version:** `v20.10.0`
