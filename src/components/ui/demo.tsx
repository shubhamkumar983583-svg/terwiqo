import { AuthForm } from "@/components/ui/auth-form";

export function Demo() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-full max-w-md mx-auto mt-8 md:mt-0">
        <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl p-8">
          <AuthForm />
        </div>
        <p className="text-xs text-center text-muted-foreground mt-6 px-4 relative z-10 pointer-events-auto">
          By signing up, you agree to our{" "}
          <a
            href="#terms"
            className="underline hover:text-foreground transition-colors relative z-10"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#privacy"
            className="underline hover:text-foreground transition-colors relative z-10"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Demo;
