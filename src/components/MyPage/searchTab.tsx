import { searchType } from "@/model/mypage";
import { searchState } from "@/store/mypage";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useRecoilState} from "recoil";

type Props={
    tabType:number;
}


const dateStateArr : string[] = ["하루전","한달전","일년전"];
const orderStateArr : string[] = ["시간순","이름순","가격순"];

type chipStyleType ={
    on:string,
    off:string,
    common:string,
    hover:string
};

const chipStyle:chipStyleType = {
    on:"text-green-500 border-green-500 border-[3px] px-[9px] py-[2px] ",
    off:"text-neutral-400 border-neutral-300 border-2 px-[10px] py-[3px] ",
    common:"bg-white rounded-full font-semibold h-fit ",
    hover:"hover:text-green-500 hover:border-green-500 hover:border-[3px] hover:px-[9px] hover:py-[2px] "
};

function processDate(dateStr: string | null) { 
    if (!dateStr) {
        return null;
    } else { 
        return dayjs(dateStr);
    }
}

export default function SearchTab({tabType}:Props){

    const [{title, auctionState,dateState, startDateStr, endDateStr, orderBy}, setStatus] = useRecoilState<searchType>(searchState);
    const [titleText, setTitleText] = useState<string>('');

    let auctionStateArr:string[] = [];
    
    if(tabType==0){
        auctionStateArr  = ["배송전","배송중","배송완료"];
    }else if(tabType==1){
        auctionStateArr  = ["경매전","경매중","경매후"];
    }

    function changeAutionState(num:number){
        if(num===auctionState){
            setStatus((current)=>({...current, auctionState:-1}));
        }else{
            setStatus((current)=>({...current, auctionState:num}));
        }
    }

    function changeDateState(num:number){

        if(num==dateState){
            setStatus((current)=>({...current, dateState:null}));
            setStatus((current)=>({...current, startDateStr:null}));
            setStatus((current)=>({...current, endDateStr:null}));

        }else{
            setStatus((current)=>({...current, dateState:num}));
            setStatus((current)=>({...current, endDateStr:dayjs().toString()}));

            if(num===0){
                setStatus((current)=>({...current, startDateStr:(dayjs().subtract(1,"day").toString())}));
            }else if(num===1){
                setStatus((current)=>({...current, startDateStr:(dayjs().subtract(30,"day").toString())}));
            }else if(num===2){
                setStatus((current)=>({...current, startDateStr:(dayjs().subtract(365,"day").toString())}));
            }
        }
    }

    function changeStartDate(newDate:Dayjs|null){
        
        let endDate = processDate(endDateStr);
        let chkNewDate: string | null = null;
        
        if (newDate!==null) { 
            chkNewDate = newDate.isAfter(dayjs()) ? dayjs().toString() : newDate.toString();
        }
        
        setStatus((current)=>({...current, startDateStr:chkNewDate}));

        if(endDate !== null){
            if(endDate.isBefore(newDate)){
                setStatus((current)=>({...current, endDateStr:chkNewDate}));
            }

            setStatus((current)=>({...current, dateState:-1}));

            if(endDate.diff(dayjs(),'day')==0){
                if(endDate.diff(newDate,'day')===1){
                    setStatus((current)=>({...current, dateState:0}));
                }else if(endDate.diff(newDate,'day')===30){
                    setStatus((current)=>({...current, dateState:1}));
                }else if(endDate.diff(newDate,'day')===365){
                    setStatus((current)=>({...current, dateState:2}));
                }
            }
        }
        
    }

    function changeEndDate(newDate: Dayjs | null) {
        
        let endDate = processDate(endDateStr);
        let startDate = processDate(startDateStr);
        let chkNewDate: string | null = null;

        if (newDate!==null) { 
            chkNewDate = newDate.isAfter(dayjs()) ? dayjs().toString() : newDate.toString();
        }
        
        setStatus((current)=>({...current, endDateStr:chkNewDate}));
        

        if(startDate !== null){
            if(startDate?.isAfter(newDate)){
                setStatus((current)=>({...current, startDateStr:chkNewDate}));
            }

            setStatus((current)=>({...current, dateState:-1}));

            if(newDate !== null && newDate.diff(dayjs(),"day")==0){
                if(newDate.diff(startDate,'day')===1){
                    setStatus((current)=>({...current, dateState:0}));
                }else if(newDate.diff(startDate,'day')===30){
                    setStatus((current)=>({...current, dateState:1}));
                }else if(newDate.diff(startDate,'day')===365){
                    setStatus((current)=>({...current, dateState:2}));
                }
            }
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setStatus((current)=>({...current, orderBy:event.target.value}));
    };

    
    if (tabType <= 2) {
        return (
            <div className="mt-12 mb-4">{tabType<=1?
                <div className="flex space-x-2">
                    {auctionStateArr.map((autcionStateArrItem, index) =>
                        <button key={index} className={(index === auctionState ? chipStyle.on : chipStyle.off) + chipStyle.common + chipStyle.hover} onClick={() => changeAutionState(index)}>{autcionStateArrItem}</button>
                    )}
                </div>: null
                }
                <div className="flex justify-between">
                    <div className="flex space-x-2 items-center">
                        <div className="flex space-x-2 mr-4">
                            {dateStateArr.map((dateStateArrItem, index) =>
                                <button key={index} className={`${(index === dateState ? chipStyle.on : chipStyle.off) + chipStyle.common + chipStyle.hover} `} onClick={() => changeDateState(index)}>{dateStateArrItem}</button>
                            )}
                        </div>
                        <div className="flex items-center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="시작일"
                                    slotProps={{ textField: { size: 'small' } }}
                                    // value={processDate(formattedStartDate)}
                                    value={processDate(startDateStr)}
                                    onChange={(newValue) => changeStartDate(newValue)}
                                    className="w-44"
                                />
                                <p className="text-bold text-xl mx-1">~</p>
                                <DatePicker
                                    label="종료일"
                                    slotProps={{ textField: { size: 'small' } }}
                                    // value={processDate(formattedEndDate)}
                                    value={processDate(endDateStr)}
                                    onChange={(newValue) => changeEndDate(newValue)}
                                    className="w-44"
                                />
                            </LocalizationProvider>
                        </div>
                        <TextField
                            label="물품이름 검색"
                            size="small"
                            className="w-52 ml-2 mr-1"
                            value={titleText}
                            onChange={(event) => setTitleText(event.target.value)}
                        />
                        <button
                            className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                            onClick={() => {
                                setStatus((current) => ({ ...current, title: titleText }));
                            }}
                        >검색
                        </button>
                    </div>
                    <div className='font-bold'>
                        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={orderBy}
                                label="정렬기준"
                                onChange={handleChange}
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                            >
                                {orderStateArr.map((orderStateArrItem, index) => <MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div className="flex items-center justify-end">
            <TextField
                label="물품이름 검색"
                size="small"
                className="w-52 ml-2 mr-1"
                value={titleText}
                onChange={(event) => setTitleText(event.target.value)}
            />
            <button
                className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                onClick={() => {
                    setStatus((current) => ({ ...current, title: titleText }));
                }}
            >검색
            </button>
            <div className='font-bold'>
                <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={orderBy}
                        label="정렬기준"
                        onChange={handleChange}
                        inputProps={{ MenuProps: { disableScrollLock: true } }}
                    >
                        {orderStateArr.map((orderStateArrItem, index) => <MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        </div>);
    }
}