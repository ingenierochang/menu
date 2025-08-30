import { useRestaurant } from "@/hooks/useRestaurant";
import { useRestaurantScreen } from "@/hooks/useRestaurantScreen";
import { getWhatsappLink } from "@/utils/getWhatsappLink";
import clsx from "clsx";

type ActionButtonProps = {
  iconClassName: string;
  onClick?: () => void;
};

const ActionButton = ({ iconClassName, onClick }: ActionButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="border border-stone-500 rounded-full size-8 aspect-square flex justify-center items-center"
    >
      <i
        className={clsx("flex justify-center items-center", iconClassName)}
      ></i>
    </div>
  );
};

function HeaderButtons() {
  const { restaurant } = useRestaurant();

  const { showRestaurantScreen } = useRestaurantScreen();

  if (!restaurant) return;

  const goToWhatsapp = () => {
    if (restaurant.whatsapp) {
      window.location.href = getWhatsappLink(restaurant.whatsapp);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareUrl = `${window.location.origin}/${restaurant.slug}/clusters`;
        await navigator.share({
          title: "Menu digital de " + restaurant.name,
          text: "Mira nuestro menú digital.",
          url: shareUrl,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="flex gap-2">
      <ActionButton
        onClick={() => showRestaurantScreen(restaurant)}
        iconClassName="bi bi-info text-[19px]"
      />

      <ActionButton
        onClick={handleShare}
        iconClassName="bi bi-share text-[13px]"
      />

      {restaurant.whatsapp && (
        <ActionButton
          onClick={goToWhatsapp}
          iconClassName="bi bi-whatsapp text-[13px]"
        />
      )}
    </div>
  );
}

export default HeaderButtons;
