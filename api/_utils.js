async function safeParseResponse(r) {
	const raw = await r.text();

	if (!raw || raw.trim() === "") {
		return {
			empty: true,
			status: r.status,
			data: null,
		};
	}

	try {
		return {
			empty: false,
			status: r.status,
			data: JSON.parse(raw),
		};
	} catch (err) {
		return {
			empty: false,
			status: r.status,
			data: { ok: false, msg: "Invalid JSON returned" },
		};
	}
}
