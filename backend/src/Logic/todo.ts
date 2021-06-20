//import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
//import { parseUserId } from '../auth/utils'
import * as uuid from 'uuid'
import { createLogger } from '../utils/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'



const logger = createLogger('todos')

//creat a new instance of the class of the TodoAccess



const todoAccessProvider = new TodoAccess()

export async function getTodos(jwtToken: string): Promise<TodoItem[]> {

	const userId = jwtToken

	return todoAccessProvider.getTodos(userId)
}




///create todo
export async function createTodo(
	jwtToken: string,
	parsedBody: CreateTodoRequest
) {
	const userId = jwtToken
	const todoId = uuid.v4()

	logger.info('userId', userId)
	logger.info('todoId', todoId)

	const item = {
		userId,
		todoId,
		createdAt: new Date().toISOString(),
		done: false,
		...parsedBody,
		attachmentUrl: ''
	}

	logger.info('Item to be created at business logic', item)
	const toReturn = todoAccessProvider.createTodo(item)

	return toReturn
}

//update-todo
export async function updatedTodo(
	jwtToken: string,
	todoId: string,
	parsedBody: UpdateTodoRequest
) {
	const userId = jwtToken
	const result = todoAccessProvider.updateTodo(userId, todoId, parsedBody)

	return result
}


//delete todo
export async function deleteTodo(
	jwtToken: string,
	todoId: string,
) {
	const userId = jwtToken
	const todoReturn = await todoAccessProvider.deleteItem(userId , todoId)

	return todoReturn
}


//upload urlpicture
export async function generateUploadUrl(jwtToken: string, todoId: string) {
	const userId = jwtToken
	const result = todoAccessProvider.generateAttachmentUploadUrl(userId, todoId)

	return result
}
