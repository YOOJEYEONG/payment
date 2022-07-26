import React, {useState} from 'react';
import {Box, Button, styled, TextField, Typography} from "@mui/material";
import axios from "axios";
import PgcodeSelect from './PgcodeSelect'
import { useNavigate } from 'react-router-dom';




const PaymentCancel = () => {
    const navigate = useNavigate();
    const clientId = "pay_test"
    const userId = "test_user_id"

    const [paymentCancelData, setPaymentCancelData] = useState({
        pgcode : "",
        client_id: clientId,
        user_id: userId,
        tid:"",
        amount : 0,
        ip_addr:"",
    })
    const {pgcode, client_id, user_id, tid, amount, ip_addr} = paymentCancelData;


    const handleChange = (e) => {
        let {value, name} = e.target

        if(name == "amount" ){
            value = Number(value)
        }

        setPaymentCancelData({
            ...paymentCancelData, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });

    };

    const onClickHandler = async(e) => {
        console.log("paymentCancelData",paymentCancelData)
        e.preventDefault()
        try {
            const response = await axios.post("/v1.0/payments/request", paymentCancelData, {
                headers: {
                    "Authorization": "PLKEY MTFBNTAzNTEwNDAxQUIyMjlCQzgwNTg1MkU4MkZENDA=",
                    "Content-Type": "application/json"
                }
            });
            console.log("res", response.data);
        } catch (e) {
            console.log(e);
        }

    }

    console.log(paymentCancelData)


    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{display:'flex',flexDirection:'column',margin:1, alignItems: "center"}}
        >
            <Typography variant="h2" component="h2">
                결제취소
            </Typography>;
            <PgcodeSelect pgcode={pgcode} handleChange={handleChange} />
            <StyledTextField label="tid" variant="outlined" name="tid" value={tid} onChange={handleChange}/>
            <StyledTextField label="amount" variant="outlined" name="amount" value={amount} onChange={handleChange} />
            <StyledTextField label="ip_addr" variant="outlined" name="ip_addr" value={ip_addr} onChange={handleChange} />
            <Button type="submit" style={{width:300, margin:17}} variant="contained" onClick={onClickHandler}>전송</Button>
            <Button style={{width:300, margin:17}} variant="contained" color="secondary" onClick={()=> {
                navigate('/')
            }}>결제요청 페이지로</Button>
        </Box>
    );
};

export default PaymentCancel;

const StyledTextField = styled(TextField)({
    margin:"16px" ,
    width:300
})