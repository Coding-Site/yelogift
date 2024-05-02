// import { useEffect, useState } from 'react';

// export default function useDarkSide() {
// const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme') as string));
// const colorTheme = theme === 'dark' ? 'light' : 'dark';
// const isDark = theme === 'dark' ? false : true;

// // useEffect(() => {
// // const root = window.document.documentElement;
// // root.classList.remove(colorTheme);
// // root.classList.add(theme);

// // // save theme to local storage
// // localStorage.setItem('theme', theme);
// // }, [theme, colorTheme]);

// return {colorTheme, isDark, theme, setTheme};
// }