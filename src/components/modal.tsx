import { useState } from 'react'
import Modal from 'react-modal'
import styles from '../styles/modules/modal.module.scss'

Modal.setAppElement('#__next') // set modal to element in this app

// set modal window style
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

const ModalWindow = ({ title, content }): JSX.Element => {

	const [modalIsOpen, setModalIsOpen] = useState(false)

	// action when modal opens
	const openModal = (): void => setModalIsOpen(true)

	//action after modal displays
	const afterOpenModal = (): string => document.getElementById('title').style.color = 'white'

	// action when modal closes
	const closeModal = (): void => setModalIsOpen(false)

	return (
		<>
			<span
				onClick={openModal}
				className={styles.openModal}
			>
				{label.open}
			</span>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div className={styles.modalWindow}>
					<h2
						id="title"
						className={styles.title}
					>
						{title}
					</h2>
					<p
						id="content"
						className={styles.content}
					>
						{content}
					</p>
					<button
						onClick={closeModal}
						className={styles.closeModal}
					>
						{label.close}
					</button>
				</div>
			</Modal>
		</>
	);
}
export default ModalWindow;
