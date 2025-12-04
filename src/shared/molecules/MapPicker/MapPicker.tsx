"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Text, Input } from "@/shared/atoms";
import { ButtonVariant, ButtonSize, TextElement, TextSize, TextWeight, TextColor } from "@/shared/types/enums";
import { X, MapPin, Search } from "lucide-react";

export interface MapPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (latitude: number, longitude: number) => void;
  initialLocation?: {
    lat: number;
    lng: number;
  } | null;
}

export function MapPicker({ isOpen, onClose, onLocationSelect, initialLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation || null);
  const [searchResults, setSearchResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const defaultCenter = initialLocation || { lat: 36.8065, lng: 10.1815 }; // Tunis

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = mapInstance;

      // Add click listener to map
      mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setSelectedLocation({ lat, lng });
          
          // Remove old marker
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // Add new marker
          markerRef.current = new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
          });
        }
      });

      // Add initial marker if location provided
      if (initialLocation) {
        markerRef.current = new google.maps.Marker({
          position: initialLocation,
          map: mapInstance,
        });
      }

      // Mark map as loaded
      setIsMapLoaded(true);
    };

    loadGoogleMaps();
  }, [isOpen, initialLocation]);

  const placeMarker = (lat: number, lng: number) => {
    if (!mapInstanceRef.current) return;

    // Remove old marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Add new marker
    markerRef.current = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
    });

    // Center map on marker
    mapInstanceRef.current.setCenter({ lat, lng });
    setSelectedLocation({ lat, lng });
  };

  const handleSearch = () => {
    const query = searchInputRef.current?.value;
    if (!query || !mapInstanceRef.current) return;

    // Check if Google Maps Places API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    const service = new google.maps.places.PlacesService(mapInstanceRef.current);
    const request = {
      query,
      fields: ["name", "geometry", "formatted_address"],
    };

    service.textSearch(request, (results, status) => {
      setIsSearching(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setSearchResults(results);
      } else {
      }
    });
  };

  const handleSelectResult = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      placeMarker(lat, lng);
      setSearchResults([]);
      if (searchInputRef.current) {
        searchInputRef.current.value = place.name || "";
      }
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-xl w-[90vw] h-[90vh] max-w-5xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <Text as={TextElement.H2} size={TextSize.Large} weight={TextWeight.Semibold}>
              Select Location
            </Text>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="p-4">
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={searchInputRef}
                placeholder="Search for a location (e.g., restaurant name, address, city)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full"
              />
            </div>
            <Button
              type="button"
              onClick={handleSearch}
              variant={ButtonVariant.Primary}
              size={ButtonSize.Medium}
              disabled={isSearching || !isMapLoaded}
              className="gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              {!isMapLoaded ? "Loading..." : isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-white rounded-lg border shadow-sm max-h-48 overflow-y-auto">
              {searchResults.map((place, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectResult(place)}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Text size={TextSize.Small} weight={TextWeight.Medium} className="truncate">
                        {place.name}
                      </Text>
                      {place.formatted_address && (
                        <Text size={TextSize.ExtraSmall} color={TextColor.Muted} className="truncate">
                          {place.formatted_address}
                        </Text>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end p-4 border-t gap-3">

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Medium}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              variant={ButtonVariant.Primary}
              size={ButtonSize.Medium}
              disabled={!selectedLocation}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
