import Link from 'next/link';
import { loadAllApps } from '@/lib/loadApps';
import { CopyButton } from './components/CopyButton';

export default async function HomePage() {
    const apps = await loadAllApps();
    const baseUrl = 'https://app-legal-hub.github.io';

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Legal Documents
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Access and share legal documents for your applications
                    </p>
                </div>

                {/* Apps Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {apps.map((app) => {
                        const privacyUrl = `${baseUrl}/${app.slug}/privacy`;

                        return (
                            <div
                                key={app.slug}
                                className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Card Header */}
                                <div className="flex items-start gap-4 border-b border-slate-100 p-6">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-slate-900 text-lg font-semibold text-white">
                                        {app.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {app.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500 truncate">
                                            {app.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Documents List */}
                                <div className="p-6 space-y-2">
                                    {/* Privacy Policy */}
                                    <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100">
                                        <Link
                                            href={`/${app.slug}/privacy`}
                                            className="flex flex-1 items-center gap-3 min-w-0"
                                        >
                                            <svg
                                                className="h-4 w-4 flex-shrink-0 text-slate-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium text-slate-700 hover:text-slate-900">
                                                Privacy Policy
                                            </span>
                                        </Link>
                                        <CopyButton url={privacyUrl} />
                                    </div>

                                    {/* Future documents - commented out for now */}
                                    {/* 
                                    <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 opacity-50">
                                        <div className="flex items-center gap-3">
                                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-sm text-slate-400">
                                                Terms of Service
                                            </span>
                                        </div>
                                    </div>
                                    */}
                                </div>

                                {/* Card Footer */}
                                <div className="border-t border-slate-100 px-6 py-4">
                                    <p className="text-xs text-slate-500">
                                        Last updated {new Date(app.lastUpdated).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Legal Documents Hub
                    </p>
                </div>
            </div>
        </div>
    );
}
