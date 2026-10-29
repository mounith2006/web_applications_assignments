from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Connect to database and create table
def init_db():
    conn = sqlite3.connect("students.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Display all students and add new students
@app.route("/", methods=["GET", "POST"])
def index():
    conn = sqlite3.connect("students.db")
    conn.row_factory = sqlite3.Row

    if request.method == "POST":
        name = request.form["name"].strip()
        department = request.form["department"].strip()
        age = request.form["age"]

        if not name or not department or not age:
            conn.close()
            return "All fields are required!", 400

        try:
            age = int(age)
            if age <= 0:
                conn.close()
                return "Age must be positive!", 400
        except ValueError:
            conn.close()
            return "Age must be a number!", 400

        conn.execute(
            "INSERT INTO students (name, department, age) VALUES (?, ?, ?)",
            (name, department, age)
        )
        conn.commit()
        conn.close()
        return redirect("/")

    students = conn.execute("SELECT * FROM students").fetchall()
    conn.close()

    return render_template("index.html", students=students)

# Update student details
@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit(id):
    conn = sqlite3.connect("students.db")
    conn.row_factory = sqlite3.Row

    if request.method == "POST":
        name = request.form["name"].strip()
        department = request.form["department"].strip()
        age = request.form["age"]

        if not name or not department or not age:
            conn.close()
            return "All fields are required!", 400

        try:
            age = int(age)
            if age <= 0:
                conn.close()
                return "Age must be positive!", 400
        except ValueError:
            conn.close()
            return "Age must be a number!", 400

        conn.execute(
            "UPDATE students SET name=?, department=?, age=? WHERE id=?",
            (name, department, age, id)
        )
        conn.commit()
        conn.close()
        return redirect("/")

    student = conn.execute(
        "SELECT * FROM students WHERE id=?", (id,)
    ).fetchone()
    conn.close()

    if student is None:
        return "Student not found!", 404

    return render_template("edit.html", student=student)

# Delete student
@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    conn = sqlite3.connect("students.db")
    conn.execute("DELETE FROM students WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return redirect("/")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
