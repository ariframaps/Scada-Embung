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
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(`${apiUrl}/Api/Auth/Logout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		const parsed = await safeParseResponse(r);

		return res.status(parsed.status).json({
			success: true,
		});
	} catch (err) {
		return res.status(500).json({ success: false, message: "Server error" });
	}
}
