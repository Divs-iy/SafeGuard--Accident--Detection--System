import { NextResponse } from "next/server";
import twilio from "twilio";
console.log(process.env.TWILIO_ACCOUNT_SID);
export async function POST(req : Request) {

  try {

    console.log("API HIT");

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
   let lat = null;
let lon = null;

try {
  const data = await req.json();
  lat = data?.lat;
  lon = data?.lon;
} catch {
  console.log("No location received");
}

    const message = await client.messages.create({
 body: `🚨 URGENT EMERGENCY ALERT 🚨
A possible road accident has been detected.

${
  lat && lon
    ? `📍 Location: https://maps.google.com/?q=${lat},${lon}`
    : "Location unavailable"
}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.EMERGENCY_PHONE_NUMBER,
    });

    console.log("TWILIO RESPONSE:", message);

    return NextResponse.json({ success: true });

  } catch (error) {

    console.log("TWILIO ERROR:", error);

    return NextResponse.json({ success: false });

  }

}