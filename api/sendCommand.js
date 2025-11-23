export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		const { channelNumber, val } = req.body;
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(`${apiUrl}/Api/Main/SendCommand`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				cnlNum: channelNumber,
				cmdVal: val,
			}),
		});

		const data = await r.json();
		return res.status(r.status).json(data);
	} catch (err) {
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
