import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { ChatWidget } from "./components/ChatWidget";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsAdmin } from "./hooks/useQueries";
import { AdminPage } from "./pages/AdminPage";
import { AdminSetupPage } from "./pages/AdminSetupPage";
import { AssistantPage } from "./pages/AssistantPage";
import { DashboardPage } from "./pages/DashboardPage";
import { GiveawayPage } from "./pages/GiveawayPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SupportPage } from "./pages/SupportPage";
import { TermsPage } from "./pages/TermsPage";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <Toaster />
    </div>
  );
}

function ProtectedPage({
  children,
  requireAdmin,
}: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin } = useIsAdmin();

  if (isInitializing)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (!identity) {
    navigate({ to: "/login" });
    return null;
  }
  if (requireAdmin && !isAdmin) {
    navigate({ to: "/dashboard" });
    return null;
  }
  return <>{children}</>;
}

function AdminRoute() {
  return (
    <ProtectedPage requireAdmin>
      <AdminPage />
    </ProtectedPage>
  );
}

const rootRoute = createRootRoute({ component: Layout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const giveawayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/giveaway",
  component: GiveawayPage,
});
const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: SupportPage,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedPage>
      <DashboardPage />
    </ProtectedPage>
  ),
});
const assistantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assistant",
  component: () => (
    <ProtectedPage>
      <AssistantPage />
    </ProtectedPage>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminRoute,
});
const adminSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-setup",
  component: () => (
    <ProtectedPage>
      <AdminSetupPage />
    </ProtectedPage>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    signupRoute,
    loginRoute,
    giveawayRoute,
    supportRoute,
    termsRoute,
    dashboardRoute,
    assistantRoute,
    adminRoute,
    adminSetupRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { Link, useNavigate, useRouterState };
export default function App() {
  return <RouterProvider router={router} />;
}
