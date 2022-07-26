import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    Checkbox,
    OutlinedInput, Button, styled,
    Typography
} from "@mui/material";
import axios from "axios";
import PgcodeSelect from './PgcodeSelect'



const PaymentRequest = () => {
    const navigate = useNavigate();
    const userId = "test_user_id"
    const userName ="테스트"
    const serviceName = "페이레터"
    const clientId = "pay_test"
    const productName = "테스트상품"
    const returnUrl = "http://localhost:3000/result"
    const callbackUrl = "http://localhost:3000/result"
    const cancelUrl = "http://localhost:3000//cancel"


    const [paymentRequestDatas, setPaymentRequestDatas] = useState({
        pgcode : "",
        user_id: userId,
        user_name: userName,
        service_name: serviceName,
        client_id: clientId,
        order_no:"",
        amount:0,
        taxfree_amount: 0,
        tax_amount: 0,
        product_name:productName,
        return_url: returnUrl,
        callback_url: callbackUrl,
        cancel_url: cancelUrl
    });


    const {pgcode, user_id, user_name,service_name ,client_id ,amount, taxfree_amount, tax_amount, product_name} = paymentRequestDatas;


    const handleChange = (e) => {
        let {value, name} = e.target

        if(name == "amount" || name == "taxfree_amount" || name == "tax_amount"){
            value = Number(value)
        }

        setPaymentRequestDatas({
            ...paymentRequestDatas,
            [name]: value
        });

    };



    const onClickHandler = async (e) => {
        e.preventDefault()
        let newOrderNo = getOrderNo()

        let newPaymentData = {
            ...paymentRequestDatas,
            order_no: newOrderNo
        }
        console.log("paymentRequestDatas",newPaymentData)
        try {
            const response = await axios.post("/v1.0/payments/request", newPaymentData, {
                headers: {
                    Authorization: "PLKEY MTFBNTAzNTEwNDAxQUIyMjlCQzgwNTg1MkU4MkZENDA=",
                }
            });
            console.log("res", response.data);
            if(response.data.online_url){
                window.open(response.data.online_url, "_blank", "width=300, height=100")
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getOrderNo = () => {
        let result = localStorage.getItem("order_no")

        if(!result){
            localStorage.setItem("order_no", "0")
            result = Number(localStorage.getItem("order_no"))
        }else {
            result = Number(localStorage.getItem("order_no"))
        }

        result = String(result + 1)
        localStorage.setItem('order_no', result)

        return result
    }

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{display:'flex',flexDirection:'column',margin:1, alignItems: "center"}}
        >
            <Typography variant="h2" component="h2">
                결제요청
            </Typography>;
            <PgcodeSelect pgcode={pgcode} handleChange={handleChange} />
            <StyledTextField label="service_name" variant="outlined" name="service_name" value={serviceName} onChange={handleChange} />
            <StyledTextField label="amount" variant="outlined" name="amount" value={amount} onChange={handleChange} />
            <StyledTextField label="taxfree_amount" variant="outlined" name="taxfree_amount" value={taxfree_amount} onChange={handleChange} />
            <StyledTextField label="tax_amount" variant="outlined" name="tax_amount" value={tax_amount} onChange={handleChange} />
            <StyledTextField label="product_name" variant="outlined" name="product_name" value={productName} onChange={handleChange} />

            <Button type="submit" style={{width:300, margin:17}} variant="contained" onClick={onClickHandler}>전송</Button>
            <Button style={{width:300, margin:17}} variant="contained" color="secondary" onClick={()=> {
                navigate('/cancel')
            }}>결제취소 페이지로</Button>
        </Box>
    );
};

export default PaymentRequest;

const StyledTextField = styled(TextField)({
    margin:"16px" ,
    width:300
})
