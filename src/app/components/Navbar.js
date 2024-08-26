"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Drawer, notification, Dropdown, Menu } from "antd";
import CreateTaskForm from "./CreateTaskForm";

const Navbar = () => {
  const { isAuthenticated, handleLogout, user, getSessionDetails } = useContext(AuthContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    if (isAuthenticated) {
      setDrawerVisible(true);
    } else {
      notification.error({
        message: "Unauthorized",
        description: "You need to login to create a task",
      });
    }
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TaskZen
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={showDrawer}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Create Task
              </button>
            </li>
            {user ? (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    src={`https://robohash.org/${user?.username}.png?set=set4`} // Use a template literal to include the user's username
                    alt="User Logo"
                    className="w-8 h-8 rounded-full inline-block"
                  />
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {user?.username}
                  </span>
                </a>
              </Dropdown>
            ) : (
              <li>
                <Link
                  href="/auth/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Drawer for Create Task Form */}
      <Drawer
        title="Create Task"
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        width={700}
      >
        <CreateTaskForm onClose={onClose} />
      </Drawer>
    </nav>
  );
};

export default Navbar;
