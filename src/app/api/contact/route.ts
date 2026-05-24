import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// Initialize Firebase Admin once to support both local development and App Hosting
let db: admin.firestore.Firestore | null = null;

try {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  db = admin.firestore();
} catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.warn(
    "Firebase Admin could not initialize natively. Running in fallback mode (terminal logging only). Details:",
    errorMessage
  );
}

// Global in-memory storage so local submissions persist during dev server execution
const localInquiries: Array<Record<string, unknown>> = [
  {
    id: "mock-1",
    name: "Suhas",
    email: "suhas@example.com",
    product: "competition-scheduler",
    message: "This is a simulated local inquiry for testing. Firestore is running in fallback mode.",
    timestamp: new Date().toISOString(),
  },
  {
    id: "mock-2",
    name: "Jane Doe",
    email: "jane@tymora.io",
    product: "race-communicator",
    message: "Would love to deploy the Race-Day Communicator for our upcoming triathlon in Denver.",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hr ago
  },
  {
    id: "mock-3",
    name: "Bob Miller",
    email: "bob@millerscheduling.com",
    product: "appointment-engine",
    message: "Need to sync appointment slots for a clinic with 5 practitioners. Do you support custom intake fields?",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hrs ago
  }
];

/**
 * POST /api/contact
 * Handles new contact submissions.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, product, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const localId = `local-${Math.random().toString(36).substring(2, 11)}`;
    const data = {
      id: localId,
      name,
      email,
      product: product || "general",
      message,
      timestamp: new Date().toISOString(),
    };

    // Prepend to our local in-memory array so it is immediately visible in the /admin feed
    localInquiries.unshift(data);

    if (db) {
      try {
        // Write to Firebase Firestore database using the generated localId
        await db.collection("contacts").doc(localId).set(data);
        console.log("Firestore successfully wrote submission:", data);
      } catch (dbError: unknown) {
        const dbErr = dbError instanceof Error ? dbError : new Error(String(dbError));
        console.warn(
          "Firestore write failed (likely missing local GCP credentials/Project ID). Falling back to in-memory store. Error:",
          dbErr.message
        );
      }
    } else {
      console.log("[LOCAL MOCK WRITE] Contact form submitted:", data);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("API POST Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit contact request." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Retrieves contact form submissions. Secured by x-api-key header.
 */
export async function GET(request: Request) {
  try {
    const apiKeyHeader = request.headers.get("x-api-key");
    const requiredApiKey = process.env.CONTACTS_API_KEY;

    // Guard against unconfigured secret keys
    if (!requiredApiKey) {
      return NextResponse.json(
        { error: "Contacts API key environment variable (CONTACTS_API_KEY) is not configured on the server." },
        { status: 500 }
      );
    }

    // Auth verification
    if (apiKeyHeader !== requiredApiKey) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid x-api-key header." },
        { status: 401 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { 
          message: "Firebase Admin is in fallback mode. Firestore database access is not active locally.",
          data: localInquiries 
        },
        { status: 200 }
      );
    }

    try {
      // Query documents from Firestore
      const snapshot = await db.collection("contacts").orderBy("timestamp", "desc").get();
      const list: Array<Record<string, unknown>> = [];
      
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return NextResponse.json({ data: list }, { status: 200 });
    } catch (dbError: unknown) {
      const dbErr = dbError instanceof Error ? dbError : new Error(String(dbError));
      console.warn(
        "Firestore read failed (likely missing local GCP credentials/Project ID). Returning in-memory fallback list. Error:",
        dbErr.message
      );
      
      return NextResponse.json(
        { 
          message: `Firebase Admin Firestore read failed (${dbErr.message}). Running in local mock mode.`,
          data: localInquiries 
        },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("API GET Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to retrieve contact submissions." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact
 * Deletes a contact submission by ID. Secured by x-api-key header.
 */
export async function DELETE(request: Request) {
  try {
    const apiKeyHeader = request.headers.get("x-api-key");
    const requiredApiKey = process.env.CONTACTS_API_KEY;

    // Guard against unconfigured secret keys
    if (!requiredApiKey) {
      return NextResponse.json({ error: "Contacts API key not configured on server." }, { status: 500 });
    }

    // Auth verification
    if (apiKeyHeader !== requiredApiKey) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID parameter is required." }, { status: 400 });
    }

    // Remove from in-memory array
    const index = localInquiries.findIndex((inq) => inq.id === id);
    if (index !== -1) {
      localInquiries.splice(index, 1);
    }

    if (db) {
      try {
        await db.collection("contacts").doc(id).delete();
        console.log(`Firestore document ${id} deleted successfully.`);
      } catch (dbError: unknown) {
        const dbErr = dbError instanceof Error ? dbError : new Error(String(dbError));
        console.warn(`Firestore document deletion failed for ${id}. Cleared locally only. Error:`, dbErr.message);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("API DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
