const PaginationBar = () => {
    return (
         <div className="flex items-center justify-between mb-6">
          <button className="px-4 py-2 border border-[#2980B9] text-[#2980B9] rounded-md hover:bg-[#ECF0F1] transition">
            ⬅ Semana anterior
          </button>
          <h2
            className="text-xl font-bold text-[#2C3E50]"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Semana de 05/08/2025
          </h2>
          <button className="px-4 py-2 bg-[#2980B9] text-white rounded-md hover:bg-[#21618C] transition">
            Semana seguinte ➡
          </button>
        </div>
    )
}

export default PaginationBar