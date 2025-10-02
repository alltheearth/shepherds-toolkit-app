import { Container } from "@mui/material";
import { Bell, MessageSquare, User } from "lucide-react";
import { messages } from "../../database/mocks/db";


export default function Header() {
  
  const totalUnread = messages.reduce((sum, msg) => sum + msg.unread, 0);
  
  return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Koinonia</h1>
              </div>
              <span className="text-sm text-gray-500">Dashboard Pastoral Inteligente</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalUnread}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Pastor João</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
