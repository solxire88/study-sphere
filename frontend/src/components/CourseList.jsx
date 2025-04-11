import CourseCard from "./CourseCard";

const courses = [
  {
    title: "ML & Data Science",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
  },
  {
    title: "Engineering",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
  },
  {
    title: "UI/UX & Product Design",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
  },
  {
    title: "Maths",
    instructor: "Pr. Potato Head",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
  },
  {
    title: "Low-Level Programming",
    instructor: "Pr. Lion",
    schedule: "Mon, Tue - 15:00 ~ 17:00",
    duration: "8 Weeks",
  },
  {
    title: "Web Development",
    instructor: "Pr. Keskes",
    schedule: "Mon, Wed - 13:00 ~ 14:00",
    duration: "8 Weeks",
  },
];

export default function CourseList() {
  return (
    <div className="mx-auto max-w-7xl px-4 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {courses.map((course, index) => (
          <div key={index} className="w-full sm:w-auto">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}