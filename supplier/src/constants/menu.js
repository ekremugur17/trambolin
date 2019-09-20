const data = [
  {
    id: "Home Page",
    icon: "iconsminds-home-3",
    label: "Home Page",
    to: "/app/welcome",
  },
  {
    id: "Codes",
    icon: "iconsminds-qr-code",
    label: "Codes",
    to: "/app/codes",
    subs: [
      {
        icon: "iconsminds-add-user",
        label: "Add Discount Code",
        to: "/app/codes/discountCode"
      },
      {
        icon: "iconsminds-add-user",
        label: "Add Gift Code",
        to: "/app/codes/giftCode"
      }
    ]
  },
  {
    id: "Finances",
    icon: "iconsminds-credit-card-3",
    label: "Finances",
    to: "/app/finances"
  }
];
export default data;
