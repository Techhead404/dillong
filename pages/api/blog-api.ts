import { NextApiResponse, NextApiRequest } from 'next';
import { db } from '@vercel/postgres';
import { debuglog } from 'util';

export default async function handler( _req: NextApiRequest, res: NextApiResponse )  
{
    try {
        const client = await db.connect();
        const result = await client.query('SELECT * FROM blogs');
        console.log('Result:', result);
        const blogs = result.rows; // Ensure blogs is an array
        console.log('Blogs:', blogs);
        return res.status(200).json({ blogs });

    } catch (error) {
        console.error('Error fetching blogs:', error); // Log error during fetch
        throw new Error('Error fetching blogs'); // Throw an error to propagate it
    }
}
