import { useState } from 'react'
import Modal from 'react-modal'
import styles from '../styles/modules/modal.module.scss'

Modal.setAppElement('#__next') // set modal to element in this app

const customStyles = {
	// set background
	overlay : {},
	// set window
	content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: 'rgba(0, 0, 0, 0.7)',
	}
}

const label = {
	open: '?',
	close: 'Close',
}

const modalTitleId = 'modalTitle'

const ModalWindow = ({ title, content }): JSX.Element => {

	const [modalDisplay, setModalDisplay] = useState(false)

	// action when modal opens
	const onOpen = (): void => setModalDisplay(true)

	//action after modal displays
	const onAfterOpen = (): string => document.getElementById(modalTitleId).style.color = 'white'

	// action when modal closes
	const onClose = (): void => setModalDisplay(false)

	return (
		<>
			<button
				className={styles.modalOpenButton}
				onClick={onOpen}
			>
				{label.open}
			</button>
			<Modal
				isOpen={modalDisplay}
				onAfterOpen={onAfterOpen}
				onRequestClose={onClose}
				style={customStyles}
			>
				<div className={styles.modalWindow}>
					<h2
						id={modalTitleId}
						className={styles.modalTitle}
					>
						{title}
					</h2>
					<p className={styles.modalContent}>
						{content}
					</p>
					<button
						className={styles.modalCloseButton}
						onClick={onClose}
					>
						{label.close}
					</button>
				</div>
			</Modal>
		</>
	);
}
export default ModalWindow;
