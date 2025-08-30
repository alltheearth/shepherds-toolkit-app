// BibleReferenceExtension.ts
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export const BibleReferenceExtension = Extension.create({
  name: 'bibleReference',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('bibleReference'),

        props: {
          handleTextInput(view, from, to, text) {
            const fullText = view.state.doc.textBetween(0, view.state.doc.content.size, ' ')
            const regex = /@([a-z]{2,})(\d+):(\d+(?:-\d+)?)(?::(\w+))?(?::(quote))?/gi
            let match
            while ((match = regex.exec(fullText)) !== null) {
              const [full, livro, cap, vers, versao = 'nvi', quote] = match

              const start = fullText.lastIndexOf(full)
              const end = start + full.length

              // Substitui por marcador temporário
              view.dispatch(
                view.state.tr.insertText(`⌛ Buscando ${livro}${cap}:${vers} (${versao})...`, start, end)
              )

              // Lógica async fora do plugin (para não travar)
              fetchBibleText(livro, cap, vers, versao)
                .then((texto) => {
                  const finalText = quote
                    ? `> ${texto} (${livro.toUpperCase()} ${cap}:${vers})`
                    : `${texto} (${livro.toUpperCase()} ${cap}:${vers})`

                  const currentText = view.state.doc.textBetween(start, start + finalText.length + 30, ' ')

                  if (currentText.includes('⌛')) {
                    view.dispatch(
                      view.state.tr.insertText(finalText, start, start + full.length)
                    )
                  }
                })

              return false
            }

            return false
          }
        }
      })
    ]
  }
})

// 👉 Função auxiliar para normalizar o nome e buscar da API
async function fetchBibleText(livro: string, cap: string, vers: string, versao: string) {
  const livroNormalizado = normalizaLivro(livro) // ex: "lc" → "lucas"
  const url = `http://localhost:3000/api/bible/${versao}/${livroNormalizado}/${cap}/${vers}`

  const res = await fetch(url)
  const data = await res.json()
  return data.text || '[versículo não encontrado]'
}

// 👉 Normalizador simples de abreviações
function normalizaLivro(abreviacao: string) {
  const mapa: Record<string, string> = {
    gn: 'genesis',
    ex: 'exodo',
    lc: 'lucas',
    mt: 'mateus',
    jo: 'joao',
    // Adicione outros conforme necessário
  }
  return mapa[abreviacao.toLowerCase()] || abreviacao.toLowerCase()
}
