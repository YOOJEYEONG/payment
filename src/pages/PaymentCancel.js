import React, {useState} from 'react';
import {Box, Button, styled, TextField} from "@mui/material";
import axios from "axios";

const PaymentCancel = () => {
    const [paymentCancelData, setPaymentCancelData] = useState({
        pgcode : "mobile",
        client_id:"pay_test",
        user_id:"test_user_id",
        tid:"tpay_test2018010123595900001",
        amount : "",
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

    const onClickHandler = (e) => {
        e.preventDefault()
        axios.post('v1.0/payments/request', paymentCancelData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log(paymentCancelData)


    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{display:'flex',flexDirection:'column',margin:1}}
        >
            <StyledTextField label="pgcode" variant="outlined" name="pgcode" value={pgcode} onChange={handleChange} />
            <StyledTextField label="client_id" variant="outlined" name="client_id" value={client_id} onChange={handleChange}/>
            <StyledTextField label="user_id" variant="outlined" name="user_id" value={user_id} onChange={handleChange}/>
            <StyledTextField label="tid" variant="outlined" name="tid" value={tid} onChange={handleChange}/>
            <StyledTextField label="amount" variant="outlined" name="amount" value={amount} onChange={handleChange} />
            <StyledTextField label="ip_addr" variant="outlined" name="ip_addr" value={ip_addr} onChange={handleChange} />
            <Button type="submit" style={{width:300, margin:17}} variant="contained" onClick={onClickHandler}>전송</Button>
        </Box>
    );
};

export default PaymentCancel;

const StyledTextField = styled(TextField)({
    margin:"16px" ,
    width:300
})