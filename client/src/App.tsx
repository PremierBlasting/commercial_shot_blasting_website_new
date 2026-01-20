import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Admin = lazy(() => import("./pages/Admin"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const BirminghamServiceArea = lazy(() => import("./pages/BirminghamServiceArea"));
const SheffieldServiceArea = lazy(() => import("./pages/SheffieldServiceArea"));
const ManchesterServiceArea = lazy(() => import("./pages/ManchesterServiceArea"));
const BristolServiceArea = lazy(() => import("./pages/BristolServiceArea"));
const LeedsServiceArea = lazy(() => import("./pages/LeedsServiceArea"));
const LiverpoolServiceArea = lazy(() => import("./pages/LiverpoolServiceArea"));
const CambridgeServiceArea = lazy(() => import("./pages/CambridgeServiceArea"));
const CardiffServiceArea = lazy(() => import("./pages/CardiffServiceArea"));
const ChesterServiceArea = lazy(() => import("./pages/ChesterServiceArea"));
const CoventryServiceArea = lazy(() => import("./pages/CoventryServiceArea"));
const DerbyServiceArea = lazy(() => import("./pages/DerbyServiceArea"));
const GloucesterServiceArea = lazy(() => import("./pages/GloucesterServiceArea"));
const HerefordServiceArea = lazy(() => import("./pages/HerefordServiceArea"));
const IpswichServiceArea = lazy(() => import("./pages/IpswichServiceArea"));
const LeicesterServiceArea = lazy(() => import("./pages/LeicesterServiceArea"));
const LincolnServiceArea = lazy(() => import("./pages/LincolnServiceArea"));
const MiltonKeynesServiceArea = lazy(() => import("./pages/MiltonKeynesServiceArea"));
const NorwichServiceArea = lazy(() => import("./pages/NorwichServiceArea"));
const NottinghamServiceArea = lazy(() => import("./pages/NottinghamServiceArea"));
const ShrewsburyServiceArea = lazy(() => import("./pages/ShrewsburyServiceArea"));
const StAlbansServiceArea = lazy(() => import("./pages/StAlbansServiceArea"));
const StokeServiceArea = lazy(() => import("./pages/StokeServiceArea"));
const SwindonServiceArea = lazy(() => import("./pages/SwindonServiceArea"));
const StratfordUponAvonServiceArea = lazy(() => import("./pages/StratfordUponAvonServiceArea"));
const WolverhamtonServiceArea = lazy(() => import("./pages/WolverhamtonServiceArea"));
const WorcesterServiceArea = lazy(() => import("./pages/WorcesterServiceArea"));
const NorthamptonServiceArea = lazy(() => import("./pages/NorthamptonServiceArea"));
const OxfordServiceArea = lazy(() => import("./pages/OxfordServiceArea"));
const PeterboroughServiceArea = lazy(() => import("./pages/PeterboroughServiceArea"));
const ChesterfieldServiceArea = lazy(() => import("./pages/ChesterfieldServiceArea"));
const WrexhamServiceArea = lazy(() => import("./pages/WrexhamServiceArea"));
const ConstructionIndustry = lazy(() => import("./pages/ConstructionIndustry"));
const ManufacturingIndustry = lazy(() => import("./pages/ManufacturingIndustry"));
const CallAnalytics = lazy(() => import("./pages/CallAnalytics"));
import { CookieConsent } from "./components/CookieConsent";
import { FloatingCallButton } from "./components/FloatingCallButton";

function Router() {
  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F7F]"></div>
    </div>
  );

  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/call-analytics"} component={CallAnalytics} />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/industries/construction" component={ConstructionIndustry} />
      <Route path="/industries/manufacturing" component={ManufacturingIndustry} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/service-areas" component={ServiceAreas} />
      <Route path="/service-areas/birmingham" component={BirminghamServiceArea} />
      <Route path="/service-areas/sheffield" component={SheffieldServiceArea} />
      <Route path="/service-areas/manchester" component={ManchesterServiceArea} />
      <Route path="/service-areas/bristol" component={BristolServiceArea} />
      <Route path="/service-areas/leeds" component={LeedsServiceArea} />
      <Route path="/service-areas/liverpool" component={LiverpoolServiceArea} />
      <Route path="/service-areas/cambridge" component={CambridgeServiceArea} />
      <Route path="/service-areas/cardiff" component={CardiffServiceArea} />
      <Route path="/service-areas/chester" component={ChesterServiceArea} />
      <Route path="/service-areas/coventry" component={CoventryServiceArea} />
      <Route path="/service-areas/derby" component={DerbyServiceArea} />
      <Route path="/service-areas/gloucester" component={GloucesterServiceArea} />
      <Route path="/service-areas/hereford" component={HerefordServiceArea} />
      <Route path="/service-areas/ipswich" component={IpswichServiceArea} />
      <Route path="/service-areas/leicester" component={LeicesterServiceArea} />
      <Route path="/service-areas/lincoln" component={LincolnServiceArea} />
      <Route path="/service-areas/milton-keynes" component={MiltonKeynesServiceArea} />
      <Route path="/service-areas/norwich" component={NorwichServiceArea} />
      <Route path="/service-areas/nottingham" component={NottinghamServiceArea} />
      <Route path="/service-areas/shrewsbury" component={ShrewsburyServiceArea} />
      <Route path="/service-areas/st-albans" component={StAlbansServiceArea} />
      <Route path="/service-areas/stoke" component={StokeServiceArea} />
      <Route path="/service-areas/swindon" component={SwindonServiceArea} />
      <Route path="/service-areas/stratford-upon-avon" component={StratfordUponAvonServiceArea} />
      <Route path="/service-areas/wolverhampton" component={WolverhamtonServiceArea} />
      <Route path="/service-areas/worcester" component={WorcesterServiceArea} />
      <Route path="/service-areas/northampton" component={NorthamptonServiceArea} />
      <Route path="/service-areas/oxford" component={OxfordServiceArea} />
      <Route path="/service-areas/peterborough" component={PeterboroughServiceArea} />
      <Route path="/service-areas/chesterfield" component={ChesterfieldServiceArea} />
      <Route path="/service-areas/wrexham" component={WrexhamServiceArea} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // Track Core Web Vitals
  usePerformanceMonitoring();
  
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Router />
          <CookieConsent />
          <FloatingCallButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
