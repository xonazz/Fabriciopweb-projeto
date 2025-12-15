import DetalhesConteudo from './DetalhesConteudo'; 

// CRÍTICO: Usa 'async' e 'await' para resolver o objeto params
export default async function DetalhesAtividade({ params }) {
    
    const resolvedParams = await params;
    
    // Passa o ID para o componente cliente
    return <DetalhesConteudo atividadeId={resolvedParams.id} />;
}