document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    // Close other open accordions (optional)
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null;
        item.classList.remove("active");
      }
    });

    // Toggle the current accordion
    if (content.classList.contains("active")) {
      content.style.maxHeight = null; // Collapse
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // Expand
    }
    content.classList.toggle("active");
  });
});
