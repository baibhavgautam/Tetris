import React from "react";
import { DARK_SQUARE } from "../model/src/utils/color_codes";

export default props => {
  return <div className={props.color === DARK_SQUARE ? "dark" : "light"} />;
};
