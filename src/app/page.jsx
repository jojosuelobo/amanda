"use client";

import { useMyContext } from "@/app/context/context";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

import logo from '@/app/images/worldFlag.png';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const { nome, setNome } = useMyContext();
  const [selectNicknameScreen, setSelectNicknameScreen] = useState(false)

  return (
      <section className="flex flex-col justify-center items-center h-screen bg-bg">
        <Image src={logo} alt="logo" className="w-[30%] h-auto max-w-full animate-spin-slow m-8" />
        <div>
          {
            selectNicknameScreen ? (
              <div className="m-4 flex flex-col gap-8">
                <Input type="text" placeholder="Nome" required onChange={(e) => setNome(e.target.value)} />
                {
                  nome ? (
                    <Button>
                      <Link href='/play'>
                        Começar
                      </Link>
                    </Button>

                  ) : (
                    <Button disabled>
                      Começar
                    </Button>
                  )
                }
                <Button onClick={() => setSelectNicknameScreen(false)}>
                  Voltar
                </Button>
              </div>
            ) : (
              <div className="m-4 flex flex-col gap-8">
                <Button onClick={() => setSelectNicknameScreen(true)}>
                  Jogar
                </Button>
                <Button>
                  <Link href='/ranking'>
                    Ranking
                  </Link>
                </Button>
              </div>
            )
          }
        </div>
      </section>
  );
}
