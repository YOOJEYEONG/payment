import React from 'react';
import { useNavigate } from 'react-router-dom';


import {
    Typography, Box, Button
} from "@mui/material";

const PaymentResult = () => {
    const navigate = useNavigate();
    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{display:'flex',flexDirection:'column',margin:1, alignItems: "center"}}
        >
            <Typography variant="h2" component="h2">
                결제성공!!
            </Typography>;
            <Button style={{width:300, margin:17}} variant="contained" color="secondary" onClick={()=> {
                navigate('/')
            }}>결제요청 페이지로</Button>
        </Box>
    );
};

export default PaymentResult;
