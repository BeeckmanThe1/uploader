import React, {AllHTMLAttributes} from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {Homepage} from '../../hybrid/components/pages/homepage/homepage.page';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const HtmlTags = {
    html: 'html',
    meta: 'meta',
    title: 'title',
    head: 'head',
    body: 'body',
    script: 'script'
} as const
type HtmlTag = typeof HtmlTags[keyof typeof HtmlTags]
type HtmlTagProps = { Tag: HtmlTag, children?: React.ReactNode } & AllHTMLAttributes<HTMLElement>
const HtmlTag: React.FC<HtmlTagProps> = ({Tag, children, ...rest}) => {
    return <Tag {...rest}>{children}</Tag>
}

export const getBasicSkeleton = () => {
    const htmlVersion = '<!DOCTYPE html>'
    const fontAwesomeScript = '<script src="https://kit.fontawesome.com/c4f1fd5c3a.js" crossorigin="anonymous"></script>'
    const queryClient = new QueryClient()

    const html = ReactDOMServer.renderToString(<HtmlTag Tag={HtmlTags.html} lang="en">
            <HtmlTag Tag={HtmlTags.head}>
                <link rel="stylesheet" href="/_index.min.css"/>
                <HtmlTag Tag={HtmlTags.meta} charSet="UTF-8"/>
                <HtmlTag Tag={HtmlTags.meta} name={'description'}
                         content={'This page lets you upload and save any img you want for later visit!'}/>
                <HtmlTag Tag={HtmlTags.title}>Img Uploader | safe your images for ever!</HtmlTag>
                <HtmlTag Tag={HtmlTags.meta} name="viewport" content="width=device-width,initial-scale=1"/>
            </HtmlTag>
            <HtmlTag Tag={HtmlTags.body}>
                <QueryClientProvider client={queryClient}>
                    <div data-should-hydrate={true}>
                        <Homepage/>
                    </div>
                </QueryClientProvider>
                <HtmlTag Tag={HtmlTags.script} src={'./hydrate.js'}/>
            </HtmlTag>
        </HtmlTag>
    );

    return `${htmlVersion}
    ${html}
    ${fontAwesomeScript}`;
}