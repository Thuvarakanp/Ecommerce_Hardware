export default function ShinyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg,#8a8a96 35%,#fff 50%,#8a8a96 65%)',
        backgroundSize: '200% 100%',
        animation: 'shine 3.5s linear infinite',
      }}
    >
      {children}
    </span>
  )
}
