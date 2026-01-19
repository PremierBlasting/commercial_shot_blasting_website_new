import { MapView } from "./Map";

interface LocationMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

export function LocationMap({ lat, lng, locationName }: LocationMapProps) {
  const handleMapReady = (map: google.maps.Map) => {
    // Add marker for the location
    new google.maps.Marker({
      position: { lat, lng },
      map,
      title: `Commercial Shot Blasting - ${locationName}`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#d4a853',
        fillOpacity: 1,
        strokeColor: '#2C5F7F',
        strokeWeight: 3,
      },
    });

    // Add service area circle (approximately 25 mile radius)
    new google.maps.Circle({
      map,
      center: { lat, lng },
      radius: 40000, // 40km ≈ 25 miles
      fillColor: '#2C5F7F',
      fillOpacity: 0.1,
      strokeColor: '#2C5F7F',
      strokeOpacity: 0.3,
      strokeWeight: 2,
    });
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapView
        center={{ lat, lng }}
        zoom={11}
        onMapReady={handleMapReady}
        styles={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ]}
      />
    </div>
  );
}
