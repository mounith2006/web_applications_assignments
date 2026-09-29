function Student(props) {
  return (
    <div>
      <h2>Student Information</h2>
      <p>Student Name: {props.name}</p>
      <p>Roll Number: {props.rollNo}</p>
      <p>Course: {props.course}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Student
        name="Mounith"
        rollNo="23CSE001"
        course="B.Tech CSE"
      />

      <Student
        name="Rahul"
        rollNo="23CSE002"
        course="B.Tech CSE"
      />
    </div>
  );
}

export default App;