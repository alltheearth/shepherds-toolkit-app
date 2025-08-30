import { useState } from "react"
import { VerseContainer, VerseContent } from "../Bible/styles"
import MenuVerse from "../MenuVerse"

type Display = "block" | "none"

const Verse = ({verse, text}:{"verse":number, "text":string}) => {

    const [display, setDisplay] = useState<Display>("none")

    return (
        <VerseContainer onMouseEnter={()=> setDisplay("block")} onMouseLeave={()=>{ setDisplay("none")}}>
            <VerseContent>{verse}</VerseContent>
            <VerseContent>{text}</VerseContent>
            <MenuVerse display={display} />
        </VerseContainer>
)
}

export default Verse