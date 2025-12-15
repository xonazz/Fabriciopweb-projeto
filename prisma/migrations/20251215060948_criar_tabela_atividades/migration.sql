-- CreateTable
CREATE TABLE "public"."Atividade" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "inicio" TEXT NOT NULL,
    "fim" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);
