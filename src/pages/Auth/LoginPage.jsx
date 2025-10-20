import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const LoginPage = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		setIsLoading(true);
		if (!username || !password) {
			setError("Username dan password wajib diisi.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch(
				`${import.meta.env.VITE_TARGET_API}/Api/Auth/Login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ username, password }),
				}
			);

			const data = await res.json();
			if (data.ok) {
				console.log("Login berhasil");
				// sendEmail();
			} else {
				throw new Error("Login gagal");
			}

			setTimeout(() => {
				setLoggedOut();
				alert("Sesi anda telah habis, silahkan login kembali");
			}, 1800000);

			navigate("/");
			setError(""); // bersihin error kalau sebelumnya ada
		} catch (err) {
			setError("Username atau password salah.");
			setIsLoading(false);
		}
	};

	return (
		<div className="w-screen h-[70vh] flex justify-center items-center px-[10vw]">
			<form
				className="flex w-full sm:w-md flex-col gap-4 text-start"
				onSubmit={(e) => {
					e.preventDefault();
					login();
				}}>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="username">Username</Label>
					</div>
					<TextInput
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						id="username"
						type="text"
						placeholder="username anda"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password">Password</Label>
					</div>
					<div className="flex gap-2">
						<TextInput
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="flex-1"
						/>
						<Button
							type="button"
							color={"alternative"}
							onClick={() => setShowPassword(!showPassword)}
							className="text-xs px-3 text-blue-600">
							{showPassword ? "Hide" : "Show"}
						</Button>
					</div>
				</div>
				{error && (
					<Alert color="failure">
						<span className="font-medium">Login Gagal!</span>
						<br />
						{error}
					</Alert>
				)}

				<Button disabled={isLoading} type="submit">
					{isLoading ? <Loading size={5} /> : "Login"}
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;
