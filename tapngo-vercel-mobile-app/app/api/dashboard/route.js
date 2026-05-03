import {dashboard} from '../../../lib/data'; export async function GET(){return Response.json(dashboard())}
