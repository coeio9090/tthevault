import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { PublishBanner } from "@/components/PublishBanner";

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
      { property: "og:title", content: "// THE VAULT" },
      { name: "twitter:title", content: "// THE VAULT" },
      { property: "og:description", content: "Classified intelligence. Members only." },
      { name: "twitter:description", content: "Classified intelligence. Members only." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/41f71833-4d6a-41bc-9706-a6979b99dec0/id-preview-e3f2ee00--2da32ff2-e6c8-4ebe-b899-7552d337005f.lovable.app-1777832367548.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/41f71833-4d6a-41bc-9706-a6979b99dec0/id-preview-e3f2ee00--2da32ff2-e6c8-4ebe-b899-7552d337005f.lovable.app-1777832367548.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
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

function RootComponent() {
  return (
    <>
      <PublishBanner />
      <Outlet />
    </>
  );
}
