import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = JSON.parse(req.body)
    console.log('Name', name)
    console.log('Email', email)
    console.log('Message', message)

    res.status(201).json({})
  }
}
