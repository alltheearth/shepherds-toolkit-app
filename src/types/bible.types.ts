export interface BibleBook {
    "id": number,
    "name": string,
    "abbrev": string,
    "testament": "old" | "new",
    "book_order": number,
    "total_chapters": number
    
}

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

// src/types/bible.types.ts - ADICIONAR AO ARQUIVO EXISTENTE

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

// ✅ NOVOS TIPOS PARA NAVEGAÇÃO
export interface ChapterNavigationLink {
    book: string;
    book_name: string;
    chapter: number;
    is_same_book: boolean;
    url: string;
}

export interface ChapterNavigation {
    current: {
        book: string;
        book_name: string;
        chapter: number;
        total_chapters: number;
        testament: string;
    };
    previous: ChapterNavigationLink | null;
    next: ChapterNavigationLink | null;
    book_chapters: {
        first: number;
        last: number;
        current: number;
    };
}