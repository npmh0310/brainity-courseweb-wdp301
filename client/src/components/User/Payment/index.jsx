import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';

const PaymentResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionStatus = queryParams.get('vnp_TransactionStatus');

    return (
        <div>
            {transactionStatus === '00' ? (
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
