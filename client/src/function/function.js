import { parseISO, format } from 'date-fns';

export const formatDate = (dateString) => {
  // Parse the ISO date string to a JavaScript Date object
  const date = parseISO(dateString);

  // Format the date to "MMMM yyyy"
  const formattedDate = format(date, 'MMMM yyyy');

  return `Last updated ${formattedDate}`;
};

export const searchCourseContent = (course, query) => {
    console.log(course , query)
    // Normalize the search query to lower case
    const normalizedQuery = query.toLowerCase();

    // Helper function to check if a string contains the query
    const containsQuery = (str) => str.toLowerCase().includes(normalizedQuery);

    // Result object to store search results
    const result = {
        sections: [],
        lessons: []
    };

    // Search through sections
    course.sections.forEach((section) => {
        if (containsQuery(section.sectionName)) {
            result.sections.push(section);
        }

        // Search through lessons within the section
        if(section.lessons) {
            section.lessons.forEach((lesson) => {
                if (containsQuery(lesson.lessonName) || (lesson.description && containsQuery(lesson.description))) {
                    result.lessons.push({ sectionName: section.sectionName, lesson });
                }
            });
        }
    });

    return result;
};
export function formatCurrencyVND(amount) {
    // Create a new instance of Intl.NumberFormat for Vietnamese locale
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0 // Ensure no decimal points are shown
    });
  
    // Format the amount
    return formatter.format(amount)
  }