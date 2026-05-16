import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  required,
  error,
  compact,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string
  label: string
  error?: string
  compact?: boolean
}) {
  return (
    <div className={cn("flex flex-col", compact ? "gap-1.5" : "gap-2")}>
      <Label
        htmlFor={id}
        className={cn(
          "font-medium text-foreground leading-none",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        className={cn(
          "rounded-xl border-border/80 bg-background/80 px-3.5",
          compact ? "h-10 text-sm" : "h-11",
          error && "border-destructive/50",
        )}
        {...props}
      />
      {error ? (
        <p className="text-destructive text-xs leading-snug" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
