import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import Collection from "@/pages/Collection";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/play" component={Game}/>
        <Route path="/collection" component={Collection}/>
        <Route path="/profile" component={Profile}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
