import toast from "react-hot-toast";

export const createOrUpdateRecipient = async (recipient: any): Promise<any> => {
  try {
    const created = await toast.promise(
      fetch("/api/documents/" + recipient.documentId + "/recipients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipient),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        }
        return res.json();
      }),
      {
        loading: "Salvando...",
        success: "Salvo.",
        error: "Não foi possível salvar :/",
      },
      {
        id: "saving",
        style: {
          minWidth: "200px",
        },
      }
    );
    return created;
  } catch (error) {}
};
