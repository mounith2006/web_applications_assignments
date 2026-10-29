
import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [selectedCourses, setSelectedCourses] = useState([]);

  function registerCourse(course) {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  }

  function removeCourse(course) {
    setSelectedCourses(
      selectedCourses.filter((c) => c !== course)
    );
  }

  return (
    <CourseContext.Provider
      value={{ selectedCourses, registerCourse, removeCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
