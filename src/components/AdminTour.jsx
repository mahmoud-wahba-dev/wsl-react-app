import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Joyride, EVENTS, STATUS } from "react-joyride";
import adminTourSteps from "../tours/adminTourSteps";

const STORAGE_KEY = "wasl-admin-tour-seen";
const START_EVENT = "admin:start-tour";

const locale = {
  back: "السابق",
  close: "إغلاق",
  last: "إنهاء",
  next: "التالي",
  nextWithProgress: "التالي ({current} من {total})",
  open: "فتح الدليل",
  skip: "تخطي",
};

const styles = {
  options: {
    primaryColor: "#043464",
    textColor: "#0D1D2C",
    backgroundColor: "#ffffff",
    arrowColor: "#ffffff",
    zIndex: 9999,
    width: 420,
  },
  buttonBack: {
    color: "#043464",
    border: "1px solid #043464",
    backgroundColor: "transparent",
  },
  buttonSkip: { color: "#3E4946" },
  buttonClose: { color: "#3E4946" },
  tooltipContent: { textAlign: "right", fontSize: "14px", lineHeight: "1.8" },
  tooltipTitle: { textAlign: "right", fontSize: "18px", fontWeight: "700" },
};

const AdminTour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const startTour = () => {
    setStepIndex(0);
    setRun(true);
  };

  const finishTour = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setRun(false);
    setStepIndex(0);
  };

  useEffect(() => {
    const handler = () => startTour();
    window.addEventListener(START_EVENT, handler);
    return () => window.removeEventListener(START_EVENT, handler);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const timer = window.setTimeout(() => startTour(), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleEvent = (data) => {
    const { action, index, status, type } = data;

    if (
      type === EVENTS.TOUR_END ||
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === "skip"
    ) {
      finishTour();
      return;
    }

    if (type === EVENTS.TARGET_NOT_FOUND) {
      const nextStep = adminTourSteps[index + 1];
      if (!nextStep) {
        finishTour();
        return;
      }
      if (nextStep.page && nextStep.page !== location.pathname) {
        navigate(nextStep.page);
      }
      setStepIndex(index + 1);
      return;
    }

    if (type === EVENTS.STEP_AFTER) {
      let nextIndex;
      if (action === "prev") {
        nextIndex = index - 1;
      } else if (action === "next" || action === "close") {
        nextIndex = index + 1;
      } else {
        return;
      }

      if (nextIndex < 0 || nextIndex >= adminTourSteps.length) {
        finishTour();
        return;
      }

      const nextStep = adminTourSteps[nextIndex];
      if (nextStep.page && nextStep.page !== location.pathname) {
        navigate(nextStep.page);
      }
      setStepIndex(nextIndex);
    }
  };

  return (
    <Joyride
      run={run}
      steps={adminTourSteps}
      stepIndex={stepIndex}
      onEvent={handleEvent}
      continuous
      showProgress
      scrollToFirstStep
      locale={locale}
      styles={styles}
      floatingOptions={{ strategy: "fixed" }}
      options={{
        skipBeacon: true,
        buttons: ["back", "close", "primary", "skip"],
        dismissKeyAction: false,
        overlayClickAction: false,
        spotlightRadius: 8,
        targetWaitTimeout: 5000,
      }}
    />
  );
};

export default AdminTour;