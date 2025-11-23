export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	const safeParseResponse = async (r) => {
		const raw = await r.text();
		if (!raw.trim()) return { empty: true, status: r.status, data: null };
		try {
			return { empty: false, status: r.status, data: JSON.parse(raw) };
		} catch {
			return {
				empty: false,
				status: r.status,
				data: { ok: false, msg: "Invalid JSON" },
			};
		}
	};

	try {
		const { channelNumbers } = req.body;
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(
			`${apiUrl}/Api/Main/GetCurData?cnlNums=${channelNumbers.join(",")}`,
			{ credentials: "include" }
		);

		const parsed = await safeParseResponse(r);

		// 401 unauthorized (empty body)
		if (parsed.status === 401) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}

		if (!parsed.data?.ok) {
			return res.status(400).json({
				success: false,
				message: parsed.data?.msg || "API error",
			});
		}

		return res.status(200).json({
			success: true,
			data: parsed.data.data,
		});
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
}
