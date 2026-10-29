function Student(props) {
  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {props.name}</p>
      <p>Branch: {props.branch}</p>
      <p>Semester: {props.semester}</p>
      <hr />
    </div>
  );
}

export default Student;