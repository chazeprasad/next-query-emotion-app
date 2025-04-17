import { getFruits, addFruit } from '@/utils/db';

export async function GET() {
  return Response.json(getFruits());
}

export async function POST(req: Request) {
  const fruit = await req.json();
  const newFruit = addFruit(fruit);
  return Response.json(newFruit, { status: 201 });
}