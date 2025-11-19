import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/api";
import LoadingIcon from "../../components/LoadingIcon";

const LoginPage = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (!username || !password)
				throw new Error("Isi username dan password!");

			const res = await login(username, password);
			if (!res.success) throw new Error(res.message);

			return navigate("/");
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	return (
		<div className="w-screen h-[70vh] flex justify-center items-center px-[10vw]">
			<form
				data-testid="form"
				className="flex w-full sm:w-md flex-col gap-4 text-start"
				onSubmit={handleLogin}>
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
						{showPassword ? (
							<TextInput
								data-testid="password"
								id="password"
								type="text"
								placeholder="Password anda"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="flex-1"
							/>
						) : (
							<TextInput
								data-testid="password"
								id="password"
								type="password"
								placeholder="Password anda"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="flex-1"
							/>
						)}

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
					{isLoading ? <LoadingIcon size={5} type="spin" /> : "Login"}
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;
