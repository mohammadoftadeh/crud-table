import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/navbar";
import { Header } from "./components/header";
import { HomePage } from "./components/home-page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Header />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
