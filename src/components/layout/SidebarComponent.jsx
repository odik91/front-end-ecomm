/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiUser,
  HiOutlineCog,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarComponent = ({ sidebarOpen, handleSidebarOpen }) => {
  const { currentNavigation } = useSelector((store) => store.users);
  const { parent, parent_link, current_page } = currentNavigation;

  const active_class =
    "focus:z-10 focus:outline-none text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 focus:ring-2";

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen
          ? "sm:translate-x-0 transform-none"
          : "-translate-x-full sm:translate-x-0"
      } `}
    >
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Logo
              href="#"
              img="https://flowbite.com/docs/images/logo.svg"
              imgAlt="Flowbite logo"
            >
              Admin Shop
            </Sidebar.Logo>
            <li>
              <Link
                onClick={() => handleSidebarOpen(!sidebarOpen)}
                to={""}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                  current_page === "dashboard"
                    ? active_class
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <HiChartPie className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <Sidebar.Collapse
              icon={HiOutlineCog}
              label="Pengaturan"
              open={parent === "pengaturan"}
            >
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/category"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "kategori"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Kategori
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/subcategory"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "subkategori"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Subkategori
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/color"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "warna"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Warna
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/size"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "ukuran"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Ukuran
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/unit"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "satuan"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Satuan
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/province"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "provinsi"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Provinsi
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/city"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "kabupaten-kota"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Kabupaten-Kota
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  to={"/setting/sale"}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "penjualan"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Penjualan
                  </span>
                </Link>
              </li>
            </Sidebar.Collapse>

            <Sidebar.Collapse
              icon={HiOutlineShoppingCart}
              label="Toko"
              open={parent === "toko"}
            >
              <li>
                <Link
                  to={"/shop/product"}
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 group w-full pl-8 transition duration-75 ${
                    current_page === "produk"
                      ? active_class
                      : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Produk
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75"
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Pesanan
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleSidebarOpen(!sidebarOpen)}
                  className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75"
                >
                  <span
                    data-testid="flowbite-sidebar-item-content"
                    className="px-3 flex-1 whitespace-nowrap"
                  >
                    Ulasan Produk
                  </span>
                </Link>
              </li>
            </Sidebar.Collapse>
            <li>
              <Link
                onClick={() => handleSidebarOpen(!sidebarOpen)}
                to={"/user"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiUser className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="ms-3">Pengguna</span>
              </Link>
            </li>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  );
};

export default SidebarComponent;
