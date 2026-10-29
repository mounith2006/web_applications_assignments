
import { useState } from "react";

function Employee(props) {
  return (
    <div>
      <h3>{props.employee.name}</h3>
      <p>ID: {props.employee.id}</p>
      <p>Department: {props.employee.department}</p>
      <p>Salary: ₹{props.employee.salary}</p>

      <button onClick={props.onEdit}>Edit</button>
      <hr />
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul", department: "IT", salary: 30000 },
    { id: 2, name: "Priya", department: "HR", salary: 35000 }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  function saveEmployee() {
    if (!name.trim() || !department.trim() || salary === "" ||
        !Number.isFinite(Number(salary)) || Number(salary) < 0) {
      alert("Please enter valid employee details.");
      return;
    }

    if (editId !== null) {
      setEmployees(employees.map(emp =>
        emp.id === editId
          ? { ...emp, name, department, salary: Number(salary) }
          : emp
      ));
      setEditId(null);
    } else {
      setEmployees([
        ...employees,
        {
          id: employees.length
            ? Math.max(...employees.map(emp => emp.id)) + 1
            : 1,
          name,
          department,
          salary: Number(salary)
        }
      ]);
    }

    setName("");
    setDepartment("");
    setSalary("");
  }

  function editEmployee(employee) {
    setEditId(employee.id);
    setName(employee.name);
    setDepartment(employee.department);
    setSalary(String(employee.salary));
  }

  return (
    <div>
      <h1>Employee Management</h1>

      <h2>{editId !== null ? "Update Employee" : "Add Employee"}</h2>

      <input
        placeholder="Employee Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Department"
        value={department}
        onChange={e => setDepartment(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={e => setSalary(e.target.value)}
      />
      <br /><br />

      <button onClick={saveEmployee}>
        {editId !== null ? "Update Employee" : "Add Employee"}
      </button>

      {editId !== null && (
        <button onClick={() => {
          setEditId(null);
          setName("");
          setDepartment("");
          setSalary("");
        }}>
          Cancel
        </button>
      )}

      <h2>Employee List</h2>

      {employees.map(employee => (
        <Employee
          key={employee.id}
          employee={employee}
          onEdit={() => editEmployee(employee)}
        />
      ))}
    </div>
  );
}

export default App;
