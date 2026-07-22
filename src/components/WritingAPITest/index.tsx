import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DebugWritingAPI = () => {
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const addResult = (test, success, message, data = null) => {
    setResults(prev => [...prev, { test, success, message, data, time: new Date().toLocaleTimeString() }]);
  };

  const runTests = async () => {
    setResults([]);
    setTesting(true);

    try {
      // Teste 1: Verificar Token
      const token = localStorage.getItem('token');
      if (!token) {
        addResult('Token', false, 'Token não encontrado no localStorage');
        setTesting(false);
        return;
      }
      addResult('Token', true, `Token encontrado: ${token.substring(0, 15)}...`);

      // Teste 2: Verificar User
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        addResult('User', true, `Usuário: ${userData.username || userData.email}`);
      } else {
        addResult('User', false, 'Usuário não encontrado no localStorage');
      }

      // Teste 3: Listar Escritos
      try {
        const listResponse = await fetch(`${import.meta.env.VITE_API_URL}/writings/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (listResponse.ok) {
          const data = await listResponse.json();
          const writings = data.results || data;
          addResult('Listar Escritos', true, `${writings.length} escritos encontrados`, writings);
        } else {
          const error = await listResponse.text();
          addResult('Listar Escritos', false, `Erro ${listResponse.status}: ${error}`);
        }
      } catch (error) {
        addResult('Listar Escritos', false, error.message);
      }

      // Teste 4: Criar Escrito
      const testWriting = {
        title: `Teste Debug ${Date.now()}`,
        content: 'Conteúdo de teste',
        base_text: 'João 3:16',
        preached_date: new Date().toISOString().split('T')[0],
        type: 'sermao',
        tags: ['teste', 'debug'],
        status: 'draft'
      };

      try {
        const createResponse = await fetch(`${import.meta.env.VITE_API_URL}/writings/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testWriting)
        });

        if (createResponse.ok) {
          const created = await createResponse.json();
          addResult('Criar Escrito', true, `Escrito criado com ID: ${created.id}`, created);

          // Teste 5: Verificar se foi salvo
          const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/writings/${created.id}/`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (verifyResponse.ok) {
            const verified = await verifyResponse.json();
            addResult('Verificar Escrito', true, 'Escrito encontrado no banco!', verified);

            // Teste 6: Deletar escrito de teste
            const deleteResponse = await fetch(`${import.meta.env.VITE_API_URL}/writings/${created.id}/`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (deleteResponse.ok) {
              addResult('Deletar Escrito', true, 'Escrito de teste deletado com sucesso');
            } else {
              addResult('Deletar Escrito', false, `Erro ao deletar: ${deleteResponse.status}`);
            }
          } else {
            addResult('Verificar Escrito', false, 'Escrito NÃO encontrado após criação!');
          }
        } else {
          const error = await createResponse.text();
          addResult('Criar Escrito', false, `Erro ${createResponse.status}: ${error}`);
        }
      } catch (error) {
        addResult('Criar Escrito', false, error.message);
      }

    } catch (error) {
      addResult('Erro Geral', false, error.message);
    }

    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🔍 Debug - API de Escritos
          </h1>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Este componente testa toda a cadeia de autenticação e CRUD de escritos.
            </p>

            <button
              onClick={runTests}
              disabled={testing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {testing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Testando...
                </>
              ) : (
                'Executar Testes'
              )}
            </button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Resultados:</h2>

              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    result.success
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.success ? (
                      <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                    ) : (
                      <XCircle className="text-red-600 flex-shrink-0" size={24} />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {result.test}
                        </h3>
                        <span className="text-xs text-gray-500">{result.time}</span>
                      </div>

                      <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                        {result.message}
                      </p>

                      {result.data && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                            Ver detalhes
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && !testing && (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Clique no botão acima para executar os testes</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Informações Importantes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Certifique-se de estar logado antes de executar os testes</li>
            <li>• Verifique se a API está rodando em: {import.meta.env.VITE_API_URL}</li>
            <li>• Os testes criarão e deletarão um escrito de teste automaticamente</li>
            <li>• Abra o Console do navegador (F12) para ver logs detalhados</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebugWritingAPI;
