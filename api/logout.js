export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(`${apiUrl}/Api/Auth/Logout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		return res.status(r.status).json(await r.json());
	} catch (err) {
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
