import { useEffect } from "react";
import siteMapJson from "../assets/siteMap.json";

const siteMap: SiteMap = siteMapJson as SiteMap;

function getNestedProperty(obj: SiteMap, path: string): string | undefined {
  const [category, subcategory] = path.split(" > ");
  const url = obj[category]?.[subcategory];
  return typeof url === "string" ? url : undefined;
}

const ShortcutListener = () => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the key setting interface is active
      if (document.activeElement?.tagName === "INPUT") {
        return; // Do not proceed if the user is currently typing in an input field (e.g., setting a shortcut key)
      }

      const storedShortcuts = localStorage.getItem("shortcuts");
      const shortcuts = storedShortcuts ? JSON.parse(storedShortcuts) : [];

      // Find a shortcut that matches the pressed key
      const shortcut = shortcuts.find(
        (s: Shortcut) => s.key === event.key.toUpperCase(),
      );
      if (shortcut) {
        // Go through siteMap.json and find the URL associated with the shortcut
        // The shortcut.destination is the key-path in siteMap.json
        // For example, if shortcut.destination is "Google > Search", the URL is siteMap.Google.Search
        // Make sure it's type safe

        const urlProperty = getNestedProperty(siteMap, shortcut.destination);

        if (!urlProperty) {
          // If the URL was not found in the siteMap, see if it's a custom URL
          if (shortcut.destination.startsWith("http")) {
            window.location.href = shortcut.destination;
            return;
          }
          alert(
            `Invalid destination for the "${shortcut.key}" shortcut. \n${shortcut.destination} is not a valid selection or URL.`,
          );
          return;
        }

        // Replace <baseUrl> in the URL with the actual base URL of the current window
        const baseUrl = window.location.origin;
        const finalUrl = urlProperty?.replace("<baseUrl>", baseUrl);

        // alert(`Navigating to: ${finalUrl}`); // Display a message for testing
        window.location.href = finalUrl; // Navigate to the URL associated with the shortcut
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return null; // This component does not render anything
};

export default ShortcutListener;
