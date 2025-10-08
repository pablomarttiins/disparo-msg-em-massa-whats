import { useState } from 'react';
import { Contact } from '../types';
import { formatPhoneNumber } from '../utils/phoneUtils';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactList({ contacts, loading, onEdit, onDelete }: ContactListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" role="status" aria-label="Carregando contatos">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderBottomColor: 'var(--astra-dark-blue)' }}></div>
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Nenhum contato encontrado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200" role="table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Telefone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Atualizado em
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {contact.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPhoneNumber(contact.telefone)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {contact.email || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {contact.categoria ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ color: 'var(--astra-dark-blue)', backgroundColor: 'rgba(30, 58, 95, 0.1)' }}>
                    {contact.categoria.nome}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(contact.atualizadoEm)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(contact)}
                    className="hover:opacity-80 focus:outline-none focus:underline transition-opacity"
                    style={{ color: 'var(--astra-dark-blue)' }}
                    aria-label={`Editar contato ${contact.nome}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className={`focus:outline-none focus:underline ${
                      deleteConfirm === contact.id
                        ? 'text-red-800 font-semibold'
                        : 'text-red-600 hover:text-red-900'
                    }`}
                    aria-label={
                      deleteConfirm === contact.id
                        ? `Confirmar exclusão de ${contact.nome}`
                        : `Excluir contato ${contact.nome}`
                    }
                  >
                    {deleteConfirm === contact.id ? 'Confirmar?' : 'Excluir'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}