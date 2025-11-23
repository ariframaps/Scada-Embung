export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ ok: false, msg: "Method not allowed" });
	}

	try {
		const { channelNumbers } = req.body;
		const apiUrl = process.env.TARGET_API;
		console.log("ini req body coy", req.body);
		console.log("ini env", apiUrl);

		const r = await fetch(
			`${apiUrl}/Api/Main/GetCurData?cnlNums=${channelNumbers.join(",")}`,
			{ credentials: "include" }
		);

		console.log(r);

		const data = await r.json();

		console.log(data);

		return res.status(r.status).json(data);
	} catch (err) {
		console.log("masalah", err.message);
		return res.status(500).json({ ok: false, msg: "Server error" });
	}
}
