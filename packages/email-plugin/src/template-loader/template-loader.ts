import { Injector, RequestContext } from '@majel/core'

import { LoadTemplateInput, Partial } from '../types'

/**
 * @description
 * Loads email templates based on the given request context, type and template name
 * and return the template as a string.
 *
 * @example
 * ```ts
 * import { EmailPlugin, TemplateLoader } from '\@majel/email-plugin';
 *
 * class MyTemplateLoader implements TemplateLoader {
 *      loadTemplate(injector, ctx, { type, templateName }){
 *          return myCustomTemplateFunction(ctx);
 *      }
 * }
 *
 * // In majel-config.ts:
 * ...
 * EmailPlugin.init({
 *     templateLoader: new MyTemplateLoader()
 *     ...
 * })
 * ```
 *
 * @docsCategory core plugins/EmailPlugin
 * @docsPage TemplateLoader
 * @docsWeight 0
 */
export interface TemplateLoader {
	/**
	 * @description
	 * Load template and return it's content as a string
	 */
	loadTemplate(injector: Injector, ctx: RequestContext, input: LoadTemplateInput): Promise<string>

	/**
	 * @description
	 * Load partials and return their contents.
	 * This method is only called during initialization, i.e. during server startup.
	 */
	loadPartials?(): Promise<Partial[]>
}
