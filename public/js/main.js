function openBookingForm(tutorName, tutorEmail) {
  document.getElementById("selectedTutor").innerText = tutorName;
  document.getElementById("tutorEmail").value = tutorEmail;
  document.getElementById("booking-form").style.display = "flex";
}

function closeForm() {
  document.getElementById("booking-form").style.display = "none";
}

document.getElementById("tutorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.send("service_1klv40c", "template_izmx87a", {
    tutorEmail: this.tutorEmail.value,
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    phone: this.phone.value,
    email: this.email.value,
    lessonType: this.lessonType.value,
    subject: this.subject.value,
    sessions: this.sessions.value
  })
  .then(() => {
    alert("Your booking request has been sent! ✅");
    closeForm();
  })
  .catch(error => {
    alert("Error sending message ❌: " + JSON.stringify(error));
  });
});
