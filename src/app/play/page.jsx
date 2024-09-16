"use client";

import questions from '@/app/data/questions.json';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { useMyContext } from "@/app/context/context";
import Confetti from 'react-confetti'; // Importar a lib de confetes

export default function Play() {
    const { points, setPoints } = useMyContext();

    const [currentBlocoIndex, setCurrentBlocoIndex] = useState(0);
    const [currentPerguntaIndex, setCurrentPerguntaIndex] = useState(0);
    const [ultimaPergunta, setUltimaPergunta] = useState(false);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [respostaCorreta, setRespostaCorreta] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [feedbackVisible, setFeedbackVisible] = useState(false);

    const currentBloco = questions.blocos[currentBlocoIndex];
    const currentPerguntaObj = currentBloco.perguntas[currentPerguntaIndex];
    const currentPergunta = currentPerguntaObj.pergunta;
    const respostas = currentPerguntaObj.respostas;
    const corretaIndex = currentPerguntaObj.correta;

    useEffect(() => {
        let timer;
        if (clicked) {
            timer = setTimeout(() => {
                handleNext();
            }, 5000); // 5 segundos para ir para a próxima pergunta
        }
        return () => clearTimeout(timer); // Limpa o timer ao sair do efeito
    }, [clicked]);

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
        setClicked(false);
        setFeedbackVisible(false);
    };

    const handleAnswerClick = (index) => {
        setRespostaSelecionada(index);
        const isCorrect = index === corretaIndex;
        setRespostaCorreta(isCorrect); // Verifica se a resposta selecionada é a correta
        setPoints(points + (isCorrect ? 1 : 0));
        setClicked(true);
        setFeedbackVisible(true);
    };

    // Definir a classe de background com base na resposta correta ou incorreta
    const backgroundClass = clicked
        ? respostaCorreta
            ? "bg-green-500" // Verde para resposta correta
            : "bg-red-500"   // Vermelho para resposta incorreta
        : "bg-white";         // Branco por padrão

    return (
        <section className={`flex flex-col items-center justify-center h-screen transition-colors duration-500 ${backgroundClass}`}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Bloco {currentBloco.bloco}</h2>
                <p className="text-lg mb-4">{currentPergunta}</p>
                <p>Pontuação: {points}</p>

                <div className="space-y-2">
                    {respostas.map((resposta, index) => (
                        <Card
                            key={index}
                            className={`w-full p-4 ${respostaSelecionada === index ? "bg-gray-200" : ""
                                } ${clicked ? "pointer-events-none" : "cursor-pointer"}`} // Desativa o clique após selecionar
                            onClick={() => handleAnswerClick(index)}
                        >
                            <CardContent>
                                <p>{resposta}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Feedback sobre a resposta correta ou errada */}
            {feedbackVisible && (
                <div className="mb-4">
                    {respostaCorreta ? (
                        <p className="text-green-500">ACERTOU!</p>
                    ) : (
                        <p className="text-red-500">ERROU!</p>
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
                <Button onClick={handleNext} disabled={clicked}>
                    Próxima Pergunta
                </Button>
            )}

            {/* Mostrar confetes se a resposta estiver correta */}
            {respostaCorreta && (
                <Confetti
                    numberOfPieces={300} // Quantidade de confetes
                />
            )}
        </section>
    );
}
