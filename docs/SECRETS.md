# Tymora Labs — API Key & Telemetry Credentials

This document contains key details for local development testing and instructions on configuring production environment secrets.

> [!WARNING]
> Do NOT store real production API keys or database secrets in this file or commit them to git. This document is intended only to track local debug keys and configuration instructions.

---

## 1. Local Development API Key

To log in to the local admin portal (`/admin`) and query mock or in-memory Firestore inquiries, use the following key:

```text
tymora-debug-secret-123
```

This matches the value configured in your local `.env.local` file:
```env
CONTACTS_API_KEY=tymora-debug-secret-123
```

---

## 2. Production Environment Setup (Firebase App Hosting)

For the live production site, you must set up the API key securely so that it is not exposed in public source control:

1. Open your [Firebase Console](https://console.firebase.google.com/).
2. Select your project **tymora-labs**.
3. Navigate to **App Hosting** and select your application.
4. Go to **Settings** / **Environment Variables**.
5. Add the following variable:
   - **Key**: `CONTACTS_API_KEY`
   - **Value**: `[Your-Secret-Production-Key-Here]` (create any secure string you want)
6. Save and redeploy.

Once configured, input this same secure production key on your live `/admin` portal login screen to retrieve the live Firestore contact records securely.
