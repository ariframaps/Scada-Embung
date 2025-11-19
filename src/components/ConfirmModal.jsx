import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const ConfirmModal = ({
	text,
	btnText,
	btnClassName,
	setAnswer,
	disabled = false,
	type, // "open" or "close"
}) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button
				data-testid="control-btn"
				disabled={disabled}
				className={btnClassName}
				onClick={() => {
					setOpenModal(true);
				}}>
				{btnText}
			</Button>
			{!disabled && openModal ? (
				<Modal
					show={openModal}
					size="md"
					onClose={() => setOpenModal(false)}
					popup>
					<ModalHeader />
					<ModalBody>
						<div className="text-center">
							<h4 className="mb-5 text-lg font-normal text-gray-700">
								{text}
							</h4>
							<div className="flex justify-center gap-4">
								<Button
									data-testid="yes-btn"
									className="w-full"
									color="gray"
									onClick={() => {
										setOpenModal(false);
										setAnswer(type);
									}}>
									Iya
								</Button>
								<Button
									data-testid="no-btn"
									className="w-full border-1 text-xs sm:text-sm"
									color="gray"
									onClick={() => {
										setOpenModal(false);
										setAnswer(null);
									}}>
									Tidak, kembali
								</Button>
							</div>
						</div>
					</ModalBody>
				</Modal>
			) : null}
		</>
	);
};

export default ConfirmModal;
