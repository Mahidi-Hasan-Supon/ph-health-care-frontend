import apiClient from '@/lib/apiClient';
import { RegistrationPayload, VerifiedAccountPayload } from '@/types';

export const userLogin = (payload:{email :string , password : string}) => {
    return (
        apiClient("/auth/login" , {method:"POST" , body:payload})
    );
};
export const verifyAccount = (payload:VerifiedAccountPayload) => {
    return (
        apiClient("/auth/verify-email" , {method:"POST" , body:payload})
    );
};
export const userRegistration = (payload:RegistrationPayload) => {
    return (
        apiClient("/auth/register" , {method:"POST" , body:payload})
    );
};


export const userLogOut = () => {
    return (
        apiClient("/auth/logout" , {method:"POST"})
    );
};
export const getMe = () => {
    return (
        apiClient("/auth/getMe")
    );
};

export const googleOAuthClient = (payload:{idToken:string})=>{
    return (
        apiClient("/auth/googleLogin" , { method:"POST", body:payload})
    )
}

