import { MajelLogger } from './majel-logger'

/**
 * A logger that does not log.
 */
export class NoopLogger implements MajelLogger {
	debug(message: string, context?: string): void {
		// noop!
	}

	error(message: string, context?: string, trace?: string): void {
		// noop!
	}

	info(message: string, context?: string): void {
		// noop!
	}

	verbose(message: string, context?: string): void {
		// noop!
	}

	warn(message: string, context?: string): void {
		// noop!
	}
}
