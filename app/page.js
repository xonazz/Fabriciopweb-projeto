"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [atividades, setAtividades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState(null);

    const fetchAtividades = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/atividades', { method: 'GET' });
            
            if (response.ok) {
                const data = await response.json();
                setAtividades(data);
                setError(null);
            } else {
                const err = await response.json();
                setError(`Erro ao carregar atividades: ${err.error}`);
                setAtividades([]);
            }
        } catch (err) {
            setError('Erro de rede ao conectar com o backend.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAtividades();
    }, []);

    const handleAdicionarAtividade = async (e) => {
        e.preventDefault();
        setError(null);

        const novaAtividade = { nome, data, inicio, fim, descricao };

        try {
            const response = await fetch('/api/atividades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaAtividade),
            });

            if (response.ok) {
                await fetchAtividades();
                setNome('');
                setData('');
                setInicio('');
                setFim('');
                setDescricao('');
            } else {
                const err = await response.json();
                setError(`Falha ao adicionar: ${err.error}`);
            }
        } catch (err) {
            setError('Erro de rede ao salvar a atividade.');
        }
    };

    const handleExcluirAtividade = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta atividade?")) return;

        try {
            const response = await fetch(`/api/atividades/${id}`, {
                method: 'DELETE',
            });

            // Status 204 (No Content) ou 200 (OK) indicam sucesso
            if (response.status === 204 || response.status === 200) {
                await fetchAtividades(); 
            } else {
                const err = await response.json();
                setError(`Falha ao excluir: ${err.error}`);
            }
        } catch (err) {
            setError('Erro de rede ao excluir a atividade.');
        }
    };

    const estiloContainer = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    };

    return (
        <div style={estiloContainer}>
            <h1>📅 Organizador de Atividades</h1>
            
            <h2>Nova Atividade</h2>
            {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{error}</p>}
            
            <form onSubmit={handleAdicionarAtividade} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px' }}>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da Atividade (Obrigatório)" required style={{ padding: '8px', border: '1px solid #ccc', gridColumn: '1 / span 2' }} />
                <input type="date" value={data} onChange={(e) => setData(e.target.value)} required style={{ padding: '8px', border: '1px solid #ccc' }} />
                <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} placeholder="Início" style={{ padding: '8px', border: '1px solid #ccc' }} />
                <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} placeholder="Fim" style={{ padding: '8px', border: '1px solid #ccc' }} />
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição (Opcional)" style={{ padding: '8px', border: '1px solid #ccc', gridColumn: '1 / span 2', minHeight: '80px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', gridColumn: '1 / span 2' }}>
                    Adicionar Atividade
                </button>
            </form>

            <h2>Próximas Atividades</h2>
            
            {isLoading && <p>Carregando lista...</p>}

            {!isLoading && atividades.length === 0 && (
                <p>Nenhuma atividade agendada. Adicione uma nova acima!</p>
            )}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {atividades.map((atividade) => (
                    <li key={atividade.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '15px', 
                        marginBottom: '10px', 
                        borderRadius: '4px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}>
                        <div>
                            <strong>{atividade.nome}</strong> 
                            <span style={{ marginLeft: '10px', color: '#666' }}>({atividade.data} {atividade.inicio})</span>
                        </div>
                        <div>
                            <Link href={`/atividade/${atividade.id}`} style={{ marginRight: '10px', color: 'blue', textDecoration: 'none' }}>
                                Ver Detalhes/Editar
                            </Link>
                            <button onClick={() => handleExcluirAtividade(atividade.id)} style={{ 
                                padding: '5px 10px', 
                                backgroundColor: '#f44336', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer' 
                            }}>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}