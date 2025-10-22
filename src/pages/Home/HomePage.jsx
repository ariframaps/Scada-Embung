import { useEffect, useRef, useState } from "react";
import ChannelPreview from "../../components/ChannelPreview";
import { allChannels, channelNumbers } from "../../data/data";
import { Button, ButtonGroup } from "flowbite-react";
import ConfirmModal from "../../components/ConfirmModal";
import LoadingIcon from "../../components/LoadingIcon";
import { getChannelData, sendCommand } from "../../lib/api";

const HomePage = () => {
	const [channelsData, setChannelsData] = useState();
	const [openOrCloseStatus, setOpenOrCloseStatus] = useState(null);
	const [isSendingCommand, setIsSendingCommand] = useState(false);
	const changeInterval = useRef(null); // ✅ store interval for the changing values

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getChannelData(channelNumbers); //ambil data
				if (!res.success) throw new Error(res.message); // jika gagal fetch maka throw error
				setChannelsData(res.data);
			} catch (err) {
				setChannelsData(null);
				console.error("Fetch error ", err.message);
			}
		};

		const interval = setInterval(() => {
			if (openOrCloseStatus !== null) return;
			else fetchData(); // polling
		}, import.meta.env.VITE_POLLING_TIME);

		return () => clearInterval(interval); // cleanup!
	}, [openOrCloseStatus]);

	function handleChangeValue(type) {
		// ✅ clear existing interval before starting new one
		if (changeInterval.current) {
			clearInterval(changeInterval.current);
			changeInterval.current = null;
		}

		if (type === null) return setOpenOrCloseStatus(null);

		let newData = [...channelsData];

		changeInterval.current = setInterval(async () => {
			setOpenOrCloseStatus(type);

			newData = newData.map((ch) => {
				if (type === "open") {
					if (ch.val < 100) return { ...ch, val: ch.val + 1 };
				} else {
					if (ch.val > 0) return { ...ch, val: ch.val - 1 };
				}
				return ch;
			});

			setChannelsData(newData);

			let isDone = newData.every((ch) => ch.val >= 100 && ch.val <= 0);

			if (isDone) {
				clearInterval(changeInterval.current);
				changeInterval.current = null;
				await sendAllChannels();
			}
		}, import.meta.env.VITE_GAUGE_ANIMATION_TIME);
	}

	async function sendAllChannels() {
		setOpenOrCloseStatus(null);
		setIsSendingCommand(true);

		try {
			handleChangeValue(null);

			const errors = [];
			for (const ch of channelsData) {
				const res = await sendCommand(ch.cnlNum, ch.val);
				if (!res.success) errors.push(ch.cnlNum);
			}

			if (errors.length > 0) {
				alert(`gagal menyimpan perubahan pada embung ${errors.join(", ")}`);
			} else {
				alert(`perubahan berhasil disimpan`);
			}
		} catch (err) {
			setChannelsData(null);
			alert(`Gagal menyimpan perubahan`);
		} finally {
			setIsSendingCommand(false);
		}
	}

	if (channelsData === undefined)
		return (
			<div className="my-[35vh] text-black">
				<LoadingIcon />
			</div>
		);
	else if (channelsData === null)
		return (
			<p className="my-[35vh] text-black px-[10vw]">
				Terjadi kesalahan saat membaca data, Coba untuk refresh halaman.
			</p>
		);
	else if (channelsData.length == 0) {
		return (
			<p className="my-[35vh] text-black">
				Tidak ada data untuk ditampilkan
			</p>
		);
	} else {
		return (
			<div className="w-full flex flex-col gap-5 md:gap-10 md:max-w-5xl m-auto justify-center my-5 md:my-10 px-5 lg:px-0">
				<div>
					<ButtonGroup outline className="flex">
						<ConfirmModal
							disabled={openOrCloseStatus !== null || isSendingCommand}
							btnClassName={
								"flex-1 text-xs md:text-sm px-0 bg-green-50 text-green-900 border-green-900 disabled:bg-white disabled:text-gray-500 duration-200"
							}
							btnText={"Buka semua"}
							text={"Apakah anda yakin ingin membuka semua?"}
							setAnswer={handleChangeValue}
							type={"open"}
						/>
						<Button
							disabled={openOrCloseStatus === null}
							onClick={sendAllChannels}
							className={`flex-1 text-xs md:text-sm px-0 duration-200 disabled:text-gray-500 ${
								openOrCloseStatus !== null &&
								"bg-blue-200 text-blue-900"
							}`}>
							Stop
						</Button>
						<ConfirmModal
							disabled={openOrCloseStatus !== null || isSendingCommand}
							btnClassName={
								"flex-1 text-xs md:text-sm px-0 bg-yellow-50 text-yellow-900 border-yellow-900 disabled:bg-white disabled:text-gray-500 duration-200"
							}
							btnText={"Tutup semua"}
							text={"Apakah anda yakin ingin menutup semua?"}
							setAnswer={handleChangeValue}
							type={"close"}
						/>
					</ButtonGroup>
				</div>
				<ul className="w-full grid place-items-center 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
					{channelsData.map((item) => (
						<ChannelPreview
							disabled={openOrCloseStatus !== null || isSendingCommand}
							key={item.cnlNum}
							data={item}
							name={
								allChannels.find(
									(ch) => ch.channelNumber == item.cnlNum
								).channelName
							}
						/>
					))}
				</ul>
			</div>
		);
	}
};

export default HomePage;
