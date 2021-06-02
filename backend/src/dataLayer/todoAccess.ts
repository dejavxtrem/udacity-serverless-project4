import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'



const XAWS = AWSXRay.captureAWS(AWS)
//const docClient = new AWS.DynamoDB.DocumentClient()

const logger = createLogger('todosAccess')


export class TodoAccess {
    constructor (
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
    ) {}

    async getTodos(userId): Promise<TodoItem[]> {
		const result = await this.docClient
			.query({
				TableName: this.todosTable,
				KeyConditionExpression: 'userId = :userId',
				ExpressionAttributeValues: {
					':userId': userId
				}
			})
			.promise()

		logger.info('Result', result)

		const items = result.Items
		return items as TodoItem[]
	}



	async createTodo(todo: TodoItem): Promise<TodoItem> {
		await this.docClient
			.put({
				TableName: this.todosTable,
				Item: todo
			})
			.promise()

		return todo
	}




}



function createDynamoDBClient(): AWS.DynamoDB.DocumentClient {
	// serverless offline will set this variable IS_OFFLINE to true
	if (process.env.IS_OFFLINE) {
		logger.info('Creating a local DynamoDB instance')
		return new XAWS.DynamoDB.DocumentClient({
			region: 'localhost',
			endpoint: 'http://localhost:8000'
		})
	}

	return new XAWS.DynamoDB.DocumentClient()
}

