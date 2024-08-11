import { Point } from "@/lib/types";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type DirectionsProps = {
  destination: Point;
  onClose: () => void;
};

function Directions({ destination, onClose }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionService, setDirectionService] =
    useState<google.maps.DirectionsService>();

  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionService(new routesLibrary.DirectionsService());
    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      polylineOptions: {
        strokeColor: "#FF0000", // Red color for the selected route
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
    });
    setDirectionsRenderer(renderer);
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionService || !directionsRenderer) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const destinationCoordinates = {
          lat: destination.coordinates.latitude,
          lng: destination.coordinates.longitude,
        };

        directionService
          .route({
            origin,
            destination: destinationCoordinates,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
          })
          .then((response) => {
            setRoutes(response.routes);
            // Render each route with its own color
            response.routes.forEach((route, index) => {
              const color = index === routeIndex ? "#FF0000" : `hsl(${(index + 1) * 30}, 70%, 70%)`; // Different colors for different routes
              const polyline = new google.maps.Polyline({
                path: route.overview_path,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 5,
                map,
              });
            });
            directionsRenderer.setDirections(response);
          });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, [directionService, directionsRenderer, destination, routeIndex]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 p-2 sm:p-3 rounded-lg shadow-lg z-50 max-w-xs sm:max-w-sm" style={{ width: '250px' }}>
      <div className="text-white text-sm sm:text-base">
        <h2 className="text-base sm:text-lg font-bold mb-1">{selected.summary}</h2>
        <p className="mb-1">
          {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
        </p>
        <p className="mb-1">Distance: {leg.distance?.text}</p>
        <p className="mb-3">Duration: {leg.duration?.text}</p>
        <h3 className="text-sm font-semibold mb-1">Other Routes</h3>
        <ul className="space-y-1">
          {routes.map((route, index) => (
            <li key={route.summary}>
              <button
                onClick={() => setRouteIndex(index)}
                className={`w-full text-left px-2 py-1 rounded-lg transition duration-200 
                  ${routeIndex === index
                    ? "bg-red-500 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-primary/80 hover:text-white"
                  }`}
              >
                {route.summary}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Directions;
