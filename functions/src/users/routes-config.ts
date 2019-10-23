import { Application } from 'express';
import { create } from './controller';
//...
import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';

//Crate a handler at POST /users
export function routesConfig(app: Application) {
	app.post('/users', create),
		//Add handlers to 'create'endpoint setting up domibo effect with handlers
		isAuthenticated,
		isAuthorized({ hasRole: ['admin', 'manager'] }),
		create;
}
