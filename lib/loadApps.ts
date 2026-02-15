import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { AppData } from './types';

/**
 * Loads all app directories from the data folder
 * Each app directory can contain multiple document types (privacy.md, terms.md, etc.)
 */
export async function loadAllApps(): Promise<AppData[]> {
    const dataDirectory = path.join(process.cwd(), 'data');

    try {
        const appDirs = await fs.readdir(dataDirectory);

        const apps = await Promise.all(
            appDirs.map(async (appSlug) => {
                const appPath = path.join(dataDirectory, appSlug);
                const stats = await fs.stat(appPath);

                if (!stats.isDirectory()) return null;

                // Read privacy.md to get app metadata
                const privacyPath = path.join(appPath, 'privacy.md');

                try {
                    const fileContents = await fs.readFile(privacyPath, 'utf8');
                    const { data } = matter(fileContents);

                    const appData: AppData = {
                        slug: data.slug as string || appSlug,
                        name: data.name as string,
                        email: data.email as string,
                        lastUpdated: data.lastUpdated as string,
                        customContent: '', // Not needed for app list
                    };

                    return appData;
                } catch (error) {
                    console.error(`Error loading app ${appSlug}:`, error);
                    return null;
                }
            })
        );

        return apps.filter((app): app is AppData => app !== null);
    } catch (error) {
        console.error('Error loading apps:', error);
        return [];
    }
}

/**
 * Loads a specific document for an app
 * @param slug - The app slug
 * @param docType - The document type (e.g., 'privacy', 'terms')
 */
export async function loadDocument(slug: string, docType: string): Promise<AppData | null> {
    const filePath = path.join(process.cwd(), 'data', slug, `${docType}.md`);

    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const appData: AppData = {
            slug: data.slug as string || slug,
            name: data.name as string,
            email: data.email as string,
            lastUpdated: data.lastUpdated as string,
            customContent: content.trim(),
        };

        return appData;
    } catch (error) {
        console.error(`Error loading ${docType} for app ${slug}:`, error);
        return null;
    }
}

/**
 * Get list of available document types for an app
 */
export async function getAppDocuments(slug: string): Promise<string[]> {
    const appPath = path.join(process.cwd(), 'data', slug);

    try {
        const files = await fs.readdir(appPath);
        const mdFiles = files
            .filter(file => file.endsWith('.md'))
            .map(file => file.replace('.md', ''));

        return mdFiles;
    } catch (error) {
        console.error(`Error getting documents for app ${slug}:`, error);
        return [];
    }
}

// Backwards compatibility
export async function loadAppBySlug(slug: string): Promise<AppData | null> {
    return loadDocument(slug, 'privacy');
}
