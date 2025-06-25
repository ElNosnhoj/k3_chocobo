/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import Station from "./station";
import PageWrapper from "@/components/ui/page-wrapper/server";


export default async () => {
    return (
        <PageWrapper>
            <Station/>
        </PageWrapper>
    )
}


// flex flex-col items-center p-6 mx-auto w-full max-w-screen-md bg-blue-100 m-1