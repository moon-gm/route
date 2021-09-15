import { useState } from 'react';
import Modal from 'react-modal';
import css from '../styles/modules/modal.module.scss'

// モーダルウィンドウのCSS設定
const customStyles = {
	// 背景のCSS設定
	overlay : {

	},
	// モーダルウィンドウのCSS設定
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		background            : 'rgba(0, 0, 0, 0.7)',
	}
};

// 任意のアプリを設定する　create-react-appなら#root
Modal.setAppElement('#__next');

const ModalWindow = ({title, content, openBtn}) => {

	// State設定
	const [modalIsOpen, setModalIsOpen] = useState(false);

	// モーダル表示時の処理
	function openModal() {
		setModalIsOpen(true);
	}

	// モーダル表示後の処理
	function afterOpenModal() {
		document.getElementById('title').style.color = 'white';
	}

	// モーダル閉じた後の処理
	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<>
			<span
				onClick={openModal}
				className={css.openModal}
			>
				{openBtn}
			</span>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div className={css.modalWindow}>
					<h2
						id="title"
						className={css.title}
					>
						{title}
					</h2>
					<p
						id="content"
						className={css.content}
					>
						{content}
					</p>
					<button
						onClick={closeModal}
						className={css.closeModal}
					>
						Close
					</button>
				</div>
			</Modal>
		</>
	);
}
export default ModalWindow;
