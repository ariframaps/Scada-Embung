import { useEffect, useRef, useState } from "react";
import ChannelPreview from "../../components/ChannelPreview";
import { channelsData } from "../../data/channel";
import { Button, ButtonGroup } from "flowbite-react";
import ConfirmModal from "../../components/ConfirmModal";
import LoadingIcon from "../../components/LoadingIcon";
import { getChannelValue, sendCommand } from "../../lib/api";
import { GAUGE_ANIMATION_TIME, POLLING_TIME } from "../../data/constant";

const HomePage = () => {
	const chnNums = channelsData.map((ch) => ch.channelNumber);
	const [channelsValue, setChannelsValue] = useState();
	const [openOrCloseStatus, setOpenOrCloseStatus] = useState(null); // "open" or "close" or "null"
	const [isSendingCommand, setIsSendingCommand] = useState(false);
	const changeInterval = useRef(null); // ✅ store interval for the changing values

	const fetchData = async () => {
		const res = await getChannelValue(chnNums); //ambil data
		if (!res.success) return setChannelsValue(null);
		return setChannelsValue(res.data);
	};

	const handleChangeValue = (type) => {
		// ✅ clear existing interval before starting new one
		if (changeInterval.current) {
			clearInterval(changeInterval.current);
			changeInterval.current = null;
		}

		if (type === null) return setOpenOrCloseStatus(null);

		let newData = [...channelsValue];
		changeInterval.current = setInterval(async () => {
			setOpenOrCloseStatus(type);

			newData = newData.map((ch) => {
				if (type === "open") {
					if (ch.val < 100) return { ...ch, val: ch.val + 1 };
				} else if (type === "close") {
					if (ch.val > 0) return { ...ch, val: ch.val - 1 };
				}
				return ch;
			});

			setChannelsValue(newData);
			const isDone = newData.every((ch) => {
				if (type === "open") return ch.val >= 100;
				else if (type === "close") return ch.val <= 0;
			});

			if (isDone) {
				clearInterval(changeInterval.current);
				changeInterval.current = null;
				await sendAllChannels(newData);
			}
		}, GAUGE_ANIMATION_TIME);
	};

	const sendAllChannels = async (newData) => {
		handleChangeValue(null);
		setOpenOrCloseStatus(null);
		setIsSendingCommand(true);

		const errors = [];
		for (const ch of newData) {
			const res = await sendCommand(ch.cnlNum, ch.val);
			if (!res.success) errors.push(ch.cnlNum);
		}

		if (errors.length > 0) {
			alert(`gagal menyimpan perubahan pada embung ${errors.join(", ")}`);
			return setChannelsValue(null);
		}

		setIsSendingCommand(false);
		return alert(`perubahan berhasil disimpan`);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (openOrCloseStatus !== null) return;
			else fetchData(); // polling
		}, POLLING_TIME);

		return () => clearInterval(interval); // cleanup!
	}, [openOrCloseStatus, chnNums]);

	if (channelsValue === undefined)
		return (
			<div className="my-[35vh] text-black">
				<LoadingIcon />
			</div>
		);
	else if (channelsValue === null)
		return (
			<p className="my-[35vh] text-black px-[10vw]">
				Terjadi kesalahan saat membaca data, Coba untuk refresh halaman.
			</p>
		);
	else if (channelsValue.length == 0) {
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
							disabled={
								openOrCloseStatus !== null ||
								isSendingCommand ||
								channelsValue.every((ch) => ch.val >= 100)
							}
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
							onClick={() => sendAllChannels(channelsValue)}
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
				{isSendingCommand ? (
					<div className="flex items-center justify-center gap-5">
						Mengirim data...
						<LoadingIcon size={20} />
					</div>
				) : null}
				<ul className="relative w-full grid place-items-center 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
					{(isSendingCommand || openOrCloseStatus !== null) && (
						<div className="absolute inset-0 w-full h-full z-[1000]"></div>
					)}
					{channelsValue.map((item) => (
						<ChannelPreview
							disabled={openOrCloseStatus !== null || isSendingCommand}
							key={item.cnlNum}
							data={item}
							name={
								channelsData.find(
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
