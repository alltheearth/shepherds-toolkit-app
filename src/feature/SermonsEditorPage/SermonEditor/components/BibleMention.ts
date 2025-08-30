// import { Mention as BaseMention } from '@tiptap/extension-mention'


// import { SuggestionItem } from '@tiptap/suggestion'

// // Tipagem explícita para os itens
// type BibleMentionItem = SuggestionItem & {
//   id: string
//   label?: string
// }



// function normalizaLivro(abreviacao: string) {
//   const mapa: Record<string, string> = {
//     gn: 'genesis',
//     ex: 'exodo',
//     lv: 'levitico',
//     nm: 'numeros',
//     dt: 'deuteronomio',
//     js: 'josue',
//     lc: 'lucas',
//     mt: 'mateus',
//     mc: 'marcos',
//     jo: 'joao',
//     rm: 'romanos',
//     // ...adicione mais conforme necessário
//   }
//   return mapa[abreviacao.toLowerCase()] || abreviacao.toLowerCase()
// }

// async function fetchBibleText(livro: string, cap: string, vers: string, versao: string) {
//   const url = `http://localhost:3000/api/bible/${versao}/${livro}/${cap}/${vers}`
//   const res = await fetch(url)
//   const data = await res.json()
//   return data.text || '[versículo não encontrado]'
// }

// function parseReferencia(ref: string) {
//   // @lc:1-3:nvi:quote
//   const regex = /^@?([a-z]{2,})(?::)?(\d+):(\d+(?:-\d+)?)(?::(\w+))?(?::(quote))?$/i
//   const match = ref.match(regex)

//   if (!match) {
//     return { livro: 'gn', cap: '1', vers: '1', versao: 'nvi', quote: false }
//   }

//   const [, livro, cap, vers, versao = 'nvi', quote] = match
//   return { livro: normalizaLivro(livro), cap, vers, versao, quote: !!quote }
// }


// async function inserirVersiculo(
//   referencia: string,
//   runCommand: (item: BibleMentionItem) => void
// ) {
//   const { livro, cap, vers, versao, quote } = parseReferencia(referencia)
//   const texto = await fetchBibleText(livro, cap, vers, versao)

//   const label = quote
//     ? `> ${texto} (${livro.toUpperCase()} ${cap}:${vers})`
//     : `${texto} (${livro.toUpperCase()} ${cap}:${vers})`

//   runCommand({ id: referencia, label })
// }


// export const BibleMention = BaseMention.extend({
//   name: 'bibleMention',

//   addOptions() {
//     return {
//       ...this.parent?.(),
//       suggestion: {
//         char: '@',
//         items: ({ query }: { query: string }) => {
//           // Aqui detectamos apenas se o padrão parece válido
//           const pattern = /^([a-z]{2,}):?\d+:\d+(-\d+)?(?::\w+)?$/i
//           return pattern.test(query)
//             ? [{ id: query, label: query }]
//             : []
//         },
//         render: () => {
//   let runCommand: ((item: BibleMentionItem) => void) | null = null
//   let currentItem: BibleMentionItem | null = null

//   return {
//     onStart: ({ items, command }: { items: BibleMentionItem[]; command: (item: BibleMentionItem) => void }) => {
//       runCommand = command
//       currentItem = items?.[0] ?? null
//     },
//     onUpdate: ({ items, command }: { items: BibleMentionItem[]; command: (item: BibleMentionItem) => void }) => {
//       runCommand = command
//       currentItem = items?.[0] ?? null
//     },
//     onKeyDown: ({ event }: { event: KeyboardEvent }) => {
//       if ((event.key === 'Enter' || event.key === 'Tab') && runCommand && currentItem) {
//         event.preventDefault()
//         inserirVersiculo(currentItem.id, runCommand)
//         return true
//       }
//       return false
//     },
//     onExit: () => {
//       runCommand = null
//       currentItem = null
//     }
//   }
// },

//   renderLabel({ node }) {
//     return node.attrs.label ?? `@${node.attrs.id}`
//   },

//   renderHTML({ node }) {
//     return [
//       'span',
//       { class: 'mention bible' },
//       node.attrs.label ?? `@${node.attrs.id}`
//     ]
//   },
// })
