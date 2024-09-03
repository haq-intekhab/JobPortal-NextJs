import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    return <div className="w-full mt-[80px] flex justify-center">
        <SignIn/>
    </div>
}