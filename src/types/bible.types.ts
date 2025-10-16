export interface BibleBook {
    "id": number,
    "name": string,
    "abbrev": string,
    "testament": "old" | "new",
    "book_order": number,
    "total_chapters": number
    
}

export type HighlightColor = "yellow" | "green" | "blue" | "pink" | "purple" | "";

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
               "color": HighlightColor,
               "is_favorite": boolean,
               "created_at": string
           } | null
}