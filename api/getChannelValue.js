export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		console.log("ini req body coy", req.body);
		const { channelNumbers } = req.body;
		const apiUrl = process.env.TARGET_API;

		const r = await fetch(
			`${apiUrl}/Api/Main/GetCurData?cnlNums=${channelNumbers.join(",")}`,
			{ credentials: "include" }
		);

		const data = await r.json();
		return res.status(r.status).json(data);
	} catch (err) {
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
