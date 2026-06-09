"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  MapPin,
  Navigation,
  Info,
  Check,
  AlertCircle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { FaBackward } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import { Loader2, RefreshCw } from "lucide-react";
import { BsBack } from "react-icons/bs";

// Colors for different routes
const ROUTE_COLORS = [
  { stroke: "#ff581b", fill: "#F9E8B7" }, // Orange
  { stroke: "#3b82f6", fill: "#dbeafe" }, // Blue
  { stroke: "#10b981", fill: "#d1fae5" }, // Green
  { stroke: "#8b5cf6", fill: "#ede9fe" }, // Purple
  { stroke: "#f59e0b", fill: "#fef3c7" }, // Amber
  { stroke: "#ef4444", fill: "#fee2e2" }, // Red
  { stroke: "#06b6d4", fill: "#cffafe" }, // Cyan
  { stroke: "#ec489a", fill: "#fce7f3" }, // Pink
  { stroke: "#84cc16", fill: "#ecfccb" }, // Lime
  { stroke: "#6366f1", fill: "#e0e7ff" }, // Indigo
  { stroke: "#14b8a6", fill: "#ccfbf1" }, // Teal
];

// Different line patterns for duplicate routes
const LINE_PATTERNS = [
  { type: "solid", pattern: null, name: "Solid" },
  { type: "dashed", pattern: [10, 8], name: "Dashed" },
  { type: "dotted", pattern: [2, 6], name: "Dotted" },
  { type: "dash-dot", pattern: [15, 5, 3, 5], name: "Dash-Dot" },
];

