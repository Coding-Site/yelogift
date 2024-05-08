import { createSlice } from "@reduxjs/toolkit";


type Theme = {
  isDark: boolean
};

const cartInitialState: Theme = {
  isDark: true
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: cartInitialState,
  reducers: {
    setTheme(state: Theme ) {
      state.isDark = !state.isDark;

      localStorage.setItem('theme', JSON.stringify(state.isDark ? 'light' : 'dark'))
      const root = window.document.documentElement;
      root.classList.toggle('dark')

      return state;
    }
  },
  selectors: {
    isDark: (state) => state.isDark
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
