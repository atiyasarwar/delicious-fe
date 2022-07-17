import {MinusIcon, PlusIcon} from "@heroicons/react/solid";
import {createRef, useState} from "react";

export default function Procedure({setFormValues}) {
  let textInput = createRef();

  const [procedures, setProcedures] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    const value = textInput.current.value;
    if (!procedures.includes(value)) {
      setProcedures(e => [...e, value]);
    } else {
      alert("Item already exists");
    }
    setFormValues(e => [...e, value]);
    setInputValue("");
  };

  const handleXClick = procedure => {
    setProcedures(procedures.filter(x => x !== procedure));
    setFormValues(procedures.filter(x => x !== procedure));
  };

  return (
    <>
      <main>
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Procedures
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the procedures to create your new recipe.
            </p>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex">
                <div className="flex-grow">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Fill in your procedure step by step and add..."
                    ref={textInput}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                </div>
                <div className="ml-3">
                  <button
                    type="button"
                    className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    onClick={handleClick}
                  >
                    <PlusIcon
                      className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200">
              <ul className="divide-y divide-gray-200">
                {procedures.map((procedure, index) => (
                  <li key={procedure} className="py-4 flex">
                    <div className="ml-3 flex flex-grow justify-between">
                      <div>
                        <span className="text-base font-medium text-gray-900">
                          {index + 1}
                          {" - "}
                        </span>
                        <span className="text-base font-medium text-gray-900">
                          {procedure}
                        </span>
                      </div>

                      <div className="">
                        <button
                          type="button"
                          className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          onClick={() => handleXClick(procedure)}
                        >
                          <MinusIcon
                            className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
