import { useRef, useState } from "react";
import { MapView } from "./Map";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceArea {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  radius: number; // in meters
  color: string;
  description: string;
}

const serviceAreas: ServiceArea[] = [
  {
    id: "birmingham",
    name: "Birmingham",
    position: { lat: 52.4862, lng: -1.8904 },
    radius: 15000, // 15km radius
    color: "#2C5F7F",
    description: "Central Birmingham & surrounding industrial areas"
  },
  {
    id: "wolverhampton",
    name: "Wolverhampton",
    position: { lat: 52.5870, lng: -2.1288 },
    radius: 12000, // 12km radius
    color: "#1a3d52",
    description: "Wolverhampton & the Black Country"
  },
  {
    id: "west-midlands",
    name: "West Midlands",
    position: { lat: 52.4751, lng: -1.8298 },
    radius: 35000, // 35km radius - covers the whole region
    color: "#d4a853",
    description: "Full West Midlands regional coverage"
  }
];

// Additional specific locations we serve
const serviceLocations = [
  { name: "Digbeth", position: { lat: 52.4750, lng: -1.8820 } },
  { name: "Longbridge", position: { lat: 52.3960, lng: -1.9780 } },
  { name: "Tyseley", position: { lat: 52.4580, lng: -1.8480 } },
  { name: "Coventry", position: { lat: 52.4068, lng: -1.5197 } },
  { name: "Dudley", position: { lat: 52.5086, lng: -2.0872 } },
  { name: "Walsall", position: { lat: 52.5860, lng: -1.9829 } },
  { name: "West Bromwich", position: { lat: 52.5190, lng: -1.9945 } },
  { name: "Solihull", position: { lat: 52.4130, lng: -1.7780 } },
  { name: "Bilston", position: { lat: 52.5660, lng: -2.0730 } },
  { name: "Willenhall", position: { lat: 52.5850, lng: -2.0580 } },
];

interface ServiceAreasMapProps {
  onAreaClick?: (areaId: string) => void;
  onQuoteClick?: () => void;
}

export function ServiceAreasMap({ onAreaClick, onQuoteClick }: ServiceAreasMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    setIsMapLoaded(true);

    // Add coverage circles for each service area
    serviceAreas.forEach((area) => {
      // Create coverage circle
      const circle = new google.maps.Circle({
        map,
        center: area.position,
        radius: area.radius,
        fillColor: area.color,
        fillOpacity: area.id === "west-midlands" ? 0.1 : 0.2,
        strokeColor: area.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: true,
      });

      // Add click listener to circle
      circle.addListener("click", () => {
        setSelectedArea(area);
        map.panTo(area.position);
        if (onAreaClick) {
          onAreaClick(area.id);
        }
      });
    });

    // Add markers for main service areas
    serviceAreas.filter(a => a.id !== "west-midlands").forEach((area) => {
      const markerContent = document.createElement("div");
      markerContent.innerHTML = `
        <div style="
          background: ${area.color};
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${area.name}
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: area.position,
        content: markerContent,
        title: area.name,
      });

      marker.addListener("click", () => {
        setSelectedArea(area);
        map.panTo(area.position);
        map.setZoom(11);
        if (onAreaClick) {
          onAreaClick(area.id);
        }
      });
    });

    // Add smaller markers for specific locations
    serviceLocations.forEach((location) => {
      const smallMarker = document.createElement("div");
      smallMarker.innerHTML = `
        <div style="
          background: white;
          border: 2px solid #2C5F7F;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        "></div>
      `;

      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: location.position,
        content: smallMarker,
        title: location.name,
      });
    });

    // Add company HQ marker
    const hqContent = document.createElement("div");
    hqContent.innerHTML = `
      <div style="
        background: #d4a853;
        color: #1a3d52;
        padding: 10px 14px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        border: 2px solid #1a3d52;
      ">
        🏭 CSB HQ
      </div>
    `;

    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 52.5200, lng: -2.0500 }, // Approximate HQ location
      content: hqContent,
      title: "Commercial Shot Blasting HQ",
    });
  };

  const handleZoomToArea = (area: ServiceArea) => {
    if (mapRef.current) {
      mapRef.current.panTo(area.position);
      mapRef.current.setZoom(area.id === "west-midlands" ? 9 : 11);
      setSelectedArea(area);
      if (onAreaClick) {
        onAreaClick(area.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
        <MapView
          className="h-[500px] md:h-[600px]"
          initialCenter={{ lat: 52.4862, lng: -1.9500 }}
          initialZoom={9}
          onMapReady={handleMapReady}
        />
        
        {/* Loading overlay */}
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-[#1a3d52] flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p>Loading map...</p>
            </div>
          </div>
        )}

        {/* Selected Area Info Card */}
        {selectedArea && (
          <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedArea.color }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a3d52]">{selectedArea.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedArea.description}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#2C5F7F] hover:bg-[#1a3d52] text-xs"
                      onClick={onQuoteClick}
                    >
                      Get Quote
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      asChild
                    >
                      <a href={`#${selectedArea.id}`}>
                        View Details
                      </a>
                    </Button>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArea(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Area Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceAreas.filter(a => a.id !== "west-midlands").map((area) => (
          <button
            key={area.id}
            onClick={() => handleZoomToArea(area)}
            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition group text-left"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition"
              style={{ backgroundColor: area.color }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1a3d52] group-hover:text-[#2C5F7F] transition">
                {area.name}
              </h4>
              <p className="text-sm text-gray-500">Click to view on map</p>
            </div>
          </button>
        ))}
        <button
          onClick={() => handleZoomToArea(serviceAreas.find(a => a.id === "west-midlands")!)}
          className="flex items-center gap-3 p-4 bg-[#d4a853]/10 border-2 border-[#d4a853] rounded-lg hover:bg-[#d4a853]/20 transition group text-left"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#d4a853] group-hover:scale-110 transition">
            <MapPin className="w-6 h-6 text-[#1a3d52]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1a3d52] group-hover:text-[#2C5F7F] transition">
              Full Region
            </h4>
            <p className="text-sm text-gray-500">View all coverage</p>
          </div>
        </button>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#1a3d52] rounded-xl p-6 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">Not sure if we cover your area?</h3>
        <p className="text-white/70 mb-4">Give us a call and we'll confirm coverage for your location.</p>
        <Button 
          className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
          asChild
        >
          <a href="tel:07970566409">
            <Phone className="w-4 h-4 mr-2" />
            Call 07970 566409
          </a>
        </Button>
      </div>
    </div>
  );
}
