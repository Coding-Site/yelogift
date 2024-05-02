import  {   useState } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../store/ThemeSlice/ThemeSlice";

export default function Switcher() {
  const [colorTheme] = useState("dark");
  const [dark] = useState(colorTheme === "dark" ? false : true);
  const dispatch = useDispatch();  


  
  return (
    <>
      <img
        src="/assets/navbar/light_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
      <input
        type="checkbox"
        defaultChecked={dark}
        onChange={() => dispatch(setTheme())}
        className="toggle toggle-primar checked:!bg-main  border-none"
      />
      <img
        src="/assets/navbar/dark_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
    </>
  );
}
