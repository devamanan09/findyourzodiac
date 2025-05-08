import React, { useState, useEffect, useRef } from 'react';
import { getPanchangamDetails } from './astroApi'; // Adjust path based on your file structure

const BirthDetailsForm = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const markerRef = useRef(null);

  // ✅ Load Google Maps Script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // ✅ Initialize Map and Autocomplete
  useEffect(() => {
    if (scriptLoaded && inputRef.current && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
        zoom: 4,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#212121' }] },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
          { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#758C8C' }] },
          { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#2c3e50' }] }
        ]
      });

      map.addListener('click', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCoordinates({ lat, lng });

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
      });

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCoordinates({ lat, lng });

          map.setCenter({ lat, lng });
          map.setZoom(10);

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          markerRef.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
          });
        }
      });
    }
  }, [scriptLoaded]);

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!birthDate || !birthTime || coordinates.lat === null) {
      alert('Please fill all fields and select a location.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const place = `${coordinates.lat},${coordinates.lng}`;
      const data = await getPanchangamDetails({
        date: birthDate,
        time: birthTime,
        place,
      });

      setResult(data);
    } catch (error) {
      console.error('Error fetching Panchangam:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-4xl px-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">Enter Your Birth Details</h2>

          <div className="mb-6">
            <label htmlFor="birthDate" className="block text-lg font-semibold text-gray-800 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="birthTime" className="block text-lg font-semibold text-gray-800 mb-2">
              Birth Time
            </label>
            <input
              type="time"
              id="birthTime"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="birthplace" className="block text-lg font-semibold text-gray-800 mb-2">
              Birthplace
            </label>
            <input
              ref={inputRef}
              type="text"
              id="birthplace"
              placeholder="Type your city or use the map below"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Or manually pin your birthplace on the map:</p>
            <div
              ref={mapRef}
              id="map"
              style={{ height: '400px' }}
              className="border rounded-lg"
            ></div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Panchangam'}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Panchangam Result</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BirthDetailsForm;
