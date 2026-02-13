import { notFound } from 'next/navigation';
import { loadAppBySlug, loadAllApps } from '@/lib/loadApps';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

interface PageProps {
    params: Promise<{ app: string }>;
}

// Generate static params for all apps at build time
export async function generateStaticParams() {
    const apps = await loadAllApps();

    return apps.map((app) => ({
        app: app.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { app: appSlug } = await params;
    const app = await loadAppBySlug(appSlug);

    if (!app) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: `${app.name} - Privacy Policy`,
        description: `Privacy policy for ${app.name}. Learn about how we collect, use, and protect your data.`,
        openGraph: {
            title: `${app.name} - Privacy Policy`,
            description: `Privacy policy for ${app.name}`,
            type: 'website',
        },
    };
}

export default async function PrivacyPage({ params }: PageProps) {
    const { app: appSlug } = await params;
    const app = await loadAppBySlug(appSlug);

    if (!app) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:mb-8">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="mb-4 mt-10 text-xl font-bold leading-snug text-gray-900 sm:text-2xl md:mb-5 md:mt-12">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="mb-3 mt-6 text-lg font-semibold leading-snug text-gray-800 sm:text-xl md:mb-4 md:mt-8">
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4 text-base leading-relaxed text-gray-800 sm:leading-loose md:mb-5">
                                {children}
                            </p>
                        ),
                        ul: ({ children }) => (
                            <ul className="mb-5 space-y-2 md:mb-6">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="mb-5 space-y-2 md:mb-6">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="ml-5 list-disc text-base leading-relaxed text-gray-800 sm:ml-6 sm:leading-loose">
                                {children}
                            </li>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-bold text-gray-900">{children}</strong>
                        ),
                        em: ({ children }) => (
                            <em className="italic text-gray-700">{children}</em>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 underline decoration-2 underline-offset-2 transition-colors hover:text-blue-700"
                            >
                                {children}
                            </a>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-50 py-3 pl-4 pr-3 italic text-gray-800 sm:pl-5 sm:pr-4 md:my-8">
                                {children}
                            </blockquote>
                        ),
                        code: ({ children }) => (
                            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800">
                                {children}
                            </code>
                        ),
                        hr: () => (
                            <hr className="my-8 border-t border-gray-300 md:my-10" />
                        ),
                    }}
                >
                    {app.customContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
