import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WhatsAppDashboard from "./pages/WhatsAppDashboard";
import Agents from "./pages/Agents";
import Chat from "./pages/Chat";
import NotFound from "./pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: any }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

function Router() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/whatsapp-dashboard">
        <ProtectedRoute component={WhatsAppDashboard} />
      </Route>
      <Route path="/agents">
        <ProtectedRoute component={Agents} />
      </Route>
      <Route path="/chat">
        <ProtectedRoute component={Chat} />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
