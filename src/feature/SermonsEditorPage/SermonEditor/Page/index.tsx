import type { PropsWithChildren } from "react"
import { PageContainer } from "./styles"

const Page = ({ children }:PropsWithChildren) => {
    return(
        <PageContainer>
            {children}
        </PageContainer>
    )
}

export default Page