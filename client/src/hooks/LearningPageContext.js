import React, { createContext, useContext, useState } from 'react';

const LessonProgressContext = createContext();

export const LessonProgressProvider = ({ children }) => {
    const [lessonsProgress, setLessonsProgress] = useState([]);

    // 
    const updateLessonProgress = (lessonId, isCompleted) => {
        setLessonsProgress(prevState =>
            prevState.map(section => ({
                ...section,
                lessons: section.lessons.map(lesson =>
                    lesson._id === lessonId ? { ...lesson, isCompleted } : lesson
                )
            }))
        );
    };

    const setInitialLessonsProgress = (initialProgress) => {
        setLessonsProgress(initialProgress);
    };

    return (
        <LessonProgressContext.Provider value={{ lessonsProgress, updateLessonProgress, setInitialLessonsProgress }}>
            {children}
        </LessonProgressContext.Provider>
    );
};

export const useLessonProgress = () => useContext(LessonProgressContext);
