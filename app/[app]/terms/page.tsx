import { notFound } from 'next/navigation';
import { loadDocument, loadAllApps } from '@/lib/loadApps';
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
    const app = await loadDocument(appSlug, 'terms');

    if (!app) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: `${app.name} - Terms of Use`,
        description: `Terms of use for ${app.name}. Learn about the conditions for using our application.`,
        openGraph: {
            title: `${app.name} - Terms of Use`,
            description: `Terms of use for ${app.name}`,
            type: 'website',
        },
    };
}

export default async function TermsPage({ params }: PageProps) {
    const { app: appSlug } = await params;
    const app = await loadDocument(appSlug, 'terms');

    if (!app) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-slate-900">{app.name}</h1>
                    <p className="mt-1 text-sm text-slate-600">Terms of Use</p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="mb-4 mt-8 text-2xl font-semibold tracking-tight text-slate-900">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="mb-3 mt-6 text-xl font-semibold text-slate-900">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-4 text-base leading-7 text-slate-700">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-base leading-7 text-slate-700">
                                    {children}
                                </li>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-semibold text-slate-900">{children}</strong>
                            ),
                            em: ({ children }) => (
                                <em className="italic text-slate-700">{children}</em>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700"
                                >
                                    {children}
                                </a>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="my-6 border-l-2 border-slate-300 pl-6 italic text-slate-700">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ children }) => (
                                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-900">
                                    {children}
                                </code>
                            ),
                            hr: () => (
                                <hr className="my-8 border-t border-slate-200" />
                            ),
                        }}
                    >
                        {app.customContent}
                    </ReactMarkdown>

                    {/* Footer */}
                    <div className="mt-12 border-t border-slate-200 pt-6">
                        <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                Last updated: {new Date(app.lastUpdated).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                            <p>
                                Contact: <a href={`mailto:${app.email}`} className="text-blue-600 hover:text-blue-700">{app.email}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
