export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		const { username, password } = req.body;

		const apiUrl = process.env.TARGET_API;

		const r = await fetch(`${apiUrl}/Api/Auth/Login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ username, password }),
		});

		const data = await r.json();
		return res.status(r.status).json(data);
	} catch (err) {
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
