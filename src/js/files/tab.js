export default function tab() {
  const buttons = document.querySelectorAll("[data-tab-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest(".tabs");
        const tabId = btn.dataset.tabBtn;
        const allButtons = container
          .querySelector(".tabs-nav")
          .querySelectorAll("[data-tab-btn]");
        const allTabs = Array.from(
          container.querySelector(".tabs-content").children,
        ).filter((child) => child.hasAttribute("data-tab"));
        const containerAddedTabs = container.querySelector(
          ".tabs-content-added",
        );

        const currentTab = container.querySelector(
          `.tabs-content [data-tab="${tabId}"]`,
        );

        allTabs.forEach((t) => {
          t.classList.remove("_show");
          t.classList.remove("_active");
        });

        currentTab.classList.add("_active");
        setTimeout(() => {
          currentTab.classList.add("_show");
        }, 150);

        allButtons.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");

        if (containerAddedTabs) {
          const addedTabs = Array.from(containerAddedTabs.children).filter(
            (child) => child.hasAttribute("data-tab"),
          );
          const currentTabAdded = container.querySelector(
            `.tabs-content-added [data-tab="${tabId}"]`,
          );
          addedTabs.forEach((t) => {
            t.classList.remove("_show");
            t.classList.remove("_active");
          });
          currentTabAdded.classList.add("_active");
          setTimeout(() => {
            currentTabAdded.classList.add("_show");
          }, 150);
        }
      });
    });
  }
}
