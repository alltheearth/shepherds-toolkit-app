import { useGetHistoryQuery } from "../../services/contatosApi";
import type { History } from "../../types/history";

const Thead =  ()=> {

    return (
            <thead>
              <tr className="bg-[#FDFEFE] text-[#2C3E50] font-semibold">
                <th className="px-4 py-2 text-left">Contato</th>
                <th className="px-4 py-2 text-left">Última Mensagem</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Prioridade</th>
                <th className="px-4 py-2 text-left">Observações</th>
              </tr>
            </thead>
    )
}

const Tr = ({item}:{item: History}) => {

            return (
                <tr className="bg-white border-b border-[#ECF0F1]">
                <td className="px-4 py-2">{item.nome}</td>
                <td className="px-4 py-2">{item.ultima_mensagem}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-white rounded bg-[#27AE60]">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select className="w-full border border-gray-300 rounded px-2 py-1 focus:border-[#2980B9] focus:ring focus:ring-blue-200">
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <textarea className="w-full border border-gray-300 rounded px-2 py-1 resize-none h-16 focus:border-[#2980B9] focus:ring focus:ring-blue-200"></textarea>
                </td>
            </tr>
)
}

const TableWeek = () => {

    const {data} = useGetHistoryQuery()

    return (
         <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="table-auto w-full border-collapse">
            <Thead />
            <tbody>
              {/* Linha 1 */}
              {data?.map(item => <Tr item={item}/>)}
              {/* Linha 2 */}
              <tr className="bg-[#FAFAFA] border-b border-[#ECF0F1]">
                <td className="px-4 py-2">Maria</td>
                <td className="px-4 py-2">06/08</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-white rounded bg-[#F1C40F]">
                    Pendente
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select className="w-full border border-gray-300 rounded px-2 py-1 focus:border-[#2980B9] focus:ring focus:ring-blue-200">
                    <option>Alta</option>
                    <option selected>Média</option>
                    <option>Baixa</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <textarea className="w-full border border-gray-300 rounded px-2 py-1 resize-none h-16 focus:border-[#2980B9] focus:ring focus:ring-blue-200"></textarea>
                </td>
              </tr>
              {/* Linha 3 */}
              <tr className="bg-white">
                <td className="px-4 py-2">Pedro</td>
                <td className="px-4 py-2">–</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-white rounded bg-[#2980B9]">
                    Novo
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select className="w-full border border-gray-300 rounded px-2 py-1 focus:border-[#2980B9] focus:ring focus:ring-blue-200">
                    <option>Alta</option>
                    <option>Média</option>
                    <option selected>Baixa</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <textarea className="w-full border border-gray-300 rounded px-2 py-1 resize-none h-16 focus:border-[#2980B9] focus:ring focus:ring-blue-200"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}

export default TableWeek