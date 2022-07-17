import {LockClosedIcon} from "@heroicons/react/solid";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useRegister} from "../../apiService/userQueries";
import "../../App.css";
import utilService from "../../utils/utils.service";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const {mutate: register} = useRegister({onSuccess});

  function onSuccess(data) {
    alert("Account created successfully! Login to continue");
    utilService.redirectTo("/login");
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    register({
      name,
      email,
      weight,
      gender,
      height,
      age,
      password,
      password2,
    });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-light text-red-900">Register</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={e => setName(e.target.value)}
              />
            </div>
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
              <label htmlFor="name" className="sr-only">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                autoComplete="age"
                step="0.01"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Age"
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Gender
              </label>
              <input
                id="gender"
                name="gender"
                type="text"
                autoComplete="gender"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Gender"
                onChange={e => setGender(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Weight
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                autoComplete="weight"
                step="0.01"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Weight (in kg)"
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Height
              </label>
              <input
                id="height"
                name="height"
                type="number"
                autoComplete="height"
                step="0.01"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Height (in meters)"
                onChange={e => setHeight(e.target.value)}
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
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={e => setPassword2(e.target.value)}
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
                Register
              </button>
            </div>
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
