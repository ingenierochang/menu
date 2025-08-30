import { useRestaurant } from "@/hooks/useRestaurant";
import React from "react";

const MoreInfoFold = () => {
  const { restaurant } = useRestaurant();

  return (
    <div className="grid gap-2">
      {restaurant?.open_hours && (
        <div>
          <p className="font-semibold">Horarios</p>
          <pre className="font-poppins">{restaurant.open_hours}</pre>
        </div>
      )}

      {restaurant?.payment_methods && (
        <div>
          <p className="font-semibold">Métodos de pago</p>
          <pre className="font-poppins">{restaurant.payment_methods}</pre>
        </div>
      )}

      {restaurant?.parking && (
        <div>
          <p className="font-semibold">Estacionamiento</p>
          {restaurant.parking}
        </div>
      )}

      {restaurant?.alcohol_patents && (
        <div>
          <p className="font-semibold">Patentes de alcohol</p>
          {restaurant.alcohol_patents}
        </div>
      )}

      {restaurant?.website && (
        <div>
          <p className="font-semibold">Sitio web</p>
          <a href={"https://" + restaurant.website} className="text-blue-600">
            {restaurant.website}
          </a>
        </div>
      )}
    </div>
  );
};

export default MoreInfoFold;
