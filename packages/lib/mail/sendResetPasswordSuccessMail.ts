import resetPasswordSuccessTemplate from "./resetPasswordSuccessTemplate";
import { sendMail } from "./sendMail";
import { User } from "@prisma/client";

export const sendResetPasswordSuccessMail = async (user: User) => {
  await sendMail(user.email, "Sucesso na redefinição de senha!", resetPasswordSuccessTemplate(user)).catch(
    (err) => {
      throw err;
    }
  );
};
