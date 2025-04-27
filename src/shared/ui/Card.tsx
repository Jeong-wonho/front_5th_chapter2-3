interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  className?: string
}
// 카드 컴포넌트
export const Card = ({ ref, className, ...props }: CardProps) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
)

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  className?: string
}

export const CardHeader = ({ ref, className, ...props }: CardHeaderProps) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>
  className?: string
}

export const CardTitle = ({ ref, className, ...props }: CardTitleProps) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)
CardTitle.displayName = "CardTitle"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  className?: string
}

export const CardContent = ({ ref, className, ...props }: CardContentProps) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
)
CardContent.displayName = "CardContent"
