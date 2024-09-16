"use client";

import questions from '@/app/data/questions.json';
import { useState } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useMyContext } from "@/app/context/context";

export default function Play() {
    const { points, setPoints } = useMyContext();

    const [currentBlocoIndex, setCurrentBlocoIndex] = useState(0);
    const [currentPerguntaIndex, setCurrentPerguntaIndex] = useState(0);
    const [ultimaPergunta, setUltimaPergunta] = useState(false);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null); // Controle da resposta selecionada
    const [respostaCorreta, setRespostaCorreta] = useState(null); // Controle se a resposta foi correta ou não
    const [clicked, setClicked] = useState(false);

    const currentBloco = questions.blocos[currentBlocoIndex];
    const currentPerguntaObj = currentBloco.perguntas[currentPerguntaIndex];
    const currentPergunta = currentPerguntaObj.pergunta;
    const respostas = currentPerguntaObj.respostas;
    const corretaIndex = currentPerguntaObj.correta;

    const handleNext = () => {
        const isLastQuestionInBlock = currentPerguntaIndex === currentBloco.perguntas.length - 1;
        const isLastBlock = currentBlocoIndex === questions.blocos.length - 1;

        if (isLastQuestionInBlock && isLastBlock) {
            setUltimaPergunta(true);
        } else if (isLastQuestionInBlock) {
            setCurrentBlocoIndex((prevBlocoIndex) => prevBlocoIndex + 1);
            setCurrentPerguntaIndex(0);
        } else {
            setCurrentPerguntaIndex((prevIndex) => prevIndex + 1);
        }

        // Reset estado de seleção de resposta e feedback após mudar de pergunta
        setRespostaSelecionada(null);
        setRespostaCorreta(null);
    };

    const handleAnswerClick = (index) => {
        setRespostaSelecionada(index);
        setRespostaCorreta(index === corretaIndex); // Verifica se a resposta selecionada é a correta
        setPoints(points + (index === corretaIndex ? 1 : 0));
        setClicked(true)
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Bloco {currentBloco.bloco}</h2>
                <p className="text-lg mb-4">{currentPergunta}</p>
                <p>Pontuação: {points}</p>

                <button>
                    <div className="space-y-2">
                        {respostas.map((resposta, index) => (
                            <Card
                                key={index}
                                className={`w-full p-4 cursor-pointer ${respostaSelecionada === index ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => handleAnswerClick(index)}
                            >
                                <CardContent>
                                    <p>{resposta}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </button>

            </div>

            {/* Feedback sobre a resposta correta ou errada */}
            {respostaSelecionada !== null && (
                <div className="mb-4">
                    {respostaCorreta ? (
                        <p className="text-green-500">Resposta Correta!</p>
                    ) : (
                        <p className="text-red-500">Resposta Errada!</p>
                    )}
                </div>
            )}

            {ultimaPergunta ? (
                <Button>
                    <Link href='/'>
                        Finalizar
                    </Link>
                </Button>
            ) : (
                <Button onClick={handleNext} disabled={respostaSelecionada === null}>
                    Próxima Pergunta
                </Button>
            )}
        </section>
    );
}
