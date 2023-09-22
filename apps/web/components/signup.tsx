import Link from "next/link";
import { signup } from "@documenso/lib/api";
import { NEXT_PUBLIC_WEBAPP_URL } from "@documenso/lib/constants";
import { Button } from "@documenso/ui";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
  apiError: string;
};

export default function Signup(props: { source: string }) {
  const form = useForm<FormValues>({});
  const {
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = form;

  const handleErrors = async (resp: Response) => {
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message);
    }
  };

  const signUp: SubmitHandler<FormValues> = async (data) => {
    await toast
      .promise(
        signup(props.source, data)
          .then(handleErrors)
          .then(async () => {
            await signIn<"credentials">("credentials", {
              ...data,
              callbackUrl: `${NEXT_PUBLIC_WEBAPP_URL}/dashboard`,
            });
          }),
        {
          loading: "Criando conta...",
          success: "Criada!",
          error: (err) => err.message,
        },
        {
          style: {
            minWidth: "200px",
          },
        }
      )
      .catch((err) => {
        toast.dismiss();
        form.setError("apiError", { message: err.message });
      });
  };

  function renderApiError() {
    if (!errors.apiError) return;
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {errors.apiError && <div>{errors.apiError?.message}</div>}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  function renderFormValidation() {
    if (!errors.password && !errors.email) return;
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {errors.password && <div>{errors.password?.message}</div>}
            </h3>
            <h3 className="text-sm font-medium text-red-800">
              {errors.email && <div>{errors.email?.message}</div>}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Assinaturas Eletrônicas <br></br>PMAP
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Crie sua conta e comece a usar.<br></br>
            </p>
          </div>
          {renderApiError()}
          {renderFormValidation()}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(signUp)}
              onChange={() => {
                form.clearErrors();
                trigger();
              }}
              className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
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
                    className="focus:border-neon focus:ring-neon relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <input
                    {...register("password", {
                      minLength: {
                        value: 7,
                        message: "Your password has to be at least 7 characters long.",
                      },
                    })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="focus:border-neon focus:ring-neon relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <Button
                type="submit"
                onClick={() => {
                  form.clearErrors();
                }}
                className="sgroup relative flex w-full">
                Criar conta
              </Button>
              <div className="pt-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center"></div>
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-gray-600">
                já tem uma conta?{" "}
                <Link href="/login" className="text-gray-500 hover:text-neon-700 font-medium">
                  Entrar
                </Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
