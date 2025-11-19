import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activeChannels } from "../../data/channel";
import { ArrowLeftIcon, Button } from "flowbite-react";
import LoadingIcon from "../../components/LoadingIcon";
import { getChannelValue, sendCommand } from "../../lib/api";
import { GAUGE_ANIMATION_TIME, POLLING_TIME } from "../../data/constant";
import GaugeChart from "../../components/GaugeChart";

export default function ChannelPage() {
	const navigate = useNavigate();
	const { id } = useParams(); // get product id from  url
	const channelData = activeChannels.find(
		(c) => c.channelName == decodeURI(id)
	);
	if (!id || !channelData) navigate("/not-found", { replace: true });

	const [channelValue, setChannelValue] = useState();
	const [openOrCloseStatus, setOpenOrCloseStatus] = useState(null); // "open" or "close" or "null"
	const [isSendingCommand, setIsSendingCommand] = useState(false);
	const changeInterval = useRef(null); // ✅ store interval for the changing values

	const fetchData = async () => {
		const res = await getChannelValue([channelData.channelNumber]);
		if (!res.success) return setChannelValue(null);
		setChannelValue(res.data[0].val);
	};

	const handleChangeValue = (type) => {
		// ✅ clear existing interval before starting new one
		if (changeInterval.current) {
			clearInterval(changeInterval.current);
			changeInterval.current = null;
		}

		if (type === null) return setOpenOrCloseStatus(null);

		let newValue = channelValue;
		changeInterval.current = setInterval(async () => {
			setOpenOrCloseStatus(type);

			if (type === "open") newValue += 1;
			else if (type === "close") newValue -= 1;
			setChannelValue(newValue);

			if (newValue == 100 || newValue == 0) {
				clearInterval(changeInterval.current);
				changeInterval.current = null;
				await sendAllChannels(newValue);
			}
		}, GAUGE_ANIMATION_TIME);
	};

	const sendAllChannels = async (newValue) => {
		handleChangeValue(null);
		setOpenOrCloseStatus(null);
		setIsSendingCommand(true);

		const res = await sendCommand(channelData.channelNumber, newValue);
		if (!res.success) {
			setChannelValue(null);
			return alert(`Gagal menyimpan perubahan, ${res.message}`);
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
	}, [openOrCloseStatus, channelData.channelNumber]);

	if (channelValue === undefined)
		return (
			<div className="my-[35vh] text-black">
				<LoadingIcon />
			</div>
		);
	if (channelValue === null)
		return (
			<p className="my-[35vh] text-black px-[10vw]">
				Terjadi kesalahan saat membaca data, Coba untuk refresh halaman.
			</p>
		);

	return (
		<>
			<div className="relative w-full md:max-w-5xl m-auto flex justify-between p-3 py-5">
				<Button
					onClick={() => navigate(-1)}
					className="absolute cursor-pointer"
					color={"alternative"}>
					<ArrowLeftIcon />
				</Button>
				<h1 className="flex-1 font-bold text-3xl">
					{channelData.channelName}
				</h1>
			</div>
			<div className=" w-screen h-[70vh] flex flex-col items-center justify-center text-center text-2xl">
				<GaugeChart value={channelValue} />

				<div className="flex gap-4 mt-24 justify-center w-full text-xl px-[5vw]">
					<Button
						disabled={
							openOrCloseStatus !== null ||
							isSendingCommand ||
							channelValue === 100
						}
						className="h-20"
						color={"green"}
						size="xl"
						onClick={() => handleChangeValue("open")}>
						Buka
					</Button>
					<Button
						disabled={openOrCloseStatus == null}
						className={`duration-200 h-20 ${
							openOrCloseStatus != null && "border-black scale-110"
						}`}
						color={"alternative"}
						size="xl"
						onClick={() => sendAllChannels(channelValue)}>
						Stop
					</Button>
					<Button
						disabled={
							openOrCloseStatus !== null ||
							isSendingCommand ||
							channelValue === 0
						}
						className="h-20"
						color={"yellow"}
						size="xl"
						onClick={() => handleChangeValue("close")}>
						Tutup
					</Button>
				</div>
				{isSendingCommand ? (
					<div className="flex items-center justify-center gap-5 text-base my-7">
						Mengirim data...
						<LoadingIcon size={20} />
					</div>
				) : null}
			</div>
		</>
	);
}
