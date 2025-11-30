document.addEventListener("DOMContentLoaded", () => {
    console.log("apply.js loaded");

    const form = document.getElementById("tutorForm");
    const successMessage = document.getElementById("appSuccessMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                successMessage.style.display = "block";
                form.reset();

                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);

            } else {
                alert("Failed to submit application.");
            }

        } catch (err) {
            console.error(err);
            alert("Error submitting form. Please try again.");
        }
    });
});
