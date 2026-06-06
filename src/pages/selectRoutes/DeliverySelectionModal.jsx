"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepSidebar from "./StepSidebar";
import Step1SelectTowards from "./Step1SelectTowards";
import Step2SelectRoute from "./Step2SelectRoute";
import Step3SelectDeliveryPoint from "./Step3SelectDeliveryPoint";
import Step4CompleteDetails from "./Step4CompleteDetails";
import { STEPS } from "./constants";
import {
  generateBookingSummary,
  selectRouteSearch,
  setSelectedDeliveryPoint,
  setSelectedRoute,
} from "@/redux/delivery/deliverySlice";
import {
  getDeliveryPointsByRoute,
  normalizeErrorMessage,
} from "../../../utils/deliveryApi";

const normalizeRouteKey = value =>
  String(value || "")
    .trim()
    .toLowerCase();

const isValidRouteValue = value => {
  if (value === null || value === undefined) return false;
  const normalizedValue = normalizeRouteKey(value);
  return normalizedValue !== "" && normalizedValue !== "0";
};

const getPointRouteIds = point => {
  if (Array.isArray(point?.routeId)) {
    return point.routeId
      .flatMap(item => {
        if (typeof item === "string") return [item];
        if (!item || typeof item !== "object") return [];
        return [item.routeId, item.rootIdName, item.name, item._id].filter(Boolean);
      })
      .map(normalizeRouteKey)
      .filter(isValidRouteValue);
  }

  if (point?.routeId && typeof point.routeId === "object") {
    return [
      point.routeId.routeId,
      point.routeId.rootIdName,
      point.routeId.name,
      point.routeId._id,
    ]
      .filter(Boolean)
      .map(normalizeRouteKey)
      .filter(isValidRouteValue);
  }

  if (typeof point?.routeId === "string") {
    return isValidRouteValue(point.routeId) ? [normalizeRouteKey(point.routeId)] : [];
  }

  return [];
};

const getRoutesForDestination = routeSearch =>
  Array.isArray(routeSearch?.matchedRoutes) ? routeSearch.matchedRoutes : [];

const filterDeliveryPointsForRoute = (points, route) => {
  if (!route) return [];

  const selectedRouteKeys = [
    route.routeId,
    route._id,
    route.id,
    route.name,
    route.rootIdName,
  ]
    .filter(isValidRouteValue)
    .map(normalizeRouteKey)
    .filter(isValidRouteValue);

  return (Array.isArray(points) ? points : [])
    .filter(point => {
      if (point?.status?.isActive === false) return false;
      if (selectedRouteKeys.length === 0) return true;

      const pointRouteIds = getPointRouteIds(point);
      return pointRouteIds.some(routeId => selectedRouteKeys.includes(routeId));
    })
    .sort(
      (firstPoint, secondPoint) =>
        (firstPoint.sequenceOrder ?? firstPoint.estimatedTimeFromStart ?? 0) -
        (secondPoint.sequenceOrder ?? secondPoint.estimatedTimeFromStart ?? 0),
    );
};

