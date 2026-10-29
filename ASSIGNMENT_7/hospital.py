from flask import Flask, request, render_template_string
from datetime import date

app = Flask(__name__)

html = """
<h2>Hospital Appointment System</h2>

<form method="POST">
    Patient Name: <input type="text" name="name" required><br><br>

    Doctor:
    <select name="doctor" required>
        <option value="">Select Doctor</option>
        <option value="Dr. Ravi">Dr. Ravi</option>
        <option value="Dr. Priya">Dr. Priya</option>
        <option value="Dr. Kumar">Dr. Kumar</option>
    </select><br><br>

    Appointment Date:
    <input type="date" name="appointment_date" required><br><br>

    Contact Number:
    <input type="text" name="contact" required><br><br>

    <input type="submit" value="Book Appointment">
</form>

<p style="color:red;">{{ error }}</p>

{% if patient %}
    <h3>Appointment Confirmation</h3>
    <p>Patient Name: {{ patient }}</p>
    <p>Doctor: {{ doctor }}</p>
    <p>Appointment Date: {{ appointment_date }}</p>
    <p>Contact Number: {{ contact }}</p>
    <h4>Your appointment has been booked successfully!</h4>
{% endif %}
"""

@app.route("/", methods=["GET", "POST"])
def appointment():
    error = ""
    patient = doctor = appointment_date = contact = ""

    if request.method == "POST":
        patient = request.form.get("name", "").strip()
        doctor = request.form.get("doctor", "").strip()
        appointment_date = request.form.get("appointment_date", "")
        contact = request.form.get("contact", "").strip()

        if not patient or not doctor or not appointment_date or not contact:
            error = "All fields are required!"

        elif not patient.replace(" ", "").isalpha():
            error = "Patient name must contain only letters!"

        elif doctor not in ["Dr. Ravi", "Dr. Priya", "Dr. Kumar"]:
            error = "Please select a valid doctor!"

        elif not contact.isdigit() or len(contact) != 10:
            error = "Enter a valid 10-digit contact number!"

        else:
            try:
                selected_date = date.fromisoformat(appointment_date)

                if selected_date < date.today():
                    error = "Appointment date cannot be in the past!"
            except ValueError:
                error = "Enter a valid appointment date!"

        if error:
            patient = doctor = appointment_date = contact = ""

    return render_template_string(
        html,
        error=error,
        patient=patient,
        doctor=doctor,
        appointment_date=appointment_date,
        contact=contact
    )

if __name__ == "__main__":
    app.run(debug=True)