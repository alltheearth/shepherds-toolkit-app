
import Header from './containers/Header';
import Navigation from './containers/Navigation';
import Sidebar from './containers/Sidebar';
import SearchAndStats from './containers/SearchAndStats';
import MessagesList from './containers/MessagesList';
import Contacts from './containers/Contacts';
import AppointmentBook from './containers/AppointmentBook';
import { useState } from 'react';



const Koinonia = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />


      <div className="flex">
        {/* Sidebar - Categories */}
        {activeTab === 'dashboard' && ( <Sidebar />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="p-6">
              {/* Search and Stats */}
              <SearchAndStats />
              {/* Messages List */}
              <MessagesList  />
            </div>
          )}

          {activeTab === 'contatos' && (
            <Contacts />
          )}

          {activeTab === 'agenda' && (
            <AppointmentBook />
          )}
        </div>
      </div>
    </div>
  );
};

export default Koinonia;