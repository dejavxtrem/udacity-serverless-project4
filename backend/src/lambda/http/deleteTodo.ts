import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../Logic/todo' 



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const jwtToken = getUserId(event)

  // TODO: Remove a TODO item by id

  const returnItem = await deleteTodo(todoId, jwtToken)

  return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true
    },
    body: JSON.stringify({
        body: returnItem.body
    })
  }
}
    