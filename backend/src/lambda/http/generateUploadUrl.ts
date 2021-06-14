import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { generateUploadUrl } from '../../Logic/todo' 
import { createLogger } from '../../utils/logger'


const logger = createLogger('generateUploadUrl')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const jwtToken = getUserId(event)

 
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  const uploadedResult = await generateUploadUrl(todoId,jwtToken)

  logger.info('Processing generatUpload url', {
      uploadedResult
  })

  return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Crendentials': true
    },
    body: JSON.stringify({
        uploadedResult
    })
  }
}
