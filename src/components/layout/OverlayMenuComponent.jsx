/* eslint-disable react/prop-types */
const OverlayMenuComponent = ({ handleSidebarOpen, sidebarOpen }) => {
  return (
    <div
      className={`sm:hidden bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30 ${
        sidebarOpen ? "" : "hidden"
      }`}
      onClick={handleSidebarOpen}
    ></div>
  );
};
export default OverlayMenuComponent;
