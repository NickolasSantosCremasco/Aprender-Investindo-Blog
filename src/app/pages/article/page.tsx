'use client'

import { Suspense } from "react"
import Article from "@/app/components/Article"

export default function Page() {
    
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Article />
        </Suspense>
    )
  
}