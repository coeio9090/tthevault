import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="scanlines flex min-h-screen items-center justify-center bg-black px-4 font-mono">
      <div className="text-center">
        <h1 className="text-6xl text-primary glow">// 404</h1>
        <p className="mt-4 text-muted-foreground text-sm">// FILE NOT IN ARCHIVE</p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">// RETURN TO VAULT</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "// THE VAULT" },
      { name: "description", content: "Classified intelligence. Members only." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() { return <Outlet />; }
