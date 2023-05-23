import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HiSelector } from 'react-icons/hi';

const DateRangePicker = (props) => {
  const {
    startDate,
    endDate,
    onChange
  } = props;
  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="relative w-full cursor-default rounded-lg bg-neutral-700 p-2 pl-3 pr-10 text-left border border-neutral-600 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300" 
      onClick={onClick} 
      ref={ref}
    >
      <span className="block truncate text-neutral-300">{value}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <HiSelector
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </button>
  ));

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DateRangePicker;