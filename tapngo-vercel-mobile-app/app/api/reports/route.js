import {products,sales,dashboard} from '../../../lib/data'; export async function GET(){return Response.json({products,sales,summary:dashboard()})}
