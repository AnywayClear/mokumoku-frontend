import { searchType } from "@/model/mypage";
import { dateSelector, searchState } from "@/store/mypage";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

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

export default function SearchTab({tabType}:Props){

    type test={
        formattedStartDate:Dayjs|null,
        formattedEndDate:Dayjs|null
    }
    
    const [{title, auctionState,dateState, startDate, endDate, orderBy}, setStatus] = useRecoilState<searchType>(searchState);
    const [{formattedStartDate, formattedEndDate}, setFormattedData] = useRecoilState<test>(dateSelector);
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
            setStatus((current)=>({...current, startDate:null}));
            setStatus((current)=>({...current, endDate:null}));

        }else{
            setStatus((current)=>({...current, dateState:num}));
            setStatus((current)=>({...current, endDate:dayjs().toString()}));

            if(num===0){
                setStatus((current)=>({...current, startDate:(dayjs().subtract(1,"day").toString())}));
            }else if(num===1){
                setStatus((current)=>({...current, startDate:(dayjs().subtract(30,"day").toString())}));
            }else if(num===2){
                setStatus((current)=>({...current, startDate:(dayjs().subtract(365,"day").toString())}));
            }
        }
    }

    //새로운 시작일이 종료일보다 빠르면 종료일을 시작일로 설정
    //종료일이 현재일이고 1일, 30일, 1년 차이면 setDateState
    //그외엔 setDateState(-1)
    function changeStartDate(newDate:Dayjs|null){

        if(newDate!==null){
            if(newDate.isAfter(dayjs())) newDate = dayjs();
            setStatus((current)=>({...current, startDate:(newDate==null?null:newDate.toString())}));
        }

        if(formattedEndDate !== null){
            if(formattedEndDate.isBefore(newDate)){
                setStatus((current)=>({...current, endDate:(newDate==null?null:newDate.toString())}));
            }

            setStatus((current)=>({...current, dateState:-1}));

            if(formattedEndDate.diff(dayjs(),'day')==0){
                if(formattedEndDate.diff(newDate,'day')===1){
                    setStatus((current)=>({...current, dateState:0}));
                }else if(formattedEndDate.diff(newDate,'day')===30){
                    setStatus((current)=>({...current, dateState:1}));
                }else if(formattedEndDate.diff(newDate,'day')===365){
                    setStatus((current)=>({...current, dateState:2}));
                }
            }
        }
        
    }

    //새로운 종료일이 오늘보다 늦으면 그냥 오늘로 설정
    //새로운 종료일이 시작일보다 빠르면 시작일을 종료일로 설정
    //종료일이 현재일이고 1일, 30일, 1년 차이면 setDateState
    //그외엔 setDateState(-1)
    function changeEndDate(newDate:Dayjs|null){

        if(newDate!==null){
            if(newDate.isAfter(dayjs())) newDate = dayjs();
            setStatus((current)=>({...current, endDate:(newDate==null?null:newDate.toString())}));
        }

        if(startDate !== null){
            if(formattedStartDate?.isAfter(newDate)){
                setStatus((current)=>({...current, startDate:(newDate==null?null:newDate.toString())}));
            }

            setStatus((current)=>({...current, dateState:-1}));

            if(newDate !== null && newDate.diff(dayjs(),"day")==0){
                if(newDate.diff(formattedStartDate,'day')===1){
                    setStatus((current)=>({...current, dateState:0}));
                }else if(newDate.diff(formattedStartDate,'day')===30){
                    setStatus((current)=>({...current, dateState:1}));
                }else if(newDate.diff(formattedStartDate,'day')===365){
                    setStatus((current)=>({...current, dateState:2}));
                }
            }
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setStatus((current)=>({...current, orderBy:event.target.value}));
    };

    return(
        <>
            {   
                tabType===0 ||tabType===1?
                <> 
                    <div className="flex space-x-2 mt-8">
                        {auctionStateArr.map((autcionStateArrItem, index)=>
                        <button key={index} className={(index===auctionState?chipStyle.on:chipStyle.off)+chipStyle.common +chipStyle.hover } onClick={()=>changeAutionState(index)}>{autcionStateArrItem}</button>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex space-x-2 items-center">
                          <div className="flex space-x-2 mr-4">
                              {dateStateArr.map((dateStateArrItem, index)=>
                               <button key={index} className={`${(index===dateState?chipStyle.on:chipStyle.off)+chipStyle.common + chipStyle.hover} `} onClick={()=>changeDateState(index)}>{dateStateArrItem}</button>
                                 )}
                         </div>
                        <div className="flex items-center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  
                                    label="시작일" 
                                    slotProps={{ textField: { size: 'small' } }} 
                                    value={startDate}
                                    onChange={(newValue) => changeStartDate(dayjs(newValue))} 
                                    className="w-44"
                                />
                                <p className="text-bold text-xl mx-1">~</p>
                                <DatePicker
                                    label="종료일" 
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={endDate}
                                    onChange={(newValue) => changeEndDate(dayjs(newValue))} 
                                    className="w-44"
                                />
                            </LocalizationProvider>  
                        </div>
                        <TextField
                               label="물품이름 검색"
                               size="small"
                               className="w-52 ml-2 mr-1"
                               value={titleText}
                               onChange={(event)=>setTitleText(event.target.value)}
                            />
                        <button 
                                className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                                onClick={()=>{
                                    setStatus((current)=>({...current, title:titleText}));
                                    console.log(title);
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
                                inputProps={{MenuProps: {disableScrollLock: true}}}
                            >
                                {orderStateArr.map((orderStateArrItem,index)=><MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </>
            :
            
                <div className="flex items-center justify-end">
                    <TextField
                            label="물품이름 검색"
                            size="small"
                            className="w-52 ml-2 mr-1"
                            value={titleText}
                            onChange={(event)=>setTitleText(event.target.value)}
                        />
                    <button 
                            className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                            onClick={()=>{
                                setStatus((current)=>({...current, title:titleText}));
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
                                inputProps={{MenuProps: {disableScrollLock: true}}}
                            >
                                {orderStateArr.map((orderStateArrItem,index)=><MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
                            </Select>
                        </FormControl>
                </div>
            </div>
            
            }
        </>
    );
}