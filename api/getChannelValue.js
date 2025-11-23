export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		const { channelNumbers } = req.body;
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(
			`${apiUrl}/Api/Main/GetCurData?cnlNums=${channelNumbers.join(",")}`,
			{ credentials: "include" }
		);

		console.log("Status:", r.status);

		// read response as text first
		const raw = await r.text();

		console.log("Raw response:", raw);

		// if backend sent no body
		if (!raw || raw.trim() === "") {
			return res.status(r.status).json({
				ok: false,
				msg: r.status === 401 ? "Unauthorized" : "Empty response",
			});
		}

		// try parse JSON safely
		let data;
		try {
			data = JSON.parse(raw);
		} catch (err) {
			console.log("JSON parse error:", err);
			return res
				.status(500)
				.json({ ok: false, msg: "Invalid JSON returned" });
		}

		console.log("Parsed data:", data);

		return res.status(r.status).json(data);
	} catch (err) {
		console.log("masalah", err.message);
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
