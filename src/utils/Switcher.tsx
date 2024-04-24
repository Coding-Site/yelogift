import React, {  useState } from "react";
import useDarkSide from "../hooks/useDarkSide";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? false : true
  );

  const toggleDarkMode = (
    checked: boolean
  ) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
    
      <img
        src="/navbar/light_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
      <input
        type="checkbox"
        defaultChecked={darkSide}
        onChange={toggleDarkMode}
        className="toggle toggle-primar checked:!bg-main  border-none"
      />
      <img
        src="/navbar/dark_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
    </>
  );
}
