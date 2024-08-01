import { currentUser } from '@clerk/nextjs/server';
import Header from "../header";
import { fetchProfileAction } from '@/actions';


async function CommmonLayout({children}){

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    return <div className="mx-auto max-w-7xl">
        {/* Header Component */}
        <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))}/>
        {/* Header Component */}

        {/* Main Component */}
        <main>
            {children}
        </main>
        {/* Main Component */}
    </div>
}

export default CommmonLayout;