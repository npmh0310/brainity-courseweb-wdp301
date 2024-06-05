import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: []
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    }
  }
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
