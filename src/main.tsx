import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'

/**
 * Entrée vite-react-ssg.
 *
 * En développement : se comporte exactement comme un `createRoot`
 * React classique. Au build : parcourt `routes` et écrit un fichier
 * HTML complet par URL dans `dist/`.
 *
 * `basename` non utilisé — le site est servi à la racine du domaine.
 */
export const createRoot = ViteReactSSG({ routes })
