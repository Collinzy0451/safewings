import React, { useState } from "react";
import { Search } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  isLoading?: boolean;
}

const TrackingForm: React.FC<TrackingFormProps> = ({
  onTrack,
  isLoading = false,
}) => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim();
    if (trimmed) {
      onTrack(trimmed);
      console.log(trimmed)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number..."
          className="flex-1 text-black px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default TrackingForm;
