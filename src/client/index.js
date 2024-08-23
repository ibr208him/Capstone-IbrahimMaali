// js files
import { daysLeft } from "./js/daysLeft.js";
import * as app from "./js/app.js";
import { getPhoto } from "./js/getPhoto.js";
import { getWeatherData } from "./js/getWeatherData.js";
import backgroundImage  from './assets/images/background_Image.jpg';
import createPlanImage  from './assets/images/create_plan_image.jpg';
import {validatePlanForm} from './js/validatePlanForm.js';
import {validateDestForm} from './js/validateDestForm.js';
import tabLogo from './assets/images/tabLogo.JPG';
// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/createPlan.scss";
import "./styles/navbar.scss";
import "./styles/planList.scss";
import "./styles/planDetails.scss";
import "./styles/media1.scss";
import "./styles/media2.scss";
import "./styles/destinationListCards.scss";
import "./styles/planListCards.scss";

export {
  daysLeft,
  app,
  getPhoto,
  getWeatherData,
  backgroundImage,
  createPlanImage,
  validatePlanForm,
  validateDestForm,
  tabLogo
};
