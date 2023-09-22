import { NEXT_PUBLIC_WEBAPP_URL } from "../constants";
import { User } from "@prisma/client";

export const resetPasswordSuccessTemplate = (user: User) => {
  return `
  <div style="background-color: #eaeaea; padding: 2%;">
    <div
        style="text-align:left; margin: auto; font-size: 14px; color: #353434; max-width: 500px; border-radius: 0.375rem; background: white; padding: 50px">
        <img src="${NEXT_PUBLIC_WEBAPP_URL}/logo_h.png" alt="Assinatura Logo"
            style="width: 180px; display: block; margin-bottom: 14px;" />
        
        <h2 style="text-align: left; margin-top: 20px; font-size: 24px; font-weight: bold">Password updated!</h2>
        
        <p style="margin-top: 15px">
            Hi ${user.name ? user.name : user.email},
        </p>

        <p style="margin-top: 15px">
            Alteramos sua senha conforme você pediu. Agora você pode fazer login com sua nova senha.
        </p>

        <p style="margin-top: 15px">
            Não solicitou alteração de senha? Estamos aqui para ajudá-lo a proteger sua conta, apenas <a href="https://assinatura-pmap.up.railway.app">entre em contato</a>.
        </p>

        <p style="margin-top: 15px">
            <p style="font-weight: bold">
                A Equipe Responsive
            </p>
        </p>

        <p style="text-align:left; margin-top: 30px">
            <small>Quer enviar seus próprios links de assinatura?
                <a href="https://assinatura-pmap.up.railway.app">O Documento hospedado está aqui!</a>.</small>
        </p>
    </div>
    </div>
    <div style="text-align: left; line-height: 18px; color: #666666; margin: 24px">
        <div style="margin-top: 12px">
            <b>Precisa de ajuda?</b>
            <br>
            Contact us at <a href="mailto:contato@responsiveweb.com.br">contato@responsiveweb.com.br</a>
        </div>
        <hr size="1" style="height: 1px; border: none; color: #D8D8D8; background-color: #D8D8D8">
        <div style="text-align: center">
            <small>Sistema de ssinatura fácil e moderna de documentos feito pela Responsive Web.</small>
        </div>
    </div>
`;
};
export default resetPasswordSuccessTemplate;
