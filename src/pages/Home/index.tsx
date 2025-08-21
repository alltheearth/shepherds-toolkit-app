import React from "react";
import PaginationBar from "../../components/PaginationBar";
import TableWeek from "../../components/TableWeek";

// Fonts (no index.html você deve importar do Google Fonts):
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@700&display=swap" rel="stylesheet">

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ECF0F1] font-['Inter'] text-[#34495E]">
      {/* Header */}
      {/* <header className="bg-[#2C3E50] text-white px-6 py-4">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Koinonia
        </h1>
      </header> */}

      {/* Container principal */}
      <main className="max-w-5xl mx-auto p-6 md:p-10">
        {/* Semana */}
       
        <PaginationBar />
        {/* Tabela */}
       <TableWeek />
      </main>
    </div>
  );
}
