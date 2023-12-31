import { useState } from "react";
import Link from "next/link";
import { Button } from "@documenso/ui";
import Logo from "./logo";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword() {
  const { register, formState, resetField, handleSubmit } = useForm<ForgotPasswordForm>();
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const onSubmit = async (values: ForgotPasswordForm) => {
    const response = await toast.promise(
      fetch(`/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }),
      {
        loading: "Enviando...",
        success: "Link de redefinição enviado.",
        error: "Não foi possível enviar o link de redefinição :/",
      }
    );

    if (!response.ok) {
      toast.dismiss();

      if (response.status == 404) {
        toast.error("Endereço de email não encontrado.");
      }

      if (response.status == 400) {
        toast.error("Solicitação de redefinição de senha.");
      }

      if (response.status == 500) {
        toast.error("Algo deu errado.");
      }

      return;
    }

    if (response.ok) {
      setResetSuccessful(true);
    }

    resetField("email");
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Logo className="mx-auto h-20 w-auto"></Logo>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {resetSuccessful ? "Redefinir senha" : "Esqueceu sua senha?"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {resetSuccessful
                ? "Verifique seu e-mail para obter instruções de redefinição."
                : "Não se preocupe, enviaremos instruções de redefinição."}
            </p>
          </div>
          {!resetSuccessful && (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:border-neon focus:ring-neon relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="group relative flex w-full">
                  Redefinir senha
                </Button>
              </div>
            </form>
          )}
          <div>
            <Link href="/login">
              <div className="relative mt-10 flex items-center justify-center gap-2 text-sm text-gray-500 hover:cursor-pointer hover:text-gray-900">
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar ao login
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
