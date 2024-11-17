import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Url from '@/models/Url';

export async function GET(
  request: Request,
  context: { params: { shortId: string } }
) {
  try {
    await dbConnect();

    const { shortId } = await context.params;

    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    return NextResponse.json(urlDoc);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 