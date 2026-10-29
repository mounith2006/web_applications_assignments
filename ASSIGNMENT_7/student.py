from flask import Flask, request, render_template_string

app = Flask(__name__)

html = """
<h2>Student Management System</h2>

<form method="POST">
    Student Name: <input type="text" name="name"><br><br>
    Department: <input type="text" name="department"><br><br>
    <input type="submit" value="Submit">
</form>

<p style="color:red;">{{ error }}</p>

{% if name and department %}
    <h3>Student Details</h3>
    <p>Name: {{ name }}</p>
    <p>Department: {{ department }}</p>
{% endif %}
"""

@app.route("/", methods=["GET", "POST"])
def student():
    name = ""
    department = ""
    error = ""

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()

        if not name or not department:
            error = "All fields are required!"
            name = ""
            department = ""
        elif not name.replace(" ", "").isalpha():
            error = "Name must contain only letters!"
            name = ""
            department = ""
        else:
            error = ""

    return render_template_string(
        html, name=name, department=department, error=error
    )

if __name__ == "__main__":
    app.run(debug=True)
