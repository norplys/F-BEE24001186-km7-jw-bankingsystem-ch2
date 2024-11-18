import fs from "fs/promises";
import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import { HttpError } from "../error.js";
import { fileURLToPath } from "url";

export async function renderEmail(templateName, data) {

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const templatesPath = path.resolve(__dirname, "./templates");

  const templatePath = path.join(templatesPath, templateName);

  const mjmlTemplate = await fs.readFile(templatePath, "utf8");

  const compiledTemplate = Handlebars.compile(mjmlTemplate);

  const mjmlWithData = compiledTemplate(data);

  const { html, errors } = mjml2html(mjmlWithData);

  if (errors.length > 0) {
    throw new HttpError("Failed to convert MJML to HTML.");
  }

  return html;
}
