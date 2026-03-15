"use client";

export default function EmergencyButton() {

  const sendEmergency = async () => {
    console.log("BUTTON CLICKED");

    try {

      const res = await fetch("/api/send-sms", {
        method: "POST",
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        alert("🚨 Emergency SMS Sent!");
      }

    } catch (err) {
      console.error("SMS error:", err);
    }

  };

  return (
    <button
      onClick={sendEmergency}
      className="bg-red-600 text-white px-6 py-3 rounded-lg"
    >
      🚨 Emergency Alert
    </button>
  );
}