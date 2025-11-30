const multiparty = require("multiparty");
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const form = new multiparty.Form();

        form.parse(event, async (err, fields, files) => {
            if (err) {
                console.error("Parsing error:", err);
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ success: false })
                });
                return;
            }

            // Extract text fields
            const data = {};
            for (const key in fields) {
                data[key] = fields[key][0];
            }

            // Convert file uploads into Nodemailer attachments
            const attachments = [];
            for (const key in files) {
                const file = files[key][0];
                attachments.push({
                    filename: file.originalFilename,
                    path: file.path
                });
            }

            // Email transport (Gmail recommended)
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: process.env.EMAIL_USERNAME,
                subject: "New Tutor Application",
                text: JSON.stringify(data, null, 2),
                attachments
            };

            try {
                await transporter.sendMail(mailOptions);

                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ success: true })
                });

            } catch (emailError) {
                console.error("Email error:", emailError);
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ success: false })
                });
            }
        });
    });
};
