"use client";

import { useMyContext } from "@/app/context/context";
import { useState } from 'react';
import Image from "next/image";

import logo from '@/app/images/worldFlag.png';

import { Button } from "@/components/ui/button"

export default function Home() {
  const { nome, setNome } = useMyContext();
  const [selectNicknameScreen, setSelectNicknameScreen] = useState(false)

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <Image src={logo} alt="logo" className="w-[30%] h-auto max-w-full animate-spin-slow m-8" />
        <div>
          {
            selectNicknameScreen ? (
              <div className="m-4 flex flex-col gap-8"> 
                <input type="text" placeholder="username" required onChange={(e) => setNome(e.target.value)} />
                {
                  nome ? (
                    // on click navigate to play
                    <button>
                      Começar
                    </button>
                  ) : (
                    <button disabled>
                      Começar
                    </button>
                  )
                }
                <button onClick={() => setSelectNicknameScreen(false)}>
                  Voltar
                </button>
              </div>
            ) : (
              <div onClick={() => setSelectNicknameScreen(true)} className="m-4 flex flex-col gap-8">
                <Button>
                  Jogar
                </Button>
                <button>
                  Ranking
                </button>
              </div>
            )
          }
        </div>
      </section>
    </>
  );
}
