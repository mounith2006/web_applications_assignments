
import { CourseProvider, useCourses } from "./CourseContext";

const courses = [
  "Java Programming",
  "Web Development",
  "Data Structures",
  "Database Management",
  "Machine Learning"
];

function CourseList() {
  const { selectedCourses, registerCourse } = useCourses();

  return (
    <div>
      <h2>Available Courses</h2>

      {courses.map((course) => (
        <div key={course}>
          {course}{" "}
          <button
            onClick={() => registerCourse(course)}
            disabled={selectedCourses.includes(course)}
          >
            {selectedCourses.includes(course)
              ? "Registered"
              : "Register"}
          </button>
        </div>
      ))}
    </div>
  );
}

function RegisteredCourses() {
  const { selectedCourses, removeCourse } = useCourses();

  return (
    <div>
      <h2>My Registered Courses</h2>

      {selectedCourses.length === 0 ? (
        <p>No courses registered yet.</p>
      ) : (
        <ul>
          {selectedCourses.map((course) => (
            <li key={course}>
              {course}{" "}
              <button onClick={() => removeCourse(course)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AppContent() {
  return (
    <div>
      <h1>Course Registration System</h1>
      <CourseList />
      <hr />
      <RegisteredCourses />
    </div>
  );
}

function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}

export default App;
