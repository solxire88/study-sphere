import WideCourseCards from "./WideCourseCards";

export const courses = [
  {
    id: 1,
    title: "Machine Learning And Deep Learning",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Introduction to Machine Learning", date: "12-10-2025" },
      { title: "Chapter 2 - Neural Networks", date: "23-10-2025" },
      { title: "Chapter 3 - Deep Learning Frameworks", date: "23-11-2025" },
    ],
    totalStudents: 18,
  },
  {
    id: 2,
    title: "Electronics",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Basic Circuits", date: "12-10-2025" },
      { title: "Chapter 2 - Transistors and Diodes", date: "23-10-2025" },
      { title: "Chapter 3 - Digital Electronics", date: "23-11-2025" },
    ],
    totalStudents: 15,
  },
  {
    id: 3,
    title: "Data Science",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Data Wrangling", date: "12-10-2025" },
      { title: "Chapter 2 - Data Visualization", date: "23-10-2025" },
      { title: "Chapter 3 - Statistical Analysis", date: "23-11-2025" },
    ],
    totalStudents: 20,
  },
  {
    id: 4,
    title: "Advanced Mathematics",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Linear Algebra", date: "12-10-2025" },
      { title: "Chapter 2 - Calculus", date: "23-10-2025" },
      { title: "Chapter 3 - Probability", date: "23-11-2025" },
    ],
    totalStudents: 12,
  },
  {
    id: 5,
    title: "Python Scripting",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Python Basics", date: "12-10-2025" },
      { title: "Chapter 2 - Advanced Python", date: "23-10-2025" },
      { title: "Chapter 3 - Python for Automation", date: "23-11-2025" },
    ],
    totalStudents: 19,
  },
  {
    id: 6,
    title: "Excel And Office Tools",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
    status: "Enter class",
    chapters: [
      { title: "Chapter 1 - Excel Basics", date: "12-10-2025" },
      { title: "Chapter 2 - Advanced Excel Functions", date: "23-10-2025" },
      { title: "Chapter 3 - Data Analysis in Excel", date: "23-11-2025" },
    ],
    totalStudents: 10,
  },
];

export default function CourseList() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="w-full">
            <WideCourseCards course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}