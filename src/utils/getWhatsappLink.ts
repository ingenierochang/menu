export const getWhatsappLink = (phone: number) => {
  const PREFIX = "https://wa.me/";

  return PREFIX + phone;
};
