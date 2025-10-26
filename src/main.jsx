import React from "react";
import ReactDOM from "react-dom/client";
import {
  AppProvider,
  PortfolioErrorBoundaryV1,
  BackgroundCanvasV1,
  ThemeToggleV1,
  ScrollToTopButtonV1,
  HeroSection,
  WorkSectionV1,
  ServicesSectionV1,
  AboutSectionV1,
  ContactSectionV1,
  FooterSectionV1,
  useLenis,
} from "./App";
import "./index.css";

function MainApp() {
  useLenis();

  return (
    <AppProvider>
      <PortfolioErrorBoundaryV1>
        <BackgroundCanvasV1 />
        <ThemeToggleV1 />
        <ScrollToTopButtonV1 />
        <main>
          <HeroSection />
          <WorkSectionV1 />
          <ServicesSectionV1 />
          <AboutSectionV1 />
          <ContactSectionV1 />
        </main>
        <FooterSectionV1 />
      </PortfolioErrorBoundaryV1>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
