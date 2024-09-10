import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";

export default function Ranking() {
    return (
        <section className="m-10">
            <Button>
                <Link href='/'>
                    Voltar
                </Link>
            </Button>

            <Table className="mt-10">
                <TableCaption>...</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Pontuação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Pedro</TableCell>
                        <TableCell>12 Pontos</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </section>
    );
}