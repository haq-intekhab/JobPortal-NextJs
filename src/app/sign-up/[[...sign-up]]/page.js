import { SignUp } from "@clerk/nextjs";

export default function SignUnPage(){
    return <div className="w-full h-[100vh] mt-[80px] flex justify-center">
        <SignUp/>
    </div>
}