export default function MapViewModal({
  from,
  to,
  selectedRoute,
  routes,
  onClose,
  onSelectRoute,
  isInline = false,
  onBack,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const distanceLabelsRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [routesLoading, setRoutesLoading] = useState(false);
  const [selectedMapRouteIndex, setSelectedMapRouteIndex] = useState(null);
  const [hoveredRouteIndex, setHoveredRouteIndex] = useState(null);
  const [routesWithPolylines, setRoutesWithPolylines] = useState([]);
  const [mapZoom, setMapZoom] = useState(6);
  const [showLegend, setShowLegend] = useState(true);

  const GOOGLE_MAPS_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
    "AIzaSyDfjw4P4PnfI08-B-ljZDhEeQxnBqNv3hQ";

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`,
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setMapLoaded(true));
      existingScript.addEventListener("error", () =>
        setMapError("Failed to load Google Maps"),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    script.onerror = () => setMapError("Failed to load Google Maps API");
    document.head.appendChild(script);
  }, [GOOGLE_MAPS_API_KEY]);

  // Initialize map
  const initMap = useCallback(() => {
    if (!mapContainerRef.current || !window.google || !window.google.maps)
      return;

    if (mapRef.current) {
      mapRef.current = null;
    }

    const defaultCenter = { lat: 20.5937, lng: 78.9629 };

    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      zoom: 6,
      center: defaultCenter,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: false,
    });

    mapRef.current.addListener("zoom_changed", () => {
      setMapZoom(mapRef.current.getZoom());
    });

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, []);

  // Initialize map when loaded
  useEffect(() => {
    if (mapLoaded && mapContainerRef.current) {
      initMap();
    }
  }, [mapLoaded, initMap]);

  // Trigger map resize when container becomes visible (for inline mode)
  useEffect(() => {
    if (mapRef.current && isInline) {
      // Small delay to ensure container has dimensions
      const timer = setTimeout(() => {
        window.google.maps.event.trigger(mapRef.current, "resize");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInline, mapLoaded]);

  // Fetch route polyline for a specific route
  const fetchRoutePolyline = async (route, index) => {
    if (!directionsServiceRef.current || !from || !to) return null;

    return new Promise((resolve) => {
      const request = {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      };

      directionsServiceRef.current.route(request, (response, status) => {
        if (
          status === window.google.maps.DirectionsStatus.OK &&
          response.routes
        ) {
          let matchingRoute = null;

          const targetDistance = route.distanceKm
            ? parseFloat(route.distanceKm) * 1000
            : null;

          let bestMatch = null;
          let smallestDifference = Infinity;

          response.routes.forEach((googleRoute, idx) => {
            if (googleRoute.legs && googleRoute.legs[0]) {
              const routeDistance = googleRoute.legs[0].distance?.value || 0;

              if (targetDistance) {
                const difference = Math.abs(routeDistance - targetDistance);
                if (difference < smallestDifference) {
                  smallestDifference = difference;
                  bestMatch = { googleRoute, idx };
                }
              } else {
                if (!matchingRoute) {
                  matchingRoute = googleRoute;
                }
              }
            }
          });

          if (bestMatch) {
            matchingRoute = bestMatch.googleRoute;
          }

          if (matchingRoute) {
            resolve({
              route: matchingRoute,
              index: index,
              originalRoute: route,
            });
          } else {
            resolve({
              route: response.routes[0],
              index: index,
              originalRoute: route,
            });
          }
        } else {
          console.warn(`No route found for ${route.name}`);
          resolve(null);
        }
      });
    });
  };

  // Fetch polylines for all routes
  const fetchAllRoutePolylines = useCallback(async () => {
    if (!routes || routes.length === 0 || !directionsServiceRef.current)
      return [];

    const results = [];

    for (let i = 0; i < routes.length; i++) {
      const result = await fetchRoutePolyline(routes[i], i);
      if (result) {
        results.push(result);
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return results;
  }, [routes, from, to]);

  // Extract complete polyline path from a route
  const extractFullPolylinePath = (route) => {
    const path = [];

    if (!route) return path;

    if (route.overview_path && route.overview_path.length > 0) {
      route.overview_path.forEach((point) => {
        path.push({ lat: point.lat(), lng: point.lng() });
      });
      return path;
    }

    if (route.legs) {
      route.legs.forEach((leg) => {
        if (leg.steps) {
          leg.steps.forEach((step) => {
            if (step.start_location) {
              path.push({
                lat: step.start_location.lat(),
                lng: step.start_location.lng(),
              });
            }
            if (step.path && step.path.length > 0) {
              step.path.forEach((point) => {
                path.push({ lat: point.lat(), lng: point.lng() });
              });
            }
            if (step.end_location) {
              path.push({
                lat: step.end_location.lat(),
                lng: step.end_location.lng(),
              });
            }
          });
        }
      });
    }

    return path;
  };

  // Create a permanent distance label on the polyline
  const createDistanceLabel = (distanceText, path, color, index) => {
    if (!mapRef.current || !path || path.length < 2) return null;

    // Find the midpoint of the polyline
    const midIndex = Math.floor(path.length / 2);
    const midPoint = path[midIndex];

    if (!midPoint) return null;

    // Create a custom overlay for the label
    const labelDiv = document.createElement("div");
    labelDiv.className = "distance-label";
    labelDiv.textContent = distanceText;
    labelDiv.style.backgroundColor = color;
    labelDiv.style.color = "white";
    labelDiv.style.padding = "4px 10px";
    labelDiv.style.borderRadius = "20px";
    labelDiv.style.fontSize = "12px";
    labelDiv.style.fontWeight = "bold";
    labelDiv.style.whiteSpace = "nowrap";
    labelDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    labelDiv.style.border = "2px solid white";
    labelDiv.style.fontFamily = "Arial, sans-serif";
    labelDiv.style.cursor = "pointer";
    labelDiv.style.zIndex = "100";
    labelDiv.style.pointerEvents = "auto";

    // Add click handler to the label
    labelDiv.onclick = () => {
      const originalRoute = routesWithPolylines[index]?.originalRoute;
      if (originalRoute) {
        onSelectRoute(originalRoute);
        onClose();
      }
    };

    // Add hover effect
    labelDiv.onmouseenter = () => {
      labelDiv.style.transform = "scale(1.05)";
      labelDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    };

    labelDiv.onmouseleave = () => {
      labelDiv.style.transform = "scale(1)";
      labelDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    };

    const overlay = new window.google.maps.OverlayView();
    overlay.onAdd = function () {
      this.getPanes().floatPane.appendChild(labelDiv);
    };
    overlay.draw = function () {
      const overlayProjection = this.getProjection();
      const position = overlayProjection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(midPoint.lat, midPoint.lng),
      );
      if (position) {
        labelDiv.style.position = "absolute";
        labelDiv.style.left = position.x - labelDiv.offsetWidth / 2 + "px";
        labelDiv.style.top = position.y - labelDiv.offsetHeight - 8 + "px";
      }
    };
    overlay.onRemove = function () {
      if (labelDiv.parentNode) {
        labelDiv.parentNode.removeChild(labelDiv);
      }
    };
    overlay.setMap(mapRef.current);

    return overlay;
  };

  // Function to check if two paths are identical
  const arePathsIdentical = (path1, path2) => {
    if (!path1 || !path2 || path1.length !== path2.length) return false;

    // Sample every 10th point for performance
    const step = Math.max(1, Math.floor(path1.length / 30));

    for (let i = 0; i < path1.length; i += step) {
      const p1 = path1[i];
      const p2 = path2[i];
      if (!p2) return false;

      // Check if points are within ~100 meters
      if (
        Math.abs(p1.lat - p2.lat) > 0.001 ||
        Math.abs(p1.lng - p2.lng) > 0.001
      ) {
        return false;
      }
    }
    return true;
  };

  // Draw a single route on the map
  const drawRoute = (routeData, index, bounds, allPaths, duplicateOffset) => {
    if (!mapRef.current || !routeData) return null;

    const { route: googleRoute, originalRoute } = routeData;
    const colorScheme = ROUTE_COLORS[index % ROUTE_COLORS.length];
    let originalPath = extractFullPolylinePath(googleRoute);

    if (originalPath.length === 0) {
      console.warn(`No path found for route ${index}`);
      return null;
    }

    // Apply offset for duplicate routes
    let path = originalPath;
    let patternIndex = 0;

    if (
      duplicateOffset &&
      duplicateOffset.totalDuplicates > 1 &&
      duplicateOffset.offsetIndex > 0
    ) {
      // Apply slight offset to make duplicate routes visible
      const offsetAmount = duplicateOffset.offsetIndex * 0.0003;
      path = [];
      for (let i = 0; i < originalPath.length; i++) {
        const point = originalPath[i];
        // Simple perpendicular offset
        let offsetLat = 0;
        let offsetLng = 0;

        if (i === 0 && originalPath.length > 1) {
          const nextPoint = originalPath[i + 1];
          const dx = nextPoint.lng - point.lng;
          const dy = nextPoint.lat - point.lat;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            offsetLng = (-dy / len) * offsetAmount;
            offsetLat = (dx / len) * offsetAmount;
          }
        } else if (i === originalPath.length - 1 && originalPath.length > 1) {
          const prevPoint = originalPath[i - 1];
          const dx = point.lng - prevPoint.lng;
          const dy = point.lat - prevPoint.lat;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            offsetLng = (-dy / len) * offsetAmount;
            offsetLat = (dx / len) * offsetAmount;
          }
        } else if (originalPath.length > 2) {
          const prevPoint = originalPath[i - 1];
          const nextPoint = originalPath[i + 1];
          const dx1 = point.lng - prevPoint.lng;
          const dy1 = point.lat - prevPoint.lat;
          const dx2 = nextPoint.lng - point.lng;
          const dy2 = nextPoint.lat - point.lat;
          const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (len1 > 0 && len2 > 0) {
            const offsetLng1 = -dy1 / len1;
            const offsetLat1 = dx1 / len1;
            const offsetLng2 = -dy2 / len2;
            const offsetLat2 = dx2 / len2;
            offsetLng = ((offsetLng1 + offsetLng2) / 2) * offsetAmount;
            offsetLat = ((offsetLat1 + offsetLat2) / 2) * offsetAmount;
          }
        }

        path.push({
          lat: point.lat + offsetLat,
          lng: point.lng + offsetLng,
        });
      }
      patternIndex = duplicateOffset.offsetIndex;
    } else {
      path = originalPath;
    }

    path.forEach((point) => {
      bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
    });

    // Calculate distance for label
    const distanceText = originalRoute.distanceKm
      ? `${originalRoute.distanceKm} km`
      : `${googleRoute.legs[0]?.distance?.text || "N/A"}`;

    // Get pattern for this route
    const pattern = LINE_PATTERNS[patternIndex % LINE_PATTERNS.length];

    const polylineOptions = {
      path: path,
      geodesic: true,
      strokeColor: colorScheme.stroke,
      strokeOpacity: index === selectedMapRouteIndex ? 1.0 : 0.8,
      strokeWeight: index === selectedMapRouteIndex ? 7 : 4,
      clickable: true,
      zIndex: index === selectedMapRouteIndex ? 100 : index + 1,
    };

    // Add dash pattern for duplicate routes
    if (pattern.pattern) {
      polylineOptions.icons = [
        {
          icon: {
            path: "M 0,-1 0,1",
            strokeColor: colorScheme.stroke,
            strokeOpacity: index === selectedMapRouteIndex ? 1.0 : 0.8,
            strokeWeight: index === selectedMapRouteIndex ? 7 : 4,
          },
          offset: "0",
          repeat: pattern.pattern[0] + "px",
        },
      ];
    }

    const polyline = new window.google.maps.Polyline(polylineOptions);

    polyline.addListener("mouseover", () => {
      setHoveredRouteIndex(index);
      polyline.setOptions({
        strokeWeight: 8,
        strokeOpacity: 1,
        zIndex: 200,
      });
    });

    polyline.addListener("mouseout", () => {
      setHoveredRouteIndex(null);
      const isSelected = index === selectedMapRouteIndex;
      polyline.setOptions({
        strokeWeight: isSelected ? 7 : 4,
        strokeOpacity: isSelected ? 1.0 : 0.8,
        zIndex: isSelected ? 100 : index + 1,
      });
    });

    polyline.addListener("click", () => {
      console.log("Polyline clicked for route index:", index);
      selectRouteOnMap(index, originalRoute, colorScheme);
      onSelectRoute(originalRoute);
      onClose();
    });

    polyline.setMap(mapRef.current);

    // Add permanent distance label (slightly offset for duplicates)
    let labelPath = path;
    if (duplicateOffset && duplicateOffset.totalDuplicates > 1) {
      labelPath = originalPath;
    }
    const distanceLabel = createDistanceLabel(
      distanceText,
      labelPath,
      colorScheme.stroke,
      index,
    );
    if (distanceLabel) {
      distanceLabelsRef.current.push(distanceLabel);
    }

    // Add start markers only for unique routes to avoid clutter
    if (
      originalPath.length > 0 &&
      (!duplicateOffset || duplicateOffset.offsetIndex === 0)
    ) {
      const startPoint = originalPath[0];
      const startMarker = new window.google.maps.Marker({
        position: { lat: startPoint.lat, lng: startPoint.lng },
        map: mapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#22c55e",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        title: "Starting Point",
        zIndex: 5,
      });
      markersRef.current.push(startMarker);
    }

    // Add end markers only for unique routes to avoid clutter
    if (
      originalPath.length > 0 &&
      (!duplicateOffset || duplicateOffset.offsetIndex === 0)
    ) {
      const endPoint = originalPath[originalPath.length - 1];
      const endMarker = new window.google.maps.Marker({
        position: { lat: endPoint.lat, lng: endPoint.lng },
        map: mapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        title: "Destination",
        zIndex: 5,
      });
      markersRef.current.push(endMarker);
    }

    return polyline;
  };

  // Select a route on the map (visual only, doesn't close modal)
  const selectRouteOnMap = (index, route, colorScheme) => {
    setSelectedMapRouteIndex(index);

    polylinesRef.current.forEach((pl, i) => {
      if (i === index) {
        pl.setOptions({
          strokeWeight: 8,
          strokeOpacity: 1.0,
          zIndex: 100,
        });
      } else {
        pl.setOptions({
          strokeWeight: 3,
          strokeOpacity: 0.3,
          zIndex: 1,
        });
      }
    });

    if (infoWindowRef.current && route) {
      infoWindowRef.current.setContent(`
        <div style="padding: 12px; font-family: Arial, sans-serif; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${colorScheme.stroke}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px;">
              ${index + 1}
            </div>
            <strong style="font-size: 15px;">${route.name?.replace(/[^a-zA-Z0-9]+/g, ' ') || `Route ${index + 1}`}</strong>
          </div>
          <div style="display: flex; gap: 20px; margin-bottom: 10px;">
            <span style="font-size: 13px;">
              <strong>📏</strong> ${route.distanceKm || "N/A"}
            </span>
            <span style="font-size: 13px;">
              <strong>⏱️</strong> ${route.durationMinutes ? `${Math.floor(route.durationMinutes / 60)}h ${route.durationMinutes % 60}m` : "N/A"}
            </span>
          </div>
          ${route.summary?.replace(/[^a-zA-Z0-9]+/g, ' ') ? `<div style="font-size: 12px; color: #666; margin-top: 5px;">🛣️ ${route.summary}</div>` : ""}
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
            <button id="selectRouteBtn" style="width: 100%; padding: 8px; background: ${colorScheme.stroke}; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
              Select This Route
            </button>
          </div>
        </div>
      `);

      if (polylinesRef.current[index]) {
        const path = polylinesRef.current[index].getPath();
        if (path.getLength() > 0) {
          infoWindowRef.current.setPosition(path.getAt(0));
          infoWindowRef.current.open(mapRef.current);

          setTimeout(() => {
            const btn = document.getElementById("selectRouteBtn");
            if (btn) {
              btn.onclick = () => {
                console.log("Select button clicked for route:", index);
                onSelectRoute(route);
                onClose();
              };
            }
          }, 100);
        }
      }
    }
  };

  // Zoom controls
  const zoomIn = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom() + 1;
      mapRef.current.setZoom(newZoom);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom() - 1;
      mapRef.current.setZoom(newZoom);
    }
  };

  const fitAllRoutes = () => {
    if (mapRef.current && polylinesRef.current.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      polylinesRef.current.forEach((polyline) => {
        const path = polyline.getPath();
        for (let i = 0; i < path.getLength(); i++) {
          bounds.extend(path.getAt(i));
        }
      });
      if (!bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds);
      }
    }
  };

  // Reload routes function (can be called manually)
  const reloadRoutes = useCallback(async () => {
    if (!mapLoaded || !mapRef.current || !from || !to || !routes || routes.length === 0) return;

    setRoutesLoading(true);
    setMapError(null);
    setSelectedMapRouteIndex(null);

    polylinesRef.current.forEach((pl) => pl.setMap(null));
    polylinesRef.current = [];

    distanceLabelsRef.current.forEach((label) => {
      if (label) label.setMap(null);
    });
    distanceLabelsRef.current = [];

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    try {
      const routesWithPaths = await fetchAllRoutePolylines();

      // Extract paths and detect duplicates
      const paths = [];
      const duplicateInfo = [];

      for (let i = 0; i < routesWithPaths.length; i++) {
        const routeData = routesWithPaths[i];
        const path = extractFullPolylinePath(routeData.route);
        paths.push(path);

        // Find if this path is a duplicate of any previous path
        let duplicateCount = 0;
        let offsetIndex = 0;

        for (let j = 0; j < i; j++) {
          if (arePathsIdentical(path, paths[j])) {
            duplicateCount++;
          }
        }

        // Count total duplicates for this path
        let totalDuplicates = 1;
        for (let j = i + 1; j < routesWithPaths.length; j++) {
          const futurePath = extractFullPolylinePath(
            routesWithPaths[j].route,
          );
          if (arePathsIdentical(path, futurePath)) {
            totalDuplicates++;
          }
        }

        // Count how many duplicates before this one
        let duplicatesBefore = 0;
        for (let j = 0; j < i; j++) {
          if (arePathsIdentical(path, paths[j])) {
            duplicatesBefore++;
          }
        }

        duplicateInfo.push({
          isDuplicate: duplicateCount > 0 || totalDuplicates > 1,
          offsetIndex: duplicatesBefore,
          totalDuplicates: totalDuplicates,
        });
      }

      setRoutesWithPolylines(routesWithPaths);

      if (routesWithPaths.length === 0) {
        setMapError("Could not load route paths. Please try again.");
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();
      const newPolylines = [];

      routesWithPaths.forEach((routeData, index) => {
        const polyline = drawRoute(
          routeData,
          index,
          bounds,
          paths,
          duplicateInfo[index],
        );
        if (polyline) {
          newPolylines.push(polyline);
        }
      });

      polylinesRef.current = newPolylines;

      if (mapRef.current && !bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds);
        const listener = window.google.maps.event.addListener(
          mapRef.current,
          "idle",
          () => {
            const zoom = mapRef.current.getZoom();
            if (zoom > 14) {
              mapRef.current.setZoom(14);
            }
            window.google.maps.event.removeListener(listener);
          },
        );
      }
    } catch (error) {
      console.error("Error loading routes:", error);
      setMapError("Failed to load routes on map");
    } finally {
      setRoutesLoading(false);
    }
  }, [mapLoaded, from, to, routes]);

  // Load all routes when component mounts
  useEffect(() => {
    if (!mapLoaded || !from || !to || !routes || routes.length === 0) {
      console.log("Map useEffect skipped:", {
        mapLoaded,
        from: !!from,
        to: !!to,
        routesLength: routes?.length || 0,
      });
      return;
    }

    console.log("Map useEffect triggered - Loading routes:", {
      from,
      to,
      routesCount: routes.length,
    });

    const loadRoutes = async () => {
      setRoutesLoading(true);
      setMapError(null);
      setSelectedMapRouteIndex(null);

      polylinesRef.current.forEach((pl) => pl.setMap(null));
      polylinesRef.current = [];

      distanceLabelsRef.current.forEach((label) => {
        if (label) label.setMap(null);
      });
      distanceLabelsRef.current = [];

      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }

      try {
        const routesWithPaths = await fetchAllRoutePolylines();

        // Extract paths and detect duplicates
        const paths = [];
        const duplicateInfo = [];

        for (let i = 0; i < routesWithPaths.length; i++) {
          const routeData = routesWithPaths[i];
          const path = extractFullPolylinePath(routeData.route);
          paths.push(path);

          // Find if this path is a duplicate of any previous path
          let duplicateCount = 0;
          let offsetIndex = 0;

          for (let j = 0; j < i; j++) {
            if (arePathsIdentical(path, paths[j])) {
              duplicateCount++;
            }
          }

          // Count total duplicates for this path
          let totalDuplicates = 1;
          for (let j = i + 1; j < routesWithPaths.length; j++) {
            const futurePath = extractFullPolylinePath(
              routesWithPaths[j].route,
            );
            if (arePathsIdentical(path, futurePath)) {
              totalDuplicates++;
            }
          }

          // Count how many duplicates before this one
          let duplicatesBefore = 0;
          for (let j = 0; j < i; j++) {
            if (arePathsIdentical(path, paths[j])) {
              duplicatesBefore++;
            }
          }

          duplicateInfo.push({
            isDuplicate: duplicateCount > 0 || totalDuplicates > 1,
            offsetIndex: duplicatesBefore,
            totalDuplicates: totalDuplicates,
          });
        }

        setRoutesWithPolylines(routesWithPaths);

        if (routesWithPaths.length === 0) {
          setMapError("Could not load route paths. Please try again.");
          return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        const newPolylines = [];

        routesWithPaths.forEach((routeData, index) => {
          const polyline = drawRoute(
            routeData,
            index,
            bounds,
            paths,
            duplicateInfo[index],
          );
          if (polyline) {
            newPolylines.push(polyline);
          }
        });

        polylinesRef.current = newPolylines;

        if (mapRef.current && !bounds.isEmpty()) {
          mapRef.current.fitBounds(bounds);
          const listener = window.google.maps.event.addListener(
            mapRef.current,
            "idle",
            () => {
              const zoom = mapRef.current.getZoom();
              if (zoom > 14) {
                mapRef.current.setZoom(14);
              }
              window.google.maps.event.removeListener(listener);
            },
          );
        }
      } catch (error) {
        console.error("Error loading routes:", error);
        setMapError("Failed to load routes on map");
      } finally {
        setRoutesLoading(false);
      }
    };

    loadRoutes();

    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [mapLoaded, from, to, routes]);

  // Handle route selection from list
  const handleRouteSelect = (index) => {
    if (!routesWithPolylines[index]) return;

    const { originalRoute } = routesWithPolylines[index];
    const colorScheme = ROUTE_COLORS[index % ROUTE_COLORS.length];
    selectRouteOnMap(index, originalRoute, colorScheme);

    if (polylinesRef.current[index]) {
      const bounds = new window.google.maps.LatLngBounds();
      const path = polylinesRef.current[index].getPath();
      for (let i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
      if (!bounds.isEmpty()) {
        mapRef.current.fitBounds(bounds);
      }
    }
  };

  // Format duration for display
  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // If inline mode, render without modal overlay
  if (isInline) {
    return (
      <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-2 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div onClick={onBack}>
              <BiArrowBack className="text-lg" />
            </div>
            <div className="p-2 bg-[#ff581b] rounded-lg">
              <MapPin size={18} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">
                Available Routes ({routes?.length || 0})
              </div>
              <div className="text-xs text-gray-500">
                {routes && routes.length > 0
                  ? `${routes.length} route${routes.length > 1 ? "s" : ""} available - Click any route to select`
                  : "No routes available"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Mobile Refresh Button */}
            <button
              onClick={reloadRoutes}
              disabled={routesLoading}
              className={`md:hidden p-2 hover:bg-white rounded-full transition-colors ${routesLoading ? 'opacity-50' : ''}`}
              title="Refresh Routes"
            >
              <RefreshCw size={18} className={`text-gray-600 ${routesLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 md:block hidden hover:bg-white rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Route Info Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">
                {from || "Source"}
              </span>
              <Navigation size={14} className="text-[#ff581b]" />
              <span className="font-semibold text-gray-700">
                {to || "Destination"}
              </span>
            </div>
          </div>
          {selectedRoute && (
            <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
              <Check size={12} />
              Current: {selectedRoute.name}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative min-h-0 bg-gray-100">
          {/* Loading Spinner - Map Loading */}
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
              <div className="text-center">
                <Loader2 size={48} className="text-[#ff581b] animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {/* Loading Spinner - Routes Loading */}
          {mapLoaded && routesLoading && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="text-center">
                <Loader2 size={48} className="text-[#ff581b] animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600">Loading routes on map...</p>
              </div>
            </div>
          )}

          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-center p-6 max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {mapError}
                </p>
                <button
                  onClick={() => setMapError(null)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#ff581b] rounded-lg hover:bg-[#ff4510]"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <div
            ref={mapContainerRef}
            className="w-full h-full"
            style={{ minHeight: "400px" }}
          />

          {/* Custom Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
            <button
              onClick={zoomIn}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} className="text-gray-700" />
            </button>
            <button
              onClick={zoomOut}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} className="text-gray-700" />
            </button>
            <button
              onClick={fitAllRoutes}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors mt-2"
              title="Fit All Routes"
            >
              <MapPin size={20} className="text-gray-700" />
            </button>
            <button
              onClick={reloadRoutes}
              disabled={routesLoading}
              className={`bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors mt-2 ${routesLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Refresh Routes"
            >
              <RefreshCw size={20} className={`text-gray-700 ${routesLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Legend */}
          {routes &&
            routes.length > 0 &&
            polylinesRef.current.length > 0 &&
            showLegend && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs z-10 border border-gray-200 min-w-[200px] max-w-[240px]">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div className="font-semibold text-gray-700">Routes</div>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {routes.map((route, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 mb-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                        hoveredRouteIndex === idx ? "bg-gray-100" : ""
                      } ${selectedMapRouteIndex === idx ? "bg-blue-50" : ""}`}
                      onMouseEnter={() => setHoveredRouteIndex(idx)}
                      onMouseLeave={() => setHoveredRouteIndex(null)}
                      onClick={() => handleRouteSelect(idx)}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm flex-shrink-0"
                        style={{
                          backgroundColor:
                            ROUTE_COLORS[idx % ROUTE_COLORS.length].stroke,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-800 text-[10px] font-medium truncate">
                          {route.name || `Route ${idx + 1}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }

  // Modal mode (default)
  return (
    <div className="fixed inset-0 z-[1000] p-4 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-full overflow-y-auto bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-2 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              onClick={onBack || onClose}
              className="p-2 hover:bg-white rounded-full transition-colors"
              aria-label="Go back"
            >
              <BiArrowBack size={20} className="text-gray-600" />
            </button>
            <div className="p-2 bg-[#ff581b] rounded-lg">
              <MapPin size={18} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">
                Available Routes ({routes?.length || 0})
              </div>
              <div className="text-xs text-gray-500">
                {routes && routes.length > 0
                  ? `${routes.length} route${routes.length > 1 ? "s" : ""} available - Click any route to select`
                  : "No routes available"}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Route Info Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">
                {from || "Source"}
              </span>
              <Navigation size={14} className="text-[#ff581b]" />
              <span className="font-semibold text-gray-700">
                {to || "Destination"}
              </span>
            </div>
          </div>
          {selectedRoute && (
            <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
              <Check size={12} />
              Current: {selectedRoute.name}
            </div>
          )}
        </div>

        {/* Map Container with Custom Zoom Controls */}
        <div className="flex-1 relative min-h-10 md:min-h-[450px] bg-gray-100">
          {/* Loading Spinner - Map Loading */}
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
              <div className="text-center">
                <Loader2 size={48} className="text-[#ff581b] animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {/* Loading Spinner - Routes Loading */}
          {mapLoaded && routesLoading && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="text-center">
                <Loader2 size={48} className="text-[#ff581b] animate-spin mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600">Loading routes on map...</p>
              </div>
            </div>
          )}

          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="text-center p-6 max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {mapError}
                </p>
                <button
                  onClick={() => {
                    setMapError(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#ff581b] rounded-lg hover:bg-[#ff4510]"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <div
            ref={mapContainerRef}
            className="w-full h-full"
            style={{ minHeight: "450px" }}
          />

          {/* Custom Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
            <button
              onClick={zoomIn}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} className="text-gray-700" />
            </button>
            <button
              onClick={zoomOut}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} className="text-gray-700" />
            </button>
            <button
              onClick={fitAllRoutes}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors mt-2"
              title="Fit All Routes"
            >
              <MapPin size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Enhanced Legend with Distance and Time */}
          {routes &&
            routes.length > 0 &&
            polylinesRef.current.length > 0 &&
            showLegend && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs z-10 border border-gray-200 min-w-[240px] max-w-[280px]">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div className="font-semibold text-gray-700">
                    Routes Legend
                  </div>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {routes.map((route, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 mb-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                        hoveredRouteIndex === idx ? "bg-gray-100" : ""
                      } ${selectedMapRouteIndex === idx ? "bg-blue-50" : ""}`}
                      onMouseEnter={() => setHoveredRouteIndex(idx)}
                      onMouseLeave={() => setHoveredRouteIndex(null)}
                      onClick={() => handleRouteSelect(idx)}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] shadow-sm flex-shrink-0"
                        style={{
                          backgroundColor:
                            ROUTE_COLORS[idx % ROUTE_COLORS.length].stroke,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-gray-800 text-xs font-medium truncate">
                            {(route.name || `Route ${idx + 1}`).replace(/[^a-zA-Z0-9]+/g, ' ')}
                          </span>
                          {selectedMapRouteIndex === idx && (
                            <Check
                              size={12}
                              className="text-blue-500 flex-shrink-0"
                            />
                          )}
                        </div>
                        <div className="flex gap-2 text-[10px] text-gray-500 mt-0.5">
                          <span>📏 {route.distanceKm || "N/A"}</span>
                          <span>
                            ⏱️ {formatDuration(route.durationMinutes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Minimized Legend Button */}
          {routes && routes.length > 0 && !showLegend && (
            <button
              onClick={() => setShowLegend(true)}
              className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 text-xs z-10 border border-gray-200 flex items-center gap-1"
            >
              <MapPin size={14} className="text-[#ff581b]" />
              <span className="font-medium">Show Routes ({routes.length})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
