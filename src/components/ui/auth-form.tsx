import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/sign-up-form"
import { Mail, Lock, User, Building, ArrowRight, CheckCircle2 } from "lucide-react"

interface SignUpFormValues {
  name: string
  email: string
  password: string
  company: string
}

export function AuthForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      company: "",
    },
  })

  const onSubmit = (data: SignUpFormValues) => {
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      form.reset()
    }, 4000)
  }

  return (
    <div className="w-full space-y-6 text-left">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
          Create an account
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your organization credentials to get started
        </p>
      </div>

      {isSubmitted && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Account request received! Check your email for verification.</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-neutral-200">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      {...field}
                      placeholder="Jane Doe"
                      className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-400 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            rules={{ required: "Organization name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-neutral-200">Organization Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      {...field}
                      placeholder="Acme Industrial Corp"
                      className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-400 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-neutral-200">Work Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      {...field}
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-400 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-neutral-200">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-400 mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFA069] to-[#E8713C] hover:opacity-95 text-black transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Create Organization Account</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
