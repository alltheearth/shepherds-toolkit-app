 export interface BibleVerse {
            "id": number,
            "book": number,
            "book_name": string,
            "chapter": number,
            "verse": number,
            "text": string,
            "version": string,
            "reference": string,
            "user_highlight": {
                "id": string,
                "color": "yellow" | "green" | "blue" | "pink" | "purple",
                "is_favorite": boolean,
                "created_at": string
            } | null
}