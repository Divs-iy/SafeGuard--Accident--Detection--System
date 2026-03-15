import twilio from "twilio";

export async function sendSMS(phone: string, message: string) {
  const accountSID = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;

  const client = twilio(accountSID, authToken);

  try {
    const msg = await client.messages.create({
      body: message,
      from: "+17755999939",
      to: phone,
    });

    console.log("SMS sent:", msg.sid);
    return { success: true };
  } catch (error) {
    console.error("Twilio error:", error);
    return { success: false, error };
  }
}