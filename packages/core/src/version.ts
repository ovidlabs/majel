/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @description
 * A constant which holds the current version of the Majel core. You can use
 * this when your code needs to know the version of Majel which is running.
 *
 * @example
 * ```ts
 * import { MAJEL_VERSION } from '\@majel/core';
 *
 * console.log('Majel version:', MAJEL_VERSION);
 * ```
 *
 * @docsCategory common
 * @since 2.0.0
 */
export const MAJEL_VERSION: string = require('../package.json').version
