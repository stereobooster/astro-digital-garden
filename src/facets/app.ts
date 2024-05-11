import "instantsearch.css/themes/reset.css"
import "./theme.css";
import "./app.css";
import "./app.mobile.css";
import "./widgets/PriceSlider.css";

import search from "./search";
import { attachEventListeners } from "./ui";

search.start();
attachEventListeners();
