import  {  useEffect, useState } from "react";

export default function Switcher() {
  const [colorTheme, setColortheme] = useState("dark");
  const [dark,] = useState(colorTheme === "dark" ? false : true);
  const toggleDarkMode = () => {
    setColortheme(old => old === "dark" ? "light": "dark");

  } 
useEffect(() => {
  
  console.log(colorTheme)
  console.log(dark)
  const root = window.document.documentElement;
  root.classList.remove(colorTheme as string);
  root.classList.add(colorTheme);
  

  }, [colorTheme]);

  
  return (
    <>
    
      <img
        src="assets/navbar/light_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
      <input
        type="checkbox"
        defaultChecked={dark}
        onChange={toggleDarkMode}
        className="toggle toggle-primar checked:!bg-main  border-none"
      />
      <img
        src="assets/navbar/dark_mode.png"
        className="cursor-pointer"
        alt="Lightmode"
      />
    </>
  );
}
