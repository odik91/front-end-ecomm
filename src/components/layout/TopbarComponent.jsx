import PropTypes from "prop-types";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { HiBell, HiArrowsPointingOut, HiMiniEnvelope } from "react-icons/hi2";
import { ReactReduxContext, useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { useContext } from "react";

const TopbarComponent = ({ handleSidebarOpen }) => {
  const { store } = useContext(ReactReduxContext);
  const { users } = store.getState("users");
  const { name, email } = users.user;
  const dispatch = useDispatch();

  return (
    <Navbar fluid rounded className="bg-slate-100">
      <Navbar.Brand href="#">
        <button
          type="button"
          className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={handleSidebarOpen}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6 sm:hidden"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9 sm:hidden"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:hidden">
          Admin Shop
        </span>
      </Navbar.Brand>
      {/* <Navbar.Toggle /> */}
      <div className="flex items-center md:order-2">
        <button
          type="button"
          className="me-1 h-8 w-8 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <HiMiniEnvelope />
        </button>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <span className="me-1 h-8 w-8 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
              <HiBell />
            </span>
          }
        >
          <Dropdown.Item>Notification 1</Dropdown.Item>
          <Dropdown.Item>Notification 2</Dropdown.Item>
        </Dropdown>
        <button
          type="button"
          className="me-1 h-8 w-8 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <HiArrowsPointingOut />
        </button>
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <>
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
                size="sm"
              />
              <span className="ps-1 capitalize">{name}</span>
            </>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm capitalize">{name}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => dispatch(logoutUser())}>
            Keluar
          </Dropdown.Item>
        </Dropdown>
        {/* <Navbar.Toggle /> */}
      </div>
    </Navbar>
  );
};

TopbarComponent.propTypes = {
  handleSidebarOpen: PropTypes.func,
};

export default TopbarComponent;
