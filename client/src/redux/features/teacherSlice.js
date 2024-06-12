import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCourse, getCourseOfTeacher, deleteCourseById, updateCourseById } from '../../fetchData/TeacherCourse';

// export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
//   const response = await getCourseOfTeacher();
//   return response.data;
// });

// export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse) => {
//   const response = await CreateCourse(newCourse)
//   return response.data;
// });

// export const updateCourse = createAsyncThunk('courses/updateCourse', async (id, updatedCourse) => {
//   const response = await updateCourseById(id, updatedCourse)
//   return response.data;
// });

// export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
//   await deleteCourseById(courseId);
//   return courseId;
// });

const teacherSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Standard reducers can be added here
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(fetchCourses.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(fetchCourses.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.courses = action.payload;
    // })
    // .addCase(fetchCourses.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.error.message;
    // })
    // .addCase(addCourse.fulfilled, (state, action) => {
    //   state.courses.push(action.payload);
    // })
    // .addCase(updateCourse.fulfilled, (state, action) => {
    //   const index = state.courses.findIndex(course => course._id === action.payload._id);
    //   state.courses[index] = action.payload;
    // })
    // .addCase(deleteCourse.fulfilled, (state, action) => {
    //   state.courses = state.courses.filter(course => course._id !== action.payload);
    // });
  },
});

// export const { setCourses } = courseSlice.actions;
export default teacherSlice.reducer;
