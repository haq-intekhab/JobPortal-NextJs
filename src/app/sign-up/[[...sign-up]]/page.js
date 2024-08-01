import { SignUp } from "@clerk/nextjs";

export default function SignUnPage(){
    return <div className="w-full h-[100vh] mt-4 flex justify-center items-center">
        <SignUp/>
    </div>
}