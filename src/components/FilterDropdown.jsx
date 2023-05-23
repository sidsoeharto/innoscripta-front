import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { HiSelector, HiCheck } from 'react-icons/hi';

const FilterDropdown = (props) => {
  const { 
    categories, 
    category, 
    setCategory 
  } = props;
   
  return (
    <Listbox value={category} onChange={setCategory} className="items-center justify-center">
      <div className="relative w-full">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-neutral-700 p-2 pl-3 pr-10 text-left border border-neutral-600 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate text-neutral-300">{category.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <HiSelector
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
          />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-72 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {
            categories.map((el, idx) => (
              <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                  }
                  value={el}
              >
              {({ selected }) => (
                  <>
                      <span
                          className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                          {el.name}
                      </span>
                      {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                      ) : null}
                  </>
              )}
              </Listbox.Option>
            ))
          }
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
};

export default FilterDropdown;