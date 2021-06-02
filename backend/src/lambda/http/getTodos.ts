import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { getTodos } from '../../Logic/todo'
import { getUserId } from '../utils'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const logger = createLogger('getTodos')

export const handler = middy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		logger.info('Getting getTodos Event: ', {
			event
		})

		const jwtToken = getUserId(event)
		const items = await getTodos(jwtToken)

		return {
			statusCode: 200,
			body: JSON.stringify({
				items
			})
		}
	}
)

handler.use(
	cors({
		credentials: true
	})
)