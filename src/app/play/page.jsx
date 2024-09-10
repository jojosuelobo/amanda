"use client";

import questions from '@/app/data/questions.json';
import { useState } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Play() {
    const [currentBlocoIndex, setCurrentBlocoIndex] = useState(0);
    const [currentPerguntaIndex, setCurrentPerguntaIndex] = useState(0);
    const [ultimaPergunta, setUltimaPergunta] = useState(false);

    const currentBloco = questions.blocos[currentBlocoIndex];
    const currentPergunta = currentBloco.perguntas[currentPerguntaIndex];

    const handleNext = () => {
        // Verifica se estamos na última pergunta do último bloco
        const isLastQuestionInBlock = currentPerguntaIndex === currentBloco.perguntas.length - 1;
        const isLastBlock = currentBlocoIndex === questions.blocos.length - 1;

        if (isLastQuestionInBlock && isLastBlock) {
            // Redireciona para a página inicial se for a última pergunta do último bloco
            setUltimaPergunta(true);
        } else if (isLastQuestionInBlock) {
            // Avança para o próximo bloco se for a última pergunta do bloco atual
            setCurrentBlocoIndex((prevBlocoIndex) => prevBlocoIndex + 1);
            setCurrentPerguntaIndex(0); // Reseta para a primeira pergunta do próximo bloco
        } else {
            // Avança para a próxima pergunta dentro do mesmo bloco
            setCurrentPerguntaIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Bloco {currentBloco.bloco}</h2>
                <p className="text-lg">{currentPergunta}</p>
            </div>
            {
                ultimaPergunta ? (
                    <Button>
                        <Link href='/'>
                            Finalizar
                        </Link>
                    </Button>
                ) : (
                    <Button onClick={handleNext}>Próxima Pergunta</Button>
                )
            }
        </section>
    );
}