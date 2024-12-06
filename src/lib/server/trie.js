import pkg from 'word-graphs';
const {Trie} = pkg;
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path for the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize tries for different languages
const tries = new Map();

const short = true;

export async function initializeTries() {
    try {
        // Load English words
        const enWords = await fs.readFile(
            join(__dirname, `../../words/english${short ? '_short' : ''}.txt`), 
            'utf-8'
        );
        const enTrie = new Trie();
        enWords.split('\n').forEach(word => enTrie.add(word.trim()));
        tries.set('en', enTrie);

        // Load German words
        const deWords = await fs.readFile(
            join(__dirname, `../../words/german${short ? '_short' : ''}.txt`), 
            'utf-8'
        );
        const deTrie = new Trie();
        deWords.split('\n').forEach(word => deTrie.add(word.trim()));
        tries.set('de', deTrie);

        console.log('Tries initialized successfully');
    } catch (error) {
        console.error('Error initializing tries:', error);
        throw error;
    }
}

/**
 * @param {String} lang
 * @returns {pkg.Trie}
 */
export function getTrie(lang) {
    const trie = tries.get(lang);
    if (!trie) {
        throw new Error(`Trie for language ${lang} not found`);
    }
    return trie;
}