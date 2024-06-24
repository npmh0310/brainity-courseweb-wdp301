import { createSlice } from "@reduxjs/toolkit";

const learningSlice = createSlice({
    name: "Learning",
    initialState: {
        lessonProgress: [],
        error: null
    },
    reducers: {
        insertLessonProgress: (state, action) => {
            state.lessonProgress = action.payload
        },
        updateLessonProgress: (state, action) => {
            const { lessonId, isCompleted } = action.payload;
            state.lessonProgress = state.lessonProgress.map(section => ({
                ...section,
                lessons: section.lessons.map(lesson =>
                    lesson._id === lessonId ? { ...lesson, isCompleted } : lesson
                )
            }));
        }
    }
});

export const { insertLessonProgress, updateLessonProgress } = learningSlice.actions;
export const getLessonProgress = (state) => state.learningSlice.lessonProgress
export default learningSlice.reducer;
