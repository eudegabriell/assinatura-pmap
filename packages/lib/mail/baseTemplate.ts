import { NEXT_PUBLIC_WEBAPP_URL } from "../constants";

export const baseEmailTemplate = (message: string, content: string) => {
  const html = `
    <div style="background-color: #eaeaea; padding: 2%;">
      <div style="text-align:center; margin: auto; font-size: 14px; color: #353434; max-width: 500px; border-radius: 0.375rem; background: white; padding: 50px">
        <img src="${NEXT_PUBLIC_WEBAPP_URL}/logo_h.png" alt="Assinatura Logo" style="width: 180px; display: block; margin: auto; margin-bottom: 14px;">
        ${message} 
        ${content}
      </div>
    `;

  const footer = `     
      <div style="text-align: left; line-height: 18px; color: #666666; margin: 24px">
        <div>
          <b>Não encaminhe.</b>
          <br>
          Este email dá acesso a um documento seguro. Não encaminhe este email.
        </div>
        <div style="margin-top: 12px">
          <b>Precisa de ajuda?</b>
          <br>
          Contacte-nos em <a href="mailto:contato@responsiveweb.com.br">contato@responsiveweb.com.br</a>  
        </div>
        <hr size="1" style="height: 1px; border: none; color: #D8D8D8; background-color: #D8D8D8">
        <div style="text-align: center">
          <small>Sistema de assinatura fácil e moderna de documentos feito pela Responsive Web.</small>
        </div>
      </div>
    </div>
      `;

  return html + footer;
};

export default baseEmailTemplate;
