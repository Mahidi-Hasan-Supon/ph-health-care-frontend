
const prefix = "/admin"

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "overview",
        url: `${prefix}`,
      },
      {
        title: "Doctor approval",
        url: `${prefix}/doctor-approve`,
      },
    ],
  },
  {
    title: "App routing",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
      {
        title: "Rendering",
        url: "#",
      },
      {
        title: "Caching",
        url: "#",
      },
    ],
  },
];
