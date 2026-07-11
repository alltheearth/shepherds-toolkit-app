import api from './api';

export interface BibleReferenceResult {
  book_abbrev: string;
  book_name: string;
  chapter: number;
  verse_start: number;
  verse_end: number;
  reference: string;
  version: string;
  preview: string;
  text: string | null;
  verse_ids: number[] | null;
  verse_count?: number;
}

export interface BibleReferenceSearchResponse {
  query: string;
  results: BibleReferenceResult[];
}

export const searchBibleReference = async (
  query: string,
  version = 'ACF'
): Promise<BibleReferenceSearchResponse> => {
  const response = await api.get<BibleReferenceSearchResponse>('/bible/verses/by_reference/', {
    params: { q: query, version },
  });
  return response.data;
};
