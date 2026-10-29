from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Create database and table
def init_db():
    conn = sqlite3.connect("employees.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            salary REAL NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Add and display employees
@app.route("/", methods=["GET", "POST"])
def index():
    conn = sqlite3.connect("employees.db")
    conn.row_factory = sqlite3.Row

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()
        salary = request.form.get("salary", "").strip()

        if not name or not department or not salary:
            conn.close()
            return "All fields are required!", 400

        try:
            salary = float(salary)
            if salary < 0:
                conn.close()
                return "Salary cannot be negative!", 400
        except ValueError:
            conn.close()
            return "Enter a valid salary!", 400

        conn.execute(
            "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)",
            (name, department, salary)
        )
        conn.commit()
        conn.close()

        return redirect("/")

    employees = conn.execute("SELECT * FROM employees").fetchall()
    conn.close()

    return render_template("index.html", employees=employees)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
