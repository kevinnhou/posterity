export const site = {
  author: {
    links: "https://github.com/kevinnhou",
    name: "Kevin Hou",
    tag: "@kevinnhou",
  },
  category: "SocialNetworkingApplication",
  datePublished: "21/04/2025",
  description:
    "Posterity brings productivity to life. Streamline tasks, plan together and grow within a connected community.",
  keywords: [],
  links: {
    repo: "https://github.com/kevinnhou/posterity",
    url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `http://${process.env.VERCEL_PROJECT_PRODUCTION_URL || "vercel.com"}`,
  },
  name: {
    default: "Posterity | Plan with Purpose, Shape your Future",
    short: "Posterity",
  },
  operatingSystem: "iOS, macOS, Linux, Android, Windows",
  rating: {
    bestRating: 5,
    ratingCount: 24,
    ratingValue: 4.7,
    worstRating: 4,
  },
  type: "SoftwareApplication",
}
