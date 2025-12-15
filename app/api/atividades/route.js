import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// LISTAR ATIVIDADES (GET)
export async function GET() {
    try {
        const atividades = await prisma.atividade.findMany({
            orderBy: {
                data: 'asc', 
            },
        });
        return NextResponse.json(atividades, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar atividades.' }, { status: 500 });
    }
}

// CRIAR NOVA ATIVIDADE (POST)
export async function POST(request) {
    try {
        const body = await request.json();
        const { nome, data, inicio, fim, descricao } = body;

        if (!nome || !data) {
            return NextResponse.json({ error: 'Nome e data são obrigatórios.' }, { status: 400 });
        }

        const novaAtividade = await prisma.atividade.create({
            data: {
                nome,
                data,
                inicio: inicio || '',
                fim: fim || '',
                descricao: descricao || '',
            },
        });

        return NextResponse.json(novaAtividade, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao criar a atividade.' }, { status: 500 });
    }
}