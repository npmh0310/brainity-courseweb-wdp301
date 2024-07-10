import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';
import { updatePayment } from '../../../fetchData/Course';

const PaymentResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionStatus = queryParams.get('vnp_TransactionStatus');
    const [statusCode, setStatusCode] = useState('')

    // console.log(location)

    useEffect(() => {
        const fetchData = async () => {
            const res = await updatePayment(location.search);
            if (res && res.status === 200) {
                setStatusCode(res.data.RspCode)
                // console.log(res.data.RspCode);
            }
        };

        fetchData();
    }, [location])

    return (
        <div>
            {statusCode && statusCode === '00' ? (
                <div>
                    <PaymentSuccess />
                </div>
            ) : (
                <div>
                    <h1 className='text-center'>Thanh toán thất bại</h1>
                    <p className='text-center'>Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ khách hàng.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentResult;
