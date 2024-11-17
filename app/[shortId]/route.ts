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

    const urlDoc = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!urlDoc) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const urlToRedirect = urlDoc.originalUrl.startsWith('http') 
      ? urlDoc.originalUrl 
      : `https://${urlDoc.originalUrl}`;

    return NextResponse.redirect(urlToRedirect);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', request.url));
  }
} 