import WideCourseCards from "./WideCourseCards";

// Add a named export for the courses array with chapters
export const courses = [
  {
    id: 1, // Add unique ID
    title: "ML & Data Science",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Introduction to Machine Learning", date: "12-10-2025" },
      { title: "Chapter 2 - Data Wrangling and Visualization", date: "23-10-2025" },
      { title: "Chapter 3 - Advanced Data Science Techniques", date: "23-11-2025" },
    ],
    totalStudents: 18, // Added totalStudents (<= 20)
  },
  {
    id: 2, // Add unique ID
    title: "Engineering",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Introduction to Engineering", date: "12-10-2025" },
      { title: "Chapter 2 - Mechanical Systems", date: "23-10-2025" },
      { title: "Chapter 3 - Electrical Circuits", date: "23-11-2025" },
    ],
    totalStudents: 15, // Added totalStudents (<= 20)
  },
  {
    id: 3, // Add unique ID
    title: "Cybersecurity",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Introduction to Cybersecurity", date: "12-10-2025" },
      { title: "Chapter 2 - Network Security", date: "23-10-2025" },
      { title: "Chapter 3 - Ethical Hacking", date: "23-11-2025" },
    ],
    totalStudents: 20, // Added totalStudents (<= 20)
  },
  {
    id: 4, // Add unique ID
    title: "Maths",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Linear Algebra", date: "12-10-2025" },
      { title: "Chapter 2 - Calculus", date: "23-10-2025" },
      { title: "Chapter 3 - Probability and Statistics", date: "23-11-2025" },
    ],
    totalStudents: 12, // Added totalStudents (<= 20)
  },
  {
    id: 5, // Add unique ID
    title: "Low-Level Programming",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Introduction to C Programming", date: "12-10-2025" },
      { title: "Chapter 2 - Memory Management", date: "23-10-2025" },
      { title: "Chapter 3 - Assembly Language Basics", date: "23-11-2025" },
    ],
    totalStudents: 19, // Added totalStudents (<= 20)
  },
  {
    id: 6, // Add unique ID
    title: "Web Development",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - HTML and CSS Basics", date: "12-10-2025" },
      { title: "Chapter 2 - JavaScript Fundamentals", date: "23-10-2025" },
      { title: "Chapter 3 - Full-Stack Development", date: "23-11-2025" },
    ],
    totalStudents: 10, // Added totalStudents (<= 20)
  },
];

// Default export for the CourseList component
export default function CourseList() {
  return (
    <div className="course-list-container mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="w-full">
            {/* Pass the entire course object, including the ID */}
            <WideCourseCards course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}
