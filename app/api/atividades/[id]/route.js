import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// BUSCAR DETALHE ESPECÍFICO (GET)
export async function GET(request, { params }) {
    // CORREÇÃO: Resolve o objeto params para obter o ID
    const { id: atividadeId } = await params; 
    
    if (!atividadeId) {
        return NextResponse.json({ error: 'ID da atividade ausente.' }, { status: 400 });
    }

    try {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: atividadeId,
            },
        });

        if (!atividade) {
            return NextResponse.json({ error: 'Atividade não encontrada.' }, { status: 404 });
        }
        return NextResponse.json(atividade, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno ao buscar atividade.' }, { status: 500 });
    }
}

// ATUALIZAR ATIVIDADE (PUT)
export async function PUT(request, { params }) {
    // CORREÇÃO: Resolve o objeto params para obter o ID
    const { id: atividadeId } = await params; 
    
    if (!atividadeId) {
        return NextResponse.json({ error: 'ID da atividade ausente.' }, { status: 400 });
    }
    
    try {
        const body = await request.json();
        const { nome, data, inicio, fim, descricao } = body;

        if (!nome || !data) {
            return NextResponse.json({ error: 'Nome e data são obrigatórios.' }, { status: 400 });
        }
        
        const atividadeAtualizada = await prisma.atividade.update({
            where: {
                id: atividadeId,
            },
            data: {
                nome,
                data,
                inicio,
                fim,
                descricao: descricao || '',
            },
        });

        return NextResponse.json(atividadeAtualizada, { status: 200 });
    } catch (error) {
        if (error.code === 'P2025') {
             return NextResponse.json({ error: 'Atividade não encontrada para atualização.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Falha ao atualizar a atividade.' }, { status: 500 });
    }
}

// EXCLUIR ATIVIDADE (DELETE)
export async function DELETE(request, { params }) {
    // CORREÇÃO: Resolve o objeto params para obter o ID
    const { id: atividadeId } = await params; 

    if (!atividadeId) {
        return NextResponse.json({ error: 'ID da atividade ausente para exclusão.' }, { status: 400 });
    }
    
    try {
        await prisma.atividade.delete({
            where: {
                id: atividadeId,
            },
        });
        return new Response(null, { status: 204 }); 
    } catch (error) {
        if (error.code === 'P2025') {
             return NextResponse.json({ error: 'Atividade não encontrada para exclusão.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Falha ao excluir a atividade.' }, { status: 500 });
    }
}