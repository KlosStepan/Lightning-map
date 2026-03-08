import ReactGA from "react-ga4";

const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let initialized = false;

export const gaInit = () => {
  if (initialized) return;
  if (!GA_ID || !GA_ID.startsWith("G-")) return;

  ReactGA.initialize(GA_ID);
  initialized = true;
};

export const gaPageView = (path: string) => {
  gaInit();
  if (!initialized) return;

  ReactGA.send({ hitType: "pageview", page: path });
};

export const gaEvent = (category: string, action: string, label?: string, value?: number) => {
  gaInit();
  if (!initialized) return;

  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};