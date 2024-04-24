import  {   useState } from "react";

export default function Switcher() {
  const [colorTheme, setColortheme] = useState("dark");
  const [dark] = useState(colorTheme === "dark" ? false : true);


  const toggleDarkMode = () => {
    localStorage.setItem('theme', JSON.stringify(colorTheme))
    console.log(localStorage.getItem('theme'));
    setColortheme(old => old === "dark" ? "light": "dark");
    const root = window.document.documentElement;
     root.classList.toggle('dark')
  
  }   


  
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
