import nodemailer, { TransportOptions } from "nodemailer";
import config from "../config/config";

export default async function sendEmail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		host: config.mail.host,
		port: config.mail.port,
		secure: config.mail.secure,
		auth: {
			user: config.mail.username,
			pass: config.mail.password,
		},
	} as TransportOptions);

	await transporter.sendMail({
		from: config.mail.emailFrom,
		to,
		subject,
		html,
	});
}
