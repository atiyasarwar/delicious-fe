import {ExclamationCircleIcon} from "@heroicons/react/outline";
import {PencilIcon} from "@heroicons/react/solid";
import {useState} from "react";
import {useUpdateUser} from "../../apiService/userQueries";
import {STORAGE_KEY} from "../../Constants/Storage";
import LocalStorageService from "../../services/local-storage.service";
import AuthService from "../../utils/auth.service";
import utilService from "../../utils/utils.service";
import Deactivate from "./Deactivate";

export default function Profile() {
  const user = AuthService.getUserInfo();
  const [name, setName] = useState(user?.name);
  const [weight, setWeight] = useState(user?.weight);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [height, setHeight] = useState(user?.height);

  const [modal, setModal] = useState(false);

  const {mutate: update} = useUpdateUser({
    onSuccess(data) {
      LocalStorageService.set(STORAGE_KEY.USER_INFO, JSON.stringify(data));
      alert("Success");
    },
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    const payload = {
      name,
      weight,
      gender,
      height,
      age,
    };
    update(payload);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-8" style={{width: "50%", margin: "auto"}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900 my-6">
              Update Profile
            </h2>
            <div className="mt-4  md:mt-0">
              <div className="flex items-center my-5">
                <label htmlFor="picture" className="relative cursor-pointer">
                  <img
                    className="h-16 w-16 rounded-full block"
                    src={
                      user && user?.avatar
                        ? user?.avatar
                        : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                    }
                    alt=""
                  />
                </label>
              </div>

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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Full Name"
                  onChange={e => setName(e.target.value)}
                  defaultValue={user?.name}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Email address"
                  disabled
                  defaultValue={user?.email}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Age"
                  onChange={e => setAge(e.target.value)}
                  defaultValue={user?.age}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Gender"
                  onChange={e => setGender(e.target.value)}
                  defaultValue={utilService.capitalizedString(user?.gender)}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Weight (in kg)"
                  onChange={e => setWeight(e.target.value)}
                  defaultValue={user?.weight}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Height (in meters)"
                  onChange={e => setHeight(e.target.value)}
                  defaultValue={user?.height}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center mt-2 ml-6 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            <PencilIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Update</span>
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setModal(true)}
          >
            <ExclamationCircleIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Deactivate
          </button>
        </div>
      </form>
      {modal && <Deactivate modal={modal} setModal={setModal} />}
    </>
  );
}
