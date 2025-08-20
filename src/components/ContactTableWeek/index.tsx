// src/components/ContactTableWeek.tsx
import React from "react";

interface Contact {
  id: number;
  name: string;
  date: string; // data agendada
  type: string; // tipo de compromisso (ex: reunião, visita, pregação)
}

const contacts: Contact[] = [
  { id: 1, name: "Maria Silva", date: "Segunda-feira", type: "Visita" },
  { id: 2, name: "João Pereira", date: "Terça-feira", type: "Reunião" },
  { id: 3, name: "Carlos Souza", date: "Quarta-feira", type: "Culto" },
  { id: 4, name: "Ana Costa", date: "Sexta-feira", type: "Hospital" },
];

const ContactTableWeek: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">{contact.name}</h2>
          <p className="text-sm text-gray-500">{contact.date}</p>
          <p className="mt-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {contact.type}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactTableWeek;
