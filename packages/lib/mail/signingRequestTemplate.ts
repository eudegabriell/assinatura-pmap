import { NEXT_PUBLIC_WEBAPP_URL } from "../constants";
import { baseEmailTemplate } from "./baseTemplate";
import { Document as PrismaDocument } from "@prisma/client";

export const signingRequestTemplate = (
  message: string,
  document: any,
  recipient: any,
  ctaLink: string,
  ctaLabel: string,
  user: any
) => {
  const customContent = `
  <p style="margin: 30px 0px; text-align: center">
    <a href="${ctaLink}" style="background-color: #37f095; white-space: nowrap; color: white; border-color: transparent; border-width: 1px; border-radius: 0.375rem; font-size: 18px; padding-left: 16px; padding-right: 16px; padding-top: 10px; padding-bottom: 10px; text-decoration: none; margin-top: 4px; margin-bottom: 4px;">
      ${ctaLabel}
    </a>
  </p>
  <hr size="1" style="height:1px;border:none;color:#e0e0e0;background-color:#e0e0e0">
  Clique no botão para visualizar "${document.title}".<br>
  <small>Se você tiver dúvidas sobre este documento, você deve perguntar a ${user.name ?? user.email}.</small>
  <hr size="1" style="height:1px;border:none;color:#e0e0e0;background-color:#e0e0e0">
  <p style="margin-top: 14px;">
    <small>Quer enviar seus próprios links de assinatura? <a href="https://assinatura-pmap.up.railway.app">O Documento hospedado está aqui!</a>.</small>
  </p>`;

  const html = baseEmailTemplate(message, customContent);

  return html;
};

export default signingRequestTemplate;