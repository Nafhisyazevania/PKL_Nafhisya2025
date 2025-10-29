export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Override admin layout untuk halaman login
    return <>{children}</>;
}

