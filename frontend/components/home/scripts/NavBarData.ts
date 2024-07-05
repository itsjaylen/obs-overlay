export const items1 = [
  { title: "Link 1 Item 1", link: "/#" },
  { title: "Link 1 Item 2", link: "/#" },
  { title: "Link 1 Item 3", link: "/#" },
  { title: "Link 1 Item 4", link: "/#" },
];

export const items2 = [
  { title: "Link 2 Item 1", link: "/#" },
  { title: "Link 2 Item 2", link: "/#" },
  { title: "Link 2 Item 3", link: "/#" },
  { title: "Link 2 Item 4", link: "/#" },
];

export const items3 = [
  { title: "About", link: "/about" },
  { title: "Link 3 Item 2", link: "/#" },
  { title: "Link 3 Item 3", link: "/#" },
  { title: "Link 3 Item 4", link: "/#" },
];

export function handleItemClick(item: { title: string; link: string }) {
  console.log("Clicked on:", item.title);
  window.open(item.link, "_blank");
}

export function menuCloseDelay(
  menuNumber: number,
  setMenuOpen: (menuNumber: number, isOpen: boolean) => void,
  mouseLeaveTimeout: number | NodeJS.Timeout | null,
  setMouseLeaveTimeout: (timeout: number | NodeJS.Timeout | null) => void
) {
  if (mouseLeaveTimeout) {
    clearTimeout(mouseLeaveTimeout as number); 
  }
  const timeout = setTimeout(() => {
    setMenuOpen(menuNumber, false);
  }, 300);
  setMouseLeaveTimeout(timeout);
}
