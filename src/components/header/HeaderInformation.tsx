import { useRestaurant } from "@/hooks/useRestaurant";
import HeaderButtons from "@/components/header/HeaderButtons";

const HeaderInformation = () => {

    const { restaurant } = useRestaurant();

    return (
        <div className="px-2 flex flex-col gap-2">
            <h1 className="font-bold">{restaurant?.name}</h1>
            {restaurant?.slogan && (
                <p className="text-sm italic">{restaurant?.slogan}</p>
            )}
            <HeaderButtons />
        </div>
    )
}

export default HeaderInformation