export default function DeliverySelectionModal({ isOpen, onClose, onFinish }) {
  const dispatch = useDispatch();
  const routeSearch = useSelector(selectRouteSearch);
  const [step, setStep] = useState(1);
  const [selDest, setSelDest] = useState(null);
  const [selRoute, setSelRoute] = useState(null);
  const [selDP, setSelDP] = useState(null);
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [deliveryPointLoading, setDeliveryPointLoading] = useState(false);
  const [deliveryPointError, setDeliveryPointError] = useState("");
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setStep(1);
        setSelDest(null);
        setSelRoute(null);
        setSelDP(null);
        setDeliveryPoints([]);
        setDeliveryPointError("");
        setDetails({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          pincode: "",
        });
      });
    }
  }, [isOpen]);

  const routes = getRoutesForDestination(routeSearch);

  useEffect(() => {
    if (!selRoute || step < 3) return;

    const routeObjectId = selRoute._id || selRoute.id;
    let isMounted = true;

    const loadDeliveryPoints = async () => {
      setDeliveryPointLoading(true);
      setDeliveryPointError("");

      try {
        const apiPoints = routeObjectId
          ? await getDeliveryPointsByRoute(routeObjectId)
          : [];
        const sourcePoints =
          apiPoints.length > 0 ? apiPoints : routeSearch?.matchedDeliveryPoints || [];

        if (isMounted) {
          setDeliveryPoints(filterDeliveryPointsForRoute(sourcePoints, selRoute));
        }
      } catch (error) {
        const fallbackPoints = filterDeliveryPointsForRoute(
          routeSearch?.matchedDeliveryPoints || [],
          selRoute,
        );

        if (isMounted) {
          setDeliveryPoints(fallbackPoints);
          setDeliveryPointError(
            fallbackPoints.length > 0 ? "" : normalizeErrorMessage(error),
          );
        }
      } finally {
        if (isMounted) setDeliveryPointLoading(false);
      }
    };

    loadDeliveryPoints();

    return () => {
      isMounted = false;
    };
  }, [routeSearch?.matchedDeliveryPoints, selRoute, step]);

  const canNext = useCallback(() => {
    if (step === 1) return !!selDest;
    if (step === 2) return !!selRoute;
    if (step === 3) return !!selDP;
    return true;
  }, [step, selDest, selRoute, selDP]);

  const handleSelectDestination = destination => {
    setSelDest(destination);
    setSelRoute(null);
    setSelDP(null);
    setDeliveryPoints([]);
  };

  const handleSelectRoute = route => {
    setSelRoute(route);
    setSelDP(null);
    setDeliveryPoints([]);
    dispatch(setSelectedRoute(route));
  };

  const handleSelectDeliveryPoint = point => {
    setSelDP(point);
    dispatch(setSelectedDeliveryPoint(point));
    dispatch(generateBookingSummary());
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      onFinish?.({
        towards: selDest,
        route: selRoute,
        deliveryPoint: selDP,
        details,
      });
      onClose?.();
    }
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleDetailsChange = (key, value) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="bg-white w-full max-w-[860px] rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/10 flex overflow-hidden"
        style={{
          height: "min(92dvh, 720px)",
          maxHeight: "calc(100dvh - 1rem)",
        }}
      >
        <div className="hidden md:flex">
          <StepSidebar currentStep={step} />
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 min-w-0 overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4 flex-shrink-0">
            <h3 className="text-base font-semibold text-gray-900">
              {STEPS[step - 1]}
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            {step === 1 && (
              <Step1SelectTowards
                selDest={selDest}
                onSelectDest={handleSelectDestination}
              />
            )}
            {step === 2 && (
              <Step2SelectRoute
                selDest={selDest}
                selRoute={selRoute}
                onSelectRoute={handleSelectRoute}
                routes={routes}
              />
            )}
            {step === 3 && (
              <Step3SelectDeliveryPoint
                selRoute={selRoute}
                selDP={selDP}
                onSelectDP={handleSelectDeliveryPoint}
                deliveryPoints={deliveryPoints}
                loading={deliveryPointLoading}
                error={deliveryPointError}
              />
            )}
            {step === 4 && (
              <Step4CompleteDetails
                selDest={selDest}
                selRoute={selRoute}
                selDP={selDP}
                details={details}
                onDetailsChange={handleDetailsChange}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center justify-between gap-3 sm:justify-start">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300
                      ${i + 1 === step ? "w-4 bg-[#ff581b]" : i + 1 < step ? "w-1.5 bg-[#ff581b] opacity-40" : "w-1.5 bg-gray-200"}
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canNext()}
                className={`min-w-28 px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-150
                  ${
                    canNext()
                      ? "bg-[#ff581b] hover:bg-[#e04d16] active:scale-95"
                      : "bg-orange-200 cursor-not-allowed"
                  }
                `}
              >
                {step === 4 ? "Finish ✓" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
