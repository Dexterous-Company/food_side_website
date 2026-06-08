// pages/selectRoutes/DeliverySelectionModal.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
  selectSelectedRoute,
  selectSelectedDeliveryPoint,
  selectTowardsLocation,
  setSelectedDeliveryPoint,
  setSelectedRoute,
  setTowardsLocation,
} from "@/redux/delivery/deliverySlice";
import {
  getDeliveryPointsByRoute,
  normalizeErrorMessage,
} from "../../../utils/deliveryApi";

const normalizeRouteKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const isValidRouteValue = (value) => {
  if (value === null || value === undefined) return false;
  const normalizedValue = normalizeRouteKey(value);
  return normalizedValue !== "" && normalizedValue !== "0";
};

const getPointRouteIds = (point) => {
  if (Array.isArray(point?.routeId)) {
    return point.routeId
      .flatMap((item) => {
        if (typeof item === "string") return [item];
        if (!item || typeof item !== "object") return [];
        return [item.routeId, item.rootIdName, item.name, item._id].filter(
          Boolean,
        );
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
    return isValidRouteValue(point.routeId)
      ? [normalizeRouteKey(point.routeId)]
      : [];
  }

  return [];
};

const getRoutesForDestination = (routeSearch) =>
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
    .filter((point) => {
      if (point?.status?.isActive === false) return false;
      if (selectedRouteKeys.length === 0) return true;

      const pointRouteIds = getPointRouteIds(point);
      return pointRouteIds.some((routeId) =>
        selectedRouteKeys.includes(routeId),
      );
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
  const savedRoute = useSelector(selectSelectedRoute);
  const savedDeliveryPoint = useSelector(selectSelectedDeliveryPoint);
  const savedTowardsLocation = useSelector(selectTowardsLocation);
  
  const [step, setStep] = useState(1);
  const [selDest, setSelDest] = useState(null);
  const [selRoute, setSelRoute] = useState(null);
  const [selDP, setSelDP] = useState(null);
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [deliveryPointLoading, setDeliveryPointLoading] = useState(false);
  const [deliveryPointError, setDeliveryPointError] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Initialize state from Redux when modal opens - only run when isOpen changes
  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      
      // Restore saved destination from Redux
      if (savedTowardsLocation && savedTowardsLocation !== "") {
        const destObject = {
          id: savedTowardsLocation,
          name: savedTowardsLocation,
          primaryText: savedTowardsLocation,
          destination: savedTowardsLocation,
        };
        setSelDest(destObject);
      } else {
        setSelDest(null);
      }
      
      // Restore saved route from Redux
      if (savedRoute && savedRoute._id) {
        setSelRoute(savedRoute.fullRouteObject || savedRoute);
      } else {
        setSelRoute(null);
      }
      
      // Restore saved delivery point from Redux
      if (savedDeliveryPoint && savedDeliveryPoint._id) {
        setSelDP(savedDeliveryPoint.fullPointObject || savedDeliveryPoint);
      } else {
        setSelDP(null);
      }
      
      // Always start from step 1 when opening the modal to show all steps for editing
      setStep(1);
      
      setIsInitializing(false);
      setDeliveryPointError("");
    } else {
      // Reset initialization flag when modal closes
      setIsInitializing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only depend on isOpen, not on Redux state changes

  // Load delivery points when route is selected
  useEffect(() => {
    if (!selRoute || !selRoute._id || step !== 3 || isInitializing) return;

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
          apiPoints.length > 0
            ? apiPoints
            : routeSearch?.matchedDeliveryPoints || [];

        if (isMounted) {
          const filtered = filterDeliveryPointsForRoute(sourcePoints, selRoute);
          setDeliveryPoints(filtered);
          
          // Auto-select delivery point if only one available
          if (filtered.length === 1 && !selDP) {
            handleSelectDeliveryPoint(filtered[0]);
          }
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
  }, [routeSearch?.matchedDeliveryPoints, selRoute, step, isInitializing, selDP]);

  const canNext = useCallback(() => {
    if (step === 1) return !!selDest && selDest.name;
    if (step === 2) return !!selRoute && selRoute._id;
    if (step === 3) return !!selDP && selDP._id;
    return true;
  }, [step, selDest, selRoute, selDP]);

  const handleSelectDestination = (destination) => {
    const destObject = {
      id: destination.id || destination.destination || destination.name,
      name: destination.primaryText || destination.destination || destination.name,
      primaryText: destination.primaryText || destination.destination || destination.name,
      destination: destination.destination || destination.name,
      origin: destination.origin || "",
      secondaryText: destination.secondaryText || destination.origin || "",
      routeId: destination.routeId,
      routeName: destination.routeName
    };
    
    setSelDest(destObject);
    setSelRoute(null);
    setSelDP(null);
    setDeliveryPoints([]);
    
    // Save to Redux
    dispatch(setTowardsLocation(destObject.name));
    
    // Auto-advance to next step
    setStep(2);
  };

  const handleSelectRoute = (route) => {
    setSelRoute(route);
    setSelDP(null);
    setDeliveryPoints([]);
    dispatch(setSelectedRoute(route));
    setStep(3);
  };

  const handleSelectDeliveryPoint = (point) => {
    setSelDP(point);
    dispatch(setSelectedDeliveryPoint(point));
    dispatch(generateBookingSummary());
    setStep(4);
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

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleDetailsChange = (key, value) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex sm:items-end sm:justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      style={{ zIndex: 999999 }}
    >
      <div className="bg-white w-full relative max-w-none sm:max-w-3xl sm:rounded-2xl shadow-2xl shadow-black/10 flex overflow-hidden h-full sm:h-[min(92dvh,720px)] max-h-none sm:max-h-[calc(100dvh-1rem)]">
        <div className="hidden md:flex">
          <StepSidebar currentStep={step} />
        </div>

        <div className="flex-1 flex flex-col sm:p-5 md:p-6 min-w-0 overflow-hidden">
          <div className="sm:block hidden">
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
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            {step === 1 && (
              <Step1SelectTowards
                selDest={selDest}
                onSelectDest={handleSelectDestination}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <Step2SelectRoute
                selDest={selDest}
                selRoute={selRoute}
                onSelectRoute={handleSelectRoute}
                routes={getRoutesForDestination(routeSearch)}
                onBack={handlePrev}
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
                onBack={handlePrev}
              />
            )}
            {step === 4 && (
              <Step4CompleteDetails
                selDest={selDest}
                selRoute={selRoute}
                selDP={selDP}
                details={details}
                onDetailsChange={handleDetailsChange}
                onBack={handlePrev}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 sm:p-0 p-2 sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="hidden md:inline-flex w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center justify-between gap-3 sm:justify-start">
              <div className="sm:block hidden">
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-full rounded-full transition-all duration-300
                    ${i + 1 === step ? "w-4 bg-[#ff581b]" : i + 1 < step ? "w-1.5 bg-[#ff581b] opacity-40" : "w-1.5 bg-gray-200"}
                    `}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!canNext()}
                className={`w-full flex items-center justify-center sm:w-28 px-6 py-3 sm:py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-150
                  ${step === 1 ? "hidden md:inline-flex" : "inline-flex"}
                  ${
                    canNext()
                      ? "bg-[#ff581b] hover:bg-[#e04d16] active:scale-95"
                      : "bg-orange-200 cursor-not-allowed"
                  }
                `}
              >
                {step === 4 ? "Update ✓" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}