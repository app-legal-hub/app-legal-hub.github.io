import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { AppData } from './types';

/**
 * Loads all app data from markdown files in the data/privacy directory
 * Used for static generation at build time
 */
export async function loadAllApps(): Promise<AppData[]> {
    const privacyDirectory = path.join(process.cwd(), 'data', 'privacy');

    try {
        const filenames = await fs.readdir(privacyDirectory);
        const mdFiles = filenames.filter(file => file.endsWith('.md'));

        const apps = await Promise.all(
            mdFiles.map(async (filename) => {
                const filePath = path.join(privacyDirectory, filename);
                const fileContents = await fs.readFile(filePath, 'utf8');
                const { data, content } = matter(fileContents);

                const appData: AppData = {
                    slug: data.slug as string,
                    name: data.name as string,
                    email: data.email as string,
                    lastUpdated: data.lastUpdated as string,
                    customContent: content.trim(),
                };

                return appData;
            })
        );

        return apps;
    } catch (error) {
        console.error('Error loading apps:', error);
        return [];
    }
}

/**
 * Loads a single app by slug
 * Used for generating individual privacy policy pages
 */
export async function loadAppBySlug(slug: string): Promise<AppData | null> {
    const privacyDirectory = path.join(process.cwd(), 'data', 'privacy');
    const filePath = path.join(privacyDirectory, `${slug}.md`);

    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const appData: AppData = {
            slug: data.slug as string,
            name: data.name as string,
            email: data.email as string,
            lastUpdated: data.lastUpdated as string,
            customContent: content.trim(),
        };

        return appData;
    } catch (error) {
        console.error(`Error loading app ${slug}:`, error);
        return null;
    }
}
