import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){
    return <div className="w-full h-[100vh] mt-4 flex justify-center items-center">
        <SignIn/>
    </div>
}