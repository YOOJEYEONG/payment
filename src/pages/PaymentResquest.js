import React, {useState, useEffect} from 'react';
import {
    Box,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    Checkbox,
    OutlinedInput, Button, styled
} from "@mui/material";
import axios from "axios";
import PgcodeSelect from './PgcodeSelect'



const PaymentRequest = () => {
    const [paymentRequestDatas, setPaymentRequestDatas] = useState({
        pgcode : "",
        user_id:"test_user_id",
        user_name:"테스터",
        service_name:"페이레터",
        client_id:"pay_test",
        order_no:"1234567890",
        amount:"",
        taxfree_amount: "",
        tax_amount: "",
        product_name:"테스트상품",
        return_url:"https://testpg.payletter.com/result",
        callback_url:"https://testpg.payletter.com/callback",
        cancel_url:"https://testpg.payletter.com/cancel"
    });


    const {pgcode, user_id, user_name,service_name ,client_id ,amount, taxfree_amount, tax_amount, product_name} = paymentRequestDatas;


    const handleChange = (e) => {
        let {value, name} = e.target

        if(name == "amount" || name == "taxfree_amount" || name == "tax_amount"){
            value = Number(value)
        }

        setPaymentRequestDatas({
            ...paymentRequestDatas, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
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
            sx={{display:'flex',flexDirection:'column',margin:1}}
        >
            <PgcodeSelect pgcode={pgcode} handleChange={handleChange} />
            <StyledTextField label="user_name" variant="outlined" name="user_name" value={user_name} onChange={handleChange} />
            <StyledTextField label="user_id" variant="outlined" name="user_id" value={user_id} onChange={handleChange} />
            <StyledTextField label="service_name" variant="outlined" name="service_name" value={service_name} onChange={handleChange} />
            <StyledTextField label="client_id" variant="outlined" name="client_id" value={client_id} onChange={handleChange} />
            <StyledTextField label="amount" variant="outlined" name="amount" value={amount} onChange={handleChange} />
            <StyledTextField label="taxfree_amount" variant="outlined" name="taxfree_amount" value={taxfree_amount} onChange={handleChange} />
            <StyledTextField label="tax_amount" variant="outlined" name="tax_amount" value={tax_amount} onChange={handleChange} />
            <StyledTextField label="product_name" variant="outlined" name="product_name" value={product_name} onChange={handleChange} />

            <Button type="submit" style={{width:300, margin:17}} variant="contained" onClick={onClickHandler}>전송</Button>

        </Box>
    );
};

export default PaymentRequest;

const StyledTextField = styled(TextField)({
    margin:"16px" ,
    width:300
})
