import { useMemo } from "react";
import { getTextColorBg } from "@/utils/getTextColorForBg";

export const useRestaurantTheme = (mainColor?: string) => {
  const buttonStyles = useMemo(() => {
    if (!mainColor)
      return {
        color: "white",
        backgroundColor: "black",
      };
    const textColor = getTextColorBg(mainColor);
    return {
      color: textColor,
      backgroundColor: mainColor,
    };
  }, [mainColor]);

  return { buttonStyles };
};
