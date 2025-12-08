document.addEventListener("DOMContentLoaded", () => {
    console.log("apply.js loaded");

    const form = document.getElementById("tutorForm");
    const successMessage = document.getElementById("appSuccessMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // Always post to your Vercel API
        const API_URL = "https://learngevity-website.vercel.app/api/sendApplication";

        try {
            const response = await fetch(API_URL, {
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
