'use client';
import * as React from 'react';
import { MenuItem, Select, InputLabel, FormControl,SelectChangeEvent } from '@mui/material';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const orderStateArr : string[] = ["7일전","14일전","31일전"];

export default function AuctionChart() {

  const [orderState, setOrderState] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setOrderState(event.target.value);
};

  var pieOptions: any = {
    type: 'pie',
    series: [9000, 1000],
    width: 600,
    options: {
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 1,
        },
      },
      theme: {
        mode: 'light',
        monochrome: {
          enabled: true,
          color: '#19903C',
          shadeTo: 'light',
          shadeIntensity: 0.8,
        },
      },
      labels: ['정산완료', '정산미완료'],
    },
  };

  var columnOptions: any = {
    series: [
      {
        name: '낙찰 금액',
        data: [23000, 30000, 50000, 30000, 23000, 10000, 40000],
      },
    ],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
          dataLabels: {
            position: 'bottom', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + '원';
        },
        offsetY: -1,
        style: {
          fontSize: '18px',
          colors: ['#333333'],
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: '20px',
            colors: ['#444444'],
            fontWeight: 'bold',
          },
        },
        categories: ['월', '화', '수', '목', '금', '토', '일'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#000000',
              colorTo: '#000000',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },

        labels: {
          show: false,
          formatter: function (val: any) {
            return val + '원';
          },
        },
      },
      theme: {
        mode: 'light',
        monochrome: {
          enabled: true,
          color: '#19903C',
          shadeTo: 'light',
          shadeIntensity: 0.8,
        },
      },
    },
  };

  return (
    <div className="mb-16 px-40 relative">
      <div className="font-bold mt-20 flex justify-between items-start">
          <p className="text-4xl font-bold mb-5">총 낙찰 금액</p>
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
              <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={orderState}
                  label="정렬기준"
                  onChange={handleChange}
                  inputProps={{MenuProps: {disableScrollLock: true}}}
              >
                  {orderStateArr.map((orderStateArrItem,index)=><MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
              </Select>
          </FormControl>
      </div>
      <div>
        <p className="text-5xl mb-10">10,000,000원</p>

        <div className="flex w-full justify-between mb-10">
          <div className="border-t-4 border-2 rounded-md w-72 h-auto py-4 px-6 border-neutral-400">
            <p className="text-2xl font-semibold text-neutral-500 mb-3">
              어제 결제 금액
            </p>
            <p className="text-3xl font-bold text-neutral-800 mb-4">7.2만원</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold text-neutral-500 mr-10">
                기준일 대비
              </p>
              <p className="text-2xl font-semibold text-red-600">6%</p>
            </div>
          </div>

          <div className="border-t-4 border-2 rounded-md w-72 h-auto py-4 px-6 border-neutral-400">
            <p className="text-2xl font-semibold text-neutral-500 mb-3">
              어제 결제 금액
            </p>
            <p className="text-3xl font-bold text-neutral-800 mb-4">7.2만원</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold text-neutral-500 mr-10">
                기준일 대비
              </p>
              <p className="text-2xl font-semibold text-red-600">6%</p>
            </div>
          </div>

          <div className="border-t-4 border-2 rounded-md w-72 h-auto py-4 px-6 border-neutral-400">
            <p className="text-2xl font-semibold text-neutral-500 mb-3">
              어제 결제 금액
            </p>
            <p className="text-3xl font-bold text-neutral-800 mb-4">7.2만원</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold text-neutral-500 mr-10">
                기준일 대비
              </p>
              <p className="text-2xl font-semibold text-red-600">6%</p>
            </div>
          </div>
        </div>

        <div className="flex mt-20">
          <div>
            <Chart {...pieOptions} />
          </div>
          <div className="my-auto">
            <p className="text-green-800 text-3xl font-bold">정산비율</p>
            <p className="text-8xl text-green-800 font-bold">90%</p>
            <p className="mt-7 text-2xl font-bold">정산금액</p>
            <p className="mt-2 text-3xl">9000원</p>
            <p className="mt-5 text-2xl font-bold">정산미완료금액</p>
            <p className="mt-2 text-3xl">1000원</p>
          </div>
        </div>
        <div className="mt-20">
          <p className="font-semibold text-4xl">최근 7일 낙찰금액</p>
          <div className="border rounded-md p-2 mt-6">
            <Chart
              type="bar"
              height={500}
              options={columnOptions.options}
              series={columnOptions.series}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
