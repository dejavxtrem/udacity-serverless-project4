import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../Logic/todo'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
//import * as middy from 'middy'
//import { cors } from 'middy/middlewares'

const logger = createLogger('createTodo')

export const handler = (
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		
		logger.info('Processing createTodo Event: ', {
			event
		})

		const parsedBody: CreateTodoRequest = JSON.parse(event.body)
		const jwtToken = getUserId(event)

		const item = await createTodo(jwtToken, parsedBody)

		logger.info('item created', item)

		return {
			statusCode: 201,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Crendentials': true
			},
			body: JSON.stringify({
				item
			})
		}
	}
)

// handler.use(
// 	cors({
// 		credentials: true
// 	})
// )
