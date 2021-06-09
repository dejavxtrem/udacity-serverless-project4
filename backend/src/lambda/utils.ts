import { APIGatewayProxyEvent } from "aws-lambda";
//import { parseUserId } from "../auth/utils";
import { createLogger } from '../utils/logger'
import { decode } from 'jsonwebtoken'
/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */

 const logger = createLogger('utils')
 


export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const decodedJwt = decode(jwtToken)
  const {sub} = decodedJwt
  logger.info('jwttoken', {sub})
  return decodedJwt.sub
  

  //return parseUserId(jwtToken)
}