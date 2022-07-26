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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const paymentWay = [
    {
        title: "신용카드",
        value: "creditcard"
    },
    {
        title: "인터넷뱅킹(금융결제원)",
        value: "banktransfer"
    },
    {
        title: "가상계좌",
        value: "virtualaccount"
    },
    {
        title: "휴대폰",
        value: "mobile"
    },
    {
        title: "도서문화상품권",
        value: "book"
    },
    {
        title: "문화상품권",
        value: "culture"
    },
    {
        title: "스마트문상",
        value: "smartculture"
    },
    {
        title: "해피머니상품권",
        value: "happymoney"
    },
    {
        title: "모바일팝",
        value: "mobilepop"
    },
    {
        title: "틴캐시",
        value: "teencash"
    },
    {
        title: "교통카드결제",
        value: "tmoney"
    },
    {
        title: "편의점캐시",
        value: "cvs"
    },
    {
        title: "에그머니",
        value: "eggmoney"
    },
    {
        title: "온캐시",
        value: "oncash"
    },
    {
        title: "폰빌",
        value: "phonebill"
    },
    {
        title: "캐시비",
        value: "cashbee"
    },
    {
        title: "카카오페이",
        value: "kakaopay"
    },
    {
        title: "페이코",
        value: "payco"
    },
    {
        title: "체크페이",
        value: "checkpay"
    },
    {
        title: "토스",
        value: "toss"
    },
    {
        title: "SSG페이",
        value: "ssgpay"
    },
    {
        title: "L.Pay",
        value: "lpay"
    },
    {
        title: "네이버페이",
        value: "naverpay"
    },
    {
        title: "삼성페이",
        value: "samsungpay"
    },
    {
        title: "차이",
        value: "chai"
    },
    {
        title: "스마일페이",
        value: "smailpay"
    },
];

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
            <FormControl sx={{margin:2 ,width: 300}}>
                <InputLabel>결제수단</InputLabel>
                <Select
                    value={pgcode}
                    onChange={handleChange}
                    name="pgcode"
                    input={<OutlinedInput label="결제수단"/>}
                    MenuProps={MenuProps}
                >
                    {paymentWay.map((way) => (
                        <MenuItem key={way.title} value={way.value}>
                            <ListItemText>
                                {way.title}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
