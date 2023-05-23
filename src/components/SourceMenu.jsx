import {Fragment} from 'react';
import { Menu, Transition } from '@headlessui/react'
import { HiSelector } from 'react-icons/hi';

const SourceMenu = () => {
  return (
    <Menu as="div" className="items-center justify-center mr-1 lg:mr-3">
      <div className='relative'>
        <Menu.Button className="relative w-full cursor-default rounded-lg text-black bg-gray-50 p-2 pl-3 pr-10 text-left border border-gray-300 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate text-gray-700">Source</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiSelector
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Menu.Items 
            as="div"
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
              <Menu.Item>
                <div>
                Test
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
};

export default SourceMenu;