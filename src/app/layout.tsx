import "./globals.css";

export const metadata = {
  title: "Enterprise Employee Management System",
  description: "A professional EMS built with Next.js and FastAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
