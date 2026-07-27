/**
 * Remplaçant de `server-only` pour les tests.
 *
 * Le paquet réel expose une variante navigateur qui lève à l'import, ce qui
 * empêcherait de tester le moindre module serveur sous jsdom. Ce fichier est
 * volontairement vide : c'est le build de Next.js qui fait respecter la
 * frontière client / serveur, pas le lanceur de tests.
 */
export {};
