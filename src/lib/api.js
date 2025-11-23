import { SESSION_MAX_TIME } from "../data/constant";

export const login = async (username, password) => {
	try {
		const res = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		const data = await res.json();

		if (!data.ok) {
			return { success: false, message: data.msg || "Login gagal" };
		}

		setTimeout(() => {
			logout();
		}, SESSION_MAX_TIME);

		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, message: "Terjadi kesalahan jaringan." };
	}
};

export const logout = async () => {
	await fetch("/api/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	alert("Sesi anda telah berakhir. Silakan login kembali.");
	window.location.href = "/login";
};

export const getChannelValue = async (channelNumbers) => {
	try {
		const res = await fetch("/api/getChannelValue", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ channelNumbers }),
		});

		if (res.status === 401) await logout();

		const data = await res.json();

		if (!data.ok) throw new Error(data.msg);

		if (!data.data || data.data.length === 0) {
			throw new Error("No data was found.");
		}

		return { success: true, data: data.data };
	} catch (err) {
		return { success: false, message: err.message };
	}
};

export const sendCommand = async (channelNumber, val) => {
	try {
		const res = await fetch("/api/sendCommand", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				channelNumber,
				val,
			}),
		});

		if (res.status === 401) await logout();

		const data = await res.json();

		if (!data.ok) {
			return {
				success: false,
				message: data.msg || "Gagal menyimpan perubahan",
			};
		}

		return { success: true, message: "Perubahan berhasil disimpan" };
	} catch (err) {
		console.error("Gagal menyimpan perubahan:", err);
		return { success: false, message: "Gagal menyimpan perubahan" };
	}
};

// import { SESSION_MAX_TIME, TARGET_API } from "../data/constant";

// export const login = async (username, password) => {
// 	try {
// 		const res = await fetch(`${TARGET_API}/Api/Auth/Login`, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			credentials: "include",
// 			body: JSON.stringify({ username, password }),
// 		});

// 		const data = await res.json();

// 		if (!data.ok) {
// 			// return the API message so the component can handle it
// 			return { success: false, message: data.msg || "Login gagal" };
// 		}

// 		// set a manual timeout for session expiration (30 minutes)
// 		setTimeout(() => {
// 			logout();
// 		}, SESSION_MAX_TIME);

// 		return { success: true };
// 	} catch (error) {
// 		console.error(error);
// 		return { success: false, message: "Terjadi kesalahan jaringan." };
// 	}
// };

// // logout
// export const logout = async () => {
// 	await fetch(`${TARGET_API}/Api/Auth/Logout`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		credentials: "include",
// 	});

// 	alert("Sesi anda telah berakhir. Silakan login kembali.");
// 	window.location.href = "/login"; // full reload
// };

// export const getChannelValue = async (channelNumbers) => {
// 	try {
// 		const res = await fetch(
// 			`${TARGET_API}/Api/Main/GetCurData?cnlNums=${channelNumbers.join(
// 				","
// 			)}`,
// 			{ credentials: "include" }
// 		);

// 		// if session expired
// 		if (res.status === 401) await logout();

// 		const data = await res.json();

// 		if (!data.ok) throw new Error(data.msg);

// 		if (data.data?.length === 0) throw new Error("No data was found.");

// 		return { success: true, data: data.data };
// 		/*
//          datanya itu [
//             {cnlNum: number, val: number, stat: number}
//          ]
//       */
// 	} catch (err) {
// 		return { success: false, message: err.message };
// 	}
// };

// export const sendCommand = async (channelNumber, val) => {
// 	try {
// 		const res = await fetch(`${TARGET_API}/Api/Main/SendCommand`, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			credentials: "include",
// 			body: JSON.stringify({
// 				cnlNum: channelNumber,
// 				cmdVal: val,
// 			}),
// 		});

// 		// Handle session expired
// 		if (res.status === 401) await logout();

// 		const data = await res.json();

// 		if (!data.ok) {
// 			return {
// 				success: false,
// 				message: data.msg || "Gagal menyimpan perubahan",
// 			};
// 		}

// 		return { success: true, message: "Perubahan berhasil disimpan" };
// 	} catch (err) {
// 		console.error("Gagal menyimpan perubahan:", err);
// 		return { success: false, message: "Gagal menyimpan perubahan" };
// 	}
// };
