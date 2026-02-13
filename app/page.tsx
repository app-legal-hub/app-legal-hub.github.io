import Link from 'next/link';
import { loadAllApps } from '@/lib/loadApps';

export default async function HomePage() {
    const apps = await loadAllApps();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Privacy Policies
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Select an app to view its privacy policy
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    {apps.map((app) => (
                        <Link
                            key={app.slug}
                            href={`/${app.slug}/privacy`}
                            className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-lg"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white">
                                    {app.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                                        {app.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        View Privacy Policy →
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <footer className="mt-16 border-t border-gray-200 pt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </footer>
            </div>
        </div>
    );
}
