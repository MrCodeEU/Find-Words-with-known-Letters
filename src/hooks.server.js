import { initializeTries } from '$lib/server/trie';
import { i18n } from '$lib/i18n';
const handleParaglide = i18n.handle();
export const handle = handleParaglide;

initializeTries().catch(error => {
    console.error('Error initializing tries:', error);
});