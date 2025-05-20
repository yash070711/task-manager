import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
  <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-neutral-100 bg-gradient-to-tr from-neutral-100 to-neutral-300">
    <div className="flex w-full max-w-sm flex-col gap-6">
        <a title='Task Management System' href="#" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
            </div>
            TMS
        </a>
        <LoginForm />
    </div>
</div>
  );
}
