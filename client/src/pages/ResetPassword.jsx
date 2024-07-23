import React, { useState, useEffect } from 'react';
import ImgLogin from "../assets/images/logo_noBg.png";
import PasswordInput from '../components/User/ProfileUser/PasswordInput';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../fetchData/User';
import toast from 'react-hot-toast';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorInput, setErrorInput] = useState([]);
    const navigate = useNavigate()
    const [conditions, setConditions] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        minLength: false,
        match: false
    });

    const notes = [
        "One lowercase character",
        "One uppercase character",
        "One number",
        "One special character",
        "8 characters minimum",
        "Passwords do not match"
    ];

    const validatePassword = (newPass, confirmPass) => {
        const errors = [];
        const conditions = {
            lowercase: /[a-z]/.test(newPass),
            uppercase: /[A-Z]/.test(newPass),
            number: /[0-9]/.test(newPass),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPass),
            minLength: newPass.length >= 8,
            match: newPass === confirmPass
        };

        if (!conditions.lowercase) errors.push(notes[0]);
        if (!conditions.uppercase) errors.push(notes[1]);
        if (!conditions.number) errors.push(notes[2]);
        if (!conditions.specialChar) errors.push(notes[3]);
        if (!conditions.minLength) errors.push(notes[4]);
        if (!conditions.match) errors.push(notes[5]);

        setConditions(conditions);

        if (errors.length > 0) {
            return { valid: false, errors: errors };
        }

        return { valid: true, errors: [] };
    };

    const { token } = useParams();

    const handleClick = async (e) => {
        e.preventDefault();
        const { valid, errors } = validatePassword(newPassword, confirmPassword);
        if (valid) {
            setErrorInput(errors);
            const form = {
                token : token,
                newPassword : newPassword,
                confirmPassword : confirmPassword
            }
            const res = await resetPassword(form)
            if(res.status === 200) {
                toast.success('Reset password successfull')
                setTimeout(() => {
                    navigate('/signin')
                }, 2000);
            }
            else{
                toast.error('Reset password faild')
                setTimeout(() => {
                    navigate('/signin')
                }, 2000);
            }
        } else {
            setErrorInput(errors);
        }
    };

    useEffect(() => {
        validatePassword(newPassword, confirmPassword);
    }, [newPassword, confirmPassword]);

    return (
        <div className="flex w-full relative bg-white">
            <div className="signin-form w-[524px] my-16 px-12 py-14 mx-auto bg-white rounded-lg border border-gray-200 ">
                <div className=" flex justify-center items-center ">
                    <img
                        src={ImgLogin}
                        className=" size-20"
                        alt="Brainity Logo"
                    />
                </div>
                <div>
                    <div className="mb-10">
                        <h1
                            className="text-5xl text-primary text-center  font-logoTitle"
                            id="typing-animation"
                        >
                            Reset Password
                        </h1>
                    </div>
                    <form action="" className="space-y-6 md:space-y-7">
                        <div className="flex flex-col gap-y-7">
                            <PasswordInput
                                label="New password:"
                                name="newpassword"
                                id="newpassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <PasswordInput
                                label="Confirm password:"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                {notes.map((note, index) => (
                                    <li className="list-disc list-inside flex items-center" key={index}>
                                        <FontAwesomeIcon
                                            icon={conditions[index === 0 ? 'lowercase' :
                                                index === 1 ? 'uppercase' :
                                                    index === 2 ? 'number' :
                                                        index === 3 ? 'specialChar' :
                                                            index === 4 ? 'minLength' :
                                                                'match'] ? faCheckCircle : faTimesCircle}
                                            className={`mr-2 ${conditions[index === 0 ? 'lowercase' :
                                                index === 1 ? 'uppercase' :
                                                    index === 2 ? 'number' :
                                                        index === 3 ? 'specialChar' :
                                                            index === 4 ? 'minLength' :
                                                                'match'] ? 'text-green-500' : 'text-red-500'}`}
                                        />
                                        <span>{note}</span>
                                    </li>
                                ))}
                            </div>
                        </div>
                        <div className="button-login text-center ">
                            <button
                                onClick={handleClick}
                                className="btnLogin border hover:bg-[#03ecbe] text-white bg-primary transition  transform hover:scale-105 ]"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
