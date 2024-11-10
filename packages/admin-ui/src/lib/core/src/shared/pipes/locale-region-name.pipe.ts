import { ChangeDetectorRef, Optional, Pipe, PipeTransform } from '@angular/core'

import { DataService } from '../../data/providers/data.service'

import { LocaleBasePipe } from './locale-base.pipe'

/**
 * @description
 * Displays a human-readable name for a given region.
 *
 * @example
 * ```HTML
 * {{ 'GB' | localeRegionName }}
 * ```
 *
 * @docsCategory pipes
 */
@Pipe({
	name: 'localeRegionName',
	pure: false,
})
export class LocaleRegionNamePipe extends LocaleBasePipe implements PipeTransform {
	constructor(@Optional() dataService?: DataService, @Optional() changeDetectorRef?: ChangeDetectorRef) {
		super(dataService, changeDetectorRef)
	}
	transform(value: any, locale?: unknown): string {
		if (value == null || value === '') {
			return ''
		}
		if (typeof value !== 'string') {
			return `Invalid region code "${value as any}"`
		}
		const activeLocale = this.getActiveLocale(locale)

		// Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
		const DisplayNames = (Intl as any).DisplayNames

		try {
			return new DisplayNames([activeLocale.replace('_', '-')], { type: 'region' }).of(
				value.replace('_', '-'),
			)
		} catch (e: any) {
			return value
		}
	}
}
