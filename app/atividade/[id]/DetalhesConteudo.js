"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function DetalhesConteudo({ atividadeId }) {
    const [atividade, setAtividade] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [localError, setLocalError] = useState(null);
    
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');
    const [descricao, setDescricao] = useState('');


    const fetchAtividade = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/atividades/${atividadeId}`, { method: 'GET' });
            
            if (response.ok) {
                const data = await response.json();
                setAtividade(data);
                
                setNome(data.nome);
                setData(data.data);
                setInicio(data.inicio);
                setFim(data.fim);
                setDescricao(data.descricao || '');
            } else if (response.status === 404) {
                setAtividade(null);
            } else {
                setLocalError("Erro ao carregar os dados.");
                setAtividade(null); 
            }
        } catch (error) {
            setLocalError("Erro de rede/conexão.");
            setAtividade(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (atividadeId) {
            fetchAtividade();
        } else {
            setIsLoading(false);
        }
    }, [atividadeId]);
    
    const handleUpdateAtividade = async (e) => {
        e.preventDefault();
        setLocalError(null);

        const atividadeAtualizada = { nome, data, inicio, fim, descricao };

        try {
            const response = await fetch(`/api/atividades/${atividadeId}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(atividadeAtualizada),
            });

            if (response.ok) {
                const data = await response.json();
                setAtividade(data); 
                setIsEditing(false); 
                alert("Atividade atualizada com sucesso!");
            } else {
                const err = await response.json();
                setLocalError(`Falha ao atualizar: ${err.error}`);
            }
        } catch (err) {
            setLocalError('Erro de rede ao salvar a atividade.');
        }
    };

    if (isLoading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}><h1>Carregando Detalhes... ⏳</h1></div>;
    }

    if (!atividade || !atividadeId) {
        notFound(); 
    }

    const containerStyle = { maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' };
    const formStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' };

    return (
        <div style={containerStyle}>
            <Link href="/" style={{ display: 'block', marginBottom: '20px', color: 'blue' }}>
                ← Voltar para o Organizador
            </Link>
            
            <h1>Detalhes: {atividade.nome}</h1>
            
            {localError && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{localError}</p>}
            
            <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '10px', backgroundColor: isEditing ? '#FFC107' : '#007BFF', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
                {isEditing ? 'Cancelar Edição' : 'Editar Atividade'}
            </button>

            {isEditing ? (
                <form onSubmit={handleUpdateAtividade} style={formStyle}>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da Atividade" required style={{ padding: '8px', border: '1px solid #ccc', gridColumn: '1 / span 2' }} />
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                    <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} placeholder="Início" style={{ padding: '8px', border: '1px solid #ccc' }} />
                    <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} placeholder="Fim" style={{ padding: '8px', border: '1px solid #ccc' }} />
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" style={{ padding: '8px', border: '1px solid #ccc', gridColumn: '1 / span 2', minHeight: '80px' }} />
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', gridColumn: '1 / span 2' }}>
                        Salvar Alterações
                    </button>
                </form>
            ) : (
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', backgroundColor: '#f0f0f0', color: '#333' }}>
                    <p><strong>ID:</strong> {atividade.id}</p>
                    <p><strong>Data:</strong> {atividade.data}</p>
                    <p><strong>Horário:</strong> {atividade.inicio} — {atividade.fim}</p>
                    <p><strong>Descrição:</strong> {atividade.descricao || 'Nenhuma descrição fornecida.'}</p>
                </div>
            )}
        </div>
    );
}