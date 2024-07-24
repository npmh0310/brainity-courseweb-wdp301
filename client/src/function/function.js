import { parseISO, format } from "date-fns";


export function formatDate2(dateString) {
  return new Date(dateString).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const formatDate = (dateString) => {
  // Parse the ISO date string to a JavaScript Date object
  const date = parseISO(dateString);

  // Format the date to "MMMM yyyy"
  const formattedDate = format(date, 'MMMM yyyy');

  return `Last updated ${formattedDate}`;
};

export const searchCourseContent = (course, query) => {
  console.log(course, query)
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
      if (section.lessons) {
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
      currency: 'VND',
      minimumFractionDigits: 0 // Ensure no decimal points are shown
  });
  const p = formatter.format(amount)

  // Format the amount
  return `${p}`
}

export function calculateOverallCompletionPercent(sections) {
  let totalLessons = 0;
  let completedLessons = 0;

  sections.forEach(section => {
      totalLessons += section.lessons.length;
      completedLessons += section.lessons.filter(lesson => lesson.isCompleted).length;
  });

  const completionPercent = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
  return {
      totallesson: totalLessons,
      completedLessons: completedLessons,
      overal:completionPercent.toFixed(2)
  } // Định dạng thành hai chữ số thập phân
}


export function generateSlug(title) {
  const slug = title
    .toLowerCase() // Convert the title to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-") // Replace multiple consecutive dashes with a single dash
    .replace(/^\-+/, "") // Remove dashes from the beginning
    .replace(/\-+$/, ""); // Remove dashes from the end
  return slug;
}