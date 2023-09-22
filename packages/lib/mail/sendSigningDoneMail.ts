import { signingCompleteTemplate } from "@documenso/lib/mail";
import { addDigitalSignature } from "@documenso/signing/addDigitalSignature";
import { sendMail } from "./sendMail";
import { Document as PrismaDocument } from "@prisma/client";

export const sendSigningDoneMail = async (document: PrismaDocument, user: any) => {
  await sendMail(
    user.email,
    `Completed: "${document.title}"`,
    signingCompleteTemplate(`Todos os destinatários assinaram "${document.title}".`),
    [
      {
        filename: document.title,
        content: Buffer.from(await addDigitalSignature(document.document), "base64"),
      },
    ]
  );
};
