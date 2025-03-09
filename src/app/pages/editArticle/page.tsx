'use client';

import { Suspense } from "react";
import EditArticle from "@/app/components/EditArticle";

export default function Page() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <EditArticle />
        </Suspense>
    )
}