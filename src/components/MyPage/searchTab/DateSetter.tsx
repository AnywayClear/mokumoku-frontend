import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useRecoilState } from 'recoil';

const dateStateArr: string[] = ['하루전', '한달전', '일년전'];

type chipStyleType = {
  on: string;
  off: string;
  common: string;
  hover: string;
};

const chipStyle: chipStyleType = {
  on: 'text-green-500 border-green-500 border-[3px] px-[9px] py-[2px] ',
  off: 'text-neutral-400 border-neutral-300 border-2 px-[10px] py-[3px] ',
  common: 'bg-white rounded-full font-semibold h-fit ',
  hover:
    'hover:text-green-500 hover:border-green-500 hover:border-[3px] hover:px-[9px] hover:py-[2px] ',
};

function processDate(dateStr: string | null) {
  if (!dateStr) {
    return null;
  } else {
    return dayjs(dateStr);
  }
}

export default function DateSetter() {
  const [{ startDateStr, endDateStr, dateState }, setStatus] =
    useRecoilState<searchType>(searchState);

  function changeStartDate(newDate: Dayjs | null) {
    let endDate = processDate(endDateStr);
    let chkNewDate: string | null = null;

    if (newDate !== null) {
      chkNewDate = newDate.isAfter(dayjs())
        ? dayjs().toString()
        : newDate.toString();
    }

    setStatus((current) => ({ ...current, startDateStr: chkNewDate }));

    if (endDate !== null) {
      if (endDate.isBefore(newDate)) {
        setStatus((current) => ({ ...current, endDateStr: chkNewDate }));
      }

      setStatus((current) => ({ ...current, dateState: -1 }));

      if (endDate.diff(dayjs(), 'day') == 0) {
        if (endDate.diff(newDate, 'day') === 1) {
          setStatus((current) => ({ ...current, dateState: 0 }));
        } else if (endDate.diff(newDate, 'day') === 30) {
          setStatus((current) => ({ ...current, dateState: 1 }));
        } else if (endDate.diff(newDate, 'day') === 365) {
          setStatus((current) => ({ ...current, dateState: 2 }));
        }
      }
    }
  }

  function changeEndDate(newDate: Dayjs | null) {
    let endDate = processDate(endDateStr);
    let startDate = processDate(startDateStr);
    let chkNewDate: string | null = null;

    if (newDate !== null) {
      chkNewDate = newDate.isAfter(dayjs())
        ? dayjs().toString()
        : newDate.toString();
    }

    setStatus((current) => ({ ...current, endDateStr: chkNewDate }));

    if (startDate !== null) {
      if (startDate?.isAfter(newDate)) {
        setStatus((current) => ({ ...current, startDateStr: chkNewDate }));
      }

      setStatus((current) => ({ ...current, dateState: -1 }));

      if (newDate !== null && newDate.diff(dayjs(), 'day') == 0) {
        if (newDate.diff(startDate, 'day') === 1) {
          setStatus((current) => ({ ...current, dateState: 0 }));
        } else if (newDate.diff(startDate, 'day') === 30) {
          setStatus((current) => ({ ...current, dateState: 1 }));
        } else if (newDate.diff(startDate, 'day') === 365) {
          setStatus((current) => ({ ...current, dateState: 2 }));
        }
      }
    }
  }

  function changeDateState(num: number) {
    if (num == dateState) {
      setStatus((current) => ({ ...current, dateState: null }));
      setStatus((current) => ({ ...current, startDateStr: null }));
      setStatus((current) => ({ ...current, endDateStr: null }));
    } else {
      setStatus((current) => ({ ...current, dateState: num }));
      setStatus((current) => ({ ...current, endDateStr: dayjs().toString() }));

      if (num === 0) {
        setStatus((current) => ({
          ...current,
          startDateStr: dayjs().subtract(1, 'day').toString(),
        }));
      } else if (num === 1) {
        setStatus((current) => ({
          ...current,
          startDateStr: dayjs().subtract(30, 'day').toString(),
        }));
      } else if (num === 2) {
        setStatus((current) => ({
          ...current,
          startDateStr: dayjs().subtract(365, 'day').toString(),
        }));
      }
    }
  }

  return (
    <>
      <div className="flex space-x-2 mr-4">
        {dateStateArr.map((dateStateArrItem, index) => (
          <button
            key={index}
            className={`${
              (index === dateState ? chipStyle.on : chipStyle.off) +
              chipStyle.common +
              chipStyle.hover
            } `}
            onClick={() => changeDateState(index)}
          >
            {dateStateArrItem}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작일"
            slotProps={{ textField: { size: 'small' } }}
            value={processDate(startDateStr)}
            onChange={(newValue) => changeStartDate(newValue)}
            className="w-44"
          />
          <p className="text-bold text-xl mx-1">~</p>
          <DatePicker
            label="종료일"
            slotProps={{ textField: { size: 'small' } }}
            value={processDate(endDateStr)}
            onChange={(newValue) => changeEndDate(newValue)}
            className="w-44"
          />
        </LocalizationProvider>
      </div>
    </>
  );
}
