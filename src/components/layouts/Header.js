import {Fragment, useState} from "react";
import {Link} from "react-router-dom";

import {Menu, Popover, Transition} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";

import AuthService from "../../utils/auth.service";
import utilService from "../../utils/utils.service";
import Logout from "../accounts/Logout";

const user = AuthService.getUserInfo();
const avatar = user?.avatar | null;
const token = AuthService.getToken();
const userNavigation = [
  {name: "Suggested Recipes", to: "/suggested"},
  {name: "Favourites", to: "/favourites"},
  {name: "My Profile", to: "/my-profile"},
];

export default function Header() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Popover
        as="header"
        className={"bg-white shadow-sm lg:static lg:overflow-y-visible"}
      >
        {({open}) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <button
                      onClick={() => utilService.redirectTo("/")}
                      className="font-normal text-xl  text-red-700"
                    >
                      Delicious
                    </button>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6"></div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  {token && (
                    <Menu as="div" className="flex-shrink-0 relative ml-5">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              avatar
                                ? avatar
                                : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {userNavigation.map(item => (
                            <Menu.Item key={item.name}>
                              <button
                                onClick={() => utilService.redirectTo(item.to)}
                                className={
                                  "block py-2 px-4 text-sm text-gray-700"
                                }
                              >
                                {item.name}
                              </button>
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            <button
                              className="block py-2 px-4 text-sm text-gray-700"
                              onClick={() => setModal(true)}
                            >
                              Logout
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {!token && (
                    <Link
                      to="/login"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Sign in
                    </Link>
                  )}

                  {!token && (
                    <Link
                      to="/register"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Sign Up
                    </Link>
                  )}
                  {token && user.is_admin && (
                    <>
                      <Link
                        to="/recipe/create"
                        className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Create Recipe
                      </Link>
                      <Link
                        to="/ingredients"
                        className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Ingredients
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {!token && (
                  <button
                    onClick={() => utilService.redirectTo("/login")}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Sign in
                  </button>
                )}

                {!token && (
                  <button
                    onClick={() => utilService.redirectTo("/register")}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Sign Up
                  </button>
                )}
                {token && user.is_admin && (
                  <>
                    <Link
                      to="/recipe/create"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Create Recipe
                    </Link>
                    <Link
                      to="/ingredients"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Ingredients
                    </Link>
                  </>
                )}
              </div>
              {token && (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          avatar
                            ? avatar.avatar
                            : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user && user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user && user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                    {userNavigation.map(item => (
                      <button
                        onClick={() => utilService.redirectTo(`${item.to}`)}
                        key={item.name}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </button>
                    ))}
                    <button
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => setModal(true)}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
