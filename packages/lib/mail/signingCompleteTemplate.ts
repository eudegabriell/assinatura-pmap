import { NEXT_PUBLIC_WEBAPP_URL } from "../constants";
import { baseEmailTemplate } from "./baseTemplate";

export const signingCompleteTemplate = (message: string) => {
  const customContent = `
<div style="
    width: 100px;
    height: 100px;
    margin: auto;
    padding-top: 14px;
  ">
  <img src="${NEXT_PUBLIC_WEBAPP_URL}/images/signed_100.png" alt="Documenso Logo" style="width: 100px; display: block;">
</div>

  <p style="margin-top: 14px;">
    Uma cópia do documento assinado foi anexada a este Email.
  </p>
  <p style="margin-top: 14px;">
    <small>Envie links de assinatura? <a href="https://assinatura-pmap.up.railway.app">O Documento hospedado está aqui!</a>.</small>
  </p>`;

  const html = baseEmailTemplate(message, customContent);

  return html;
};

export default signingCompleteTemplate;
