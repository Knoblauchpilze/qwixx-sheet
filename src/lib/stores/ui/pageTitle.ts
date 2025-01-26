import { writable } from 'svelte/store';

const HOMEPAGE_TITLE: string = 'Qwixx sheet';

export { HOMEPAGE_TITLE };

export default writable(HOMEPAGE_TITLE);
