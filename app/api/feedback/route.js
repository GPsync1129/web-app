// app/api/feedback/route.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(req) {
  const { name, email, message, rating } = await req.json();

  if (!uri) {
    return new Response('Missing MongoDB URI', { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const collection = db.collection('feedback');

    const feedbackData = { name, email, message, rating, date: new Date() };
    await collection.insertOne(feedbackData);

    return new Response(JSON.stringify({ message: 'Feedback submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response('Failed to submit feedback.', { status: 500 });
  } finally {
    await client.close(); // Ensure to close the connection
  }
}

// gpsyncofficial
// 2HGtFqHDVucTz7H2

export async function GET() {
  if (!uri) {
    return new Response('Missing MongoDB URI', { status: 500 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('yourDatabaseName');
    const collection = db.collection('feedback');

    // Use aggregation with $sample to fetch 4 random testimonials
    const feedbacks = await collection.aggregate([{ $sample: { size: 3 } }]).toArray();

    return new Response(JSON.stringify(feedbacks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response('Failed to retrieve feedback.', { status: 500 });
  } finally {
    await client.close();
  }
}
