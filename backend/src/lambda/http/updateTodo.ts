import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updatedTodo } from '../../Logic/todo'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'


const logger = createLogger('updateTodos')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodoBody: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    logger.info('Getting an item to be updated: ', {
        event
    })

    logger.info('Item to be updated: ', {
        updatedTodo
    })

    const jwtToken = getUserId(event)


    const result = await updatedTodo(jwtToken, todoId, updatedTodoBody)

    return {
        statusCode: result.statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Crendentials': true
        },
        body: result.body
    }

}
