//Function to valiadte that all fields are in the body request, and next, we create the user and set the custom claims
// passing { role } in the setCustomUserClaims --the other fields are set by Firebase
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export async function create(req: Request, res: Response) {
	try {
		const { displayName, password, email, role } = req.body;

		if (!displayName || !password || !email || !role) {
			return res.status(400).send({ message: 'Missing fields' });
		}
		const { uid } = await admin.auth().createUser({
			displayName,
			password,
			email
		});
		await admin.auth().setCustomUserClaims(uid, { role });
		//if no errors return 210 code with the uid created
		return res.status(201).send({ uid });
	} catch (err) {
		return handleError(res, err);
	}
}

function handleError(res: Response, err: any) {
	return res.status(500).send({ message: `${err.code}` });
}
