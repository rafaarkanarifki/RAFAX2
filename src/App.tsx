import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player"; // Import Player Lottie
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// 1. Komponen Loading Screen Internal
// Menggunakan Tailwind untuk styling agar selaras dengan Shadcn UI
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <DotLottiePlayer
          src="https://lottie.host/42774e4f-ec9c-43cd-b5dd-b0afd75b24b0/SzN2eqHuWX.lottie"
          autoplay
          loop
        />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Mohon tunggu sebentar...
      </p>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulasi loading selama 2.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Render Loading Screen jika isLoading true */}
        {isLoading && <LoadingScreen />}

        {/* Konten Utama: Hanya tampil jika tidak sedang loading */}
        {!isLoading && (
          <>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* Tambahkan semua route kustom Anda di atas route catch-all "*" 
                */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;