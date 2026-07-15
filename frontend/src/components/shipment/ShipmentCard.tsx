
import React, { ReactNode } from 'react';
import { Package, Calendar, MapPin, Clock } from 'lucide-react';

interface Shipment {
  delivery_date: string | number | Date;
  created_at: string | number | Date;
  tracking_number: ReactNode;
  id: string;
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  origin: string;
  destination: string;
  createdAt: string;
  estimatedDelivery: string;
}

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: () => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment, onClick }) => {
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'picked_up':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'in_transit':
  //       return 'bg-purple-100 text-purple-800';
  //     case 'delivered':
  //       return 'bg-green-100 text-green-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };
  const getStatusColor = (status: string) => {
     switch (status) {
    
    case "pending":
      return "bg-gray-100 text-gray-700";

    case "in_transit":
      return "bg-yellow-100 text-yellow-800";

    case "inactive":
      return "bg-yellow-100 text-yellow-800";

    case "on_hold":
      return "bg-red-100 text-red-700";

    case "out_for_delivery":
      return "bg-green-100 text-green-700";

    case "delivered":
      return "bg-green-500 text-green-900";

    case "active":
      return "bg-green-300 text-green-800";

    case "cancelled":
      return "bg-red-300 text-red-900";

    default:
      return "bg-gray-200 text-gray-800";
  }
  };

  const getStatusText = (status: string) => {
    return status.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-900">{shipment.tracking_number}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
              {getStatusText(shipment.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{shipment.origin} → {shipment.destination}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Created: <strong>{new Date(shipment.created_at).toLocaleDateString()}</strong></span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Est. Delivery: <strong>{new Date(shipment.delivery_date).toLocaleDateString()}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
