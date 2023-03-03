import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Homepage } from '../hybrid/components/pages/homepage/homepage.page';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const dehydratedState = window.__REACT_QUERY_STATE__

const hydrateSections = () => {
    const sectionsToHydrate = [...document.querySelectorAll('div[data-should-hydrate=true]') as never];

    sectionsToHydrate.forEach(wrapperToHydrate => {
        hydrateRoot(wrapperToHydrate,
            <QueryClientProvider client={queryClient}>
                <Hydrate state={dehydratedState}>
                    <Homepage/>
                </Hydrate>
            </QueryClientProvider>
        )
    })
}

hydrateSections();