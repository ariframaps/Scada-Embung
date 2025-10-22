import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const ConfirmModal = ({
	text,
	btnText,
	btnClassName,
	setAnswer,
	disabled = false,
	type,
}) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button
				disabled={disabled}
				className={btnClassName}
				onClick={() => {
					setOpenModal(true);
				}}>
				{btnText}
			</Button>
			<Modal
				show={openModal}
				size="md"
				onClose={() => setOpenModal(false)}
				popup>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<h3 className="mb-5 text-lg font-normal text-gray-700">
							{text}
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								className="w-full"
								color="gray"
								onClick={() => {
									setOpenModal(false);
									setAnswer(type);
								}}>
								Iya
							</Button>
							<Button
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
		</>
	);
};

export default ConfirmModal;
