import { useSearchParams } from 'next/navigation';

const VerifyAccountFrom = () => {
    const searchParams = useSearchParams() 
    const email = searchParams.get("email")
    console.log(email);
    return (
        <div>
            
        </div>
    );
};

export default VerifyAccountFrom;

