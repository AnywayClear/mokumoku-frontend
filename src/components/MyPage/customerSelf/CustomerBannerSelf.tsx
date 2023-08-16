"use client"
import Image from "next/image";
import LogoImage from '../../../../public/images/mokumokuLogo.svg';
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { userData } from "@/model/user";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { delUser, getUserInfo } from "@/service/api/user";
import { getPoint } from "@/service/api/point";
import { userPoint } from "@/model/point";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField } from "@mui/material";
import { useFormControl } from '@mui/material/FormControl';


export default function CustomerBannerSelf(){
    
    const { user } = useContext(AuthContext);
    const [quitText, setQuitText] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    const { data: userData }: UseQueryResult<userData> = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserInfo(user?.userId ?? ""),
        enabled: !!user?.userId
    });

    const { data: userPoint }: UseQueryResult<userPoint> = useQuery({
        queryKey: ['userPoint'],
        queryFn: () => getPoint(user?.userId ?? ""),
        enabled: !!user?.userId
    });

    const deleteUser = useMutation(() => delUser(), {
        onSuccess: () => {
            setOpen(false);
        },
    });
    
    const [open, setOpen] = useState(false);

    const handleDelete = () => { 
        if (quitText === "탈퇴하겠습니다") {
            deleteUser.mutate();
        } else { 
            setErrMsg("글자를 확인해주세요");
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-20 pb-12">
                <div className="text-center pr-20">
                    <h1 className="text-4xl font-bold pb-4">마이페이지</h1>
                    <Image alt="MokuMoku" src={userData?.image ?? LogoImage} width={1000} height={1000} className="w-72 h-72 bg-white rounded-full"/>
                </div>
                <div className="text-left pt-24 w-[25rem]">
                    <p className="text-5xl font-bold">{userData?.nickname ?? "닉네임이없어요"}</p>
                    <p className="pt-8 text-lg">포인트</p>
                    <div className="flex items-end">
                        <p className="text-5xl font-bold pr-6">{userPoint?.balance}</p>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">충전하기</u></a>
                    </div>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <u className="text-xl text-stone-700 hover:opacity-70 cursor-pointer" onClick={handleClickOpen}>회원탈퇴</u>
                    </div>
                    
                </div>
                
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>회원탈퇴</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        회원탈퇴를 진행하고 싶으시다면 "탈퇴하겠습니다"를 입력해주세요
                    </DialogContentText>
                        <TextField
                            error={errMsg !== ""}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="탈퇴하시겠습니까?"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={quitText}
                            onChange={(event) => {
                                setQuitText(event.target.value);
                                setErrMsg('');
                            }}
                            helperText={errMsg}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleDelete}>탈퇴</Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        </>
    );
}