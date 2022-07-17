import {LockClosedIcon} from "@heroicons/react/solid";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useLogin} from "../../apiService/userQueries";
import utilService from "../../utils/utils.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {mutate: login} = useLogin({onSuccess});

  function onSuccess(data) {
    utilService.loginUser(data);
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-light text-red-900">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
            </div>
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
