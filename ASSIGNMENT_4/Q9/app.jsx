import { createContext, useContext, useReducer } from "react";

const AttendanceContext = createContext();

const initialState = [
  { id: 1, name: "Mounith", present: false },
  { id: 2, name: "Rahul", present: false },
  { id: 3, name: "Priya", present: false },
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, present: true }
          : student
      );

    case "MARK_ABSENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, present: false }
          : student
      );

    default:
      return state;
  }
}

function AttendanceProvider({ children }) {
  const [students, dispatch] = useReducer(
    attendanceReducer,
    initialState
  );

  return (
    <AttendanceContext.Provider value={{ students, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
}

function Attendance() {
  const { students, dispatch } = useContext(AttendanceContext);

  return (
    <div>
      <h1>Student Attendance Management</h1>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>

          <p>
            Attendance:{" "}
            {student.present ? "Present" : "Absent"}
          </p>

          <button
            onClick={() =>
              dispatch({
                type: "MARK_PRESENT",
                id: student.id,
              })
            }
          >
            Mark Present
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "MARK_ABSENT",
                id: student.id,
              })
            }
          >
            Mark Absent
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <AttendanceProvider>
      <Attendance />
    </AttendanceProvider>
  );
}

export default App;