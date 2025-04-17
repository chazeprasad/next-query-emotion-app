import { updateFruit, deleteFruit } from '@/utils/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const data = await req.json();
  const updated = updateFruit(id, data);
  return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  deleteFruit(id);
  return new Response(null, { status: 204 });
}
