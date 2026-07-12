/** Smooth-scroll to a section on the current page. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Scroll to the hero on the home page. */
export function goToHome() {
  if (window.location.pathname === "/") {
    scrollToSection("home");
    return;
  }
  window.location.href = "/#home";
}

/** Home page section anchor — works from any route. */
export function sectionHref(id: string) {
  return `/#${id}` as const;
}

/** Scroll on home, or navigate to home section from other routes. */
export function goToSection(id: string) {
  if (window.location.pathname === "/") {
    scrollToSection(id);
    return;
  }
  window.location.href = sectionHref(id);
}
