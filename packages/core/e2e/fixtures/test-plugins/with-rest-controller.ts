import { Controller, Get } from '@nestjs/common'
import { Permission } from '@majel/common/lib/generated-shop-types'
import { Allow, InternalServerError, MajelPlugin } from '@majel/core'

@Controller('test')
export class TestController {
	@Get('public')
	publicRoute() {
		return 'success'
	}

	@Allow(Permission.Authenticated)
	@Get('restricted')
	restrictedRoute() {
		return 'success'
	}

	@Get('bad')
	badRoute() {
		throw new InternalServerError('uh oh!')
	}
}

@MajelPlugin({
	controllers: [TestController],
})
export class TestRestPlugin {}
