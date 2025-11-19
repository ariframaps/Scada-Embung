import {
	GaugeContainer,
	GaugeValueArc,
	GaugeReferenceArc,
	useGaugeState,
} from "@mui/x-charts/Gauge";

export default function GaugeChart({ value }) {
	return (
		<div className="flex flex-col items-center">
			<GaugeContainer
				width={200}
				height={150}
				value={value}
				startAngle={-110}
				endAngle={110}
				innerRadius={50}>
				<GaugeReferenceArc />
				<GaugeValueArc />
				<GaugePointer />
			</GaugeContainer>
			<p>{value}%</p>
		</div>
	);
}

const GaugePointer = () => {
	const { valueAngle, outerRadius, cx, cy } = useGaugeState();

	if (valueAngle === null) {
		// No value to display
		return null;
	}

	const target = {
		x: cx + outerRadius * Math.sin(valueAngle),
		y: cy - outerRadius * Math.cos(valueAngle),
	};
	return (
		<g>
			<circle cx={cx} cy={cy} r={5} fill="red" />
			<path
				d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
				stroke="red"
				strokeWidth={3}
			/>
		</g>
	);
};
