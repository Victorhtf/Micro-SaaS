/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1d4ed8",
        "dark-primary-color": "#003366",
        "secondary-color": "#6b7280",
        "background-color": "#f9fafb",
        "text-color": "#374151",
        "hover-color": "#e5e7eb",
        "error-color": "#f87171",
        "success-color": "#34d399",
        "warning-color": "#fbbf24",
        "info-color": "#60a5fa",
        "border-color": "#d1d5db",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      const buttons = {
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.375rem",
          fontWeight: "500",
          textTransform: "uppercase",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid transparent",
        },
        ".btn-primary": {
          backgroundColor: "#1d4ed8",
          color: "#fff",
          borderColor: "#1d4ed8",
          "&:hover": {
            backgroundColor: "#003366",
            borderColor: "#003366",
          },
        },
        ".btn-secondary": {
          backgroundColor: "#6b7280",
          color: "#fff",
          borderColor: "#6b7280",
          "&:hover": {
            backgroundColor: "#4b5563",
            borderColor: "#4b5563",
          },
        },
        ".btn-outline": {
          backgroundColor: "transparent",
          color: "#374151",
          borderColor: "#d1d5db",
          "&:hover": {
            backgroundColor: "#e5e7eb",
          },
        },
      };

      addComponents(buttons);
    },
  ],
};
