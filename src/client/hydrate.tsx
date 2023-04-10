import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Homepage } from '../hybrid/components/pages/homepage/homepage.page';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

const hydrateSections = () => {
    const sectionsToHydrate = [...document.querySelectorAll('div[data-should-hydrate=true]') as never];

    sectionsToHydrate.forEach(wrapperToHydrate => {
        hydrateRoot(wrapperToHydrate,
            <QueryClientProvider client={queryClient}>
                <Homepage/>
            </QueryClientProvider>
        )
    })
}

hydrateSections();