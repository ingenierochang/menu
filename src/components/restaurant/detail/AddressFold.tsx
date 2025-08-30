import { useRestaurant } from "@/hooks/useRestaurant";
import React from "react";

const AddressFold = () => {
  const { restaurant } = useRestaurant();

  return (
    <div className="grid gap-3 pb-3 border-b">
      <div>
        <p className="font-semibold">Dirección</p>
        <p>{restaurant?.address}</p>
      </div>

      <div className="">
        <p className="font-semibold mb-1">Google Maps</p>
        <div className="h-60 w-full bg-gray-200 border-gray-300">
          <iframe
            src={restaurant?.address_url}
            width="100%"
            height="100%"
            style={{
              border: "0",
            }}
            allowFullScreen={undefined}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AddressFold;
