import styles from '../styles/modules/mainVisual.module.scss'

const MainVisual = ({data, children}) => {

	return (
		<>

			{/*** メインビジュアルエリア -- start -- ***/}
				<div className="main-visual-area">
					<div className="main-visual-area-wrap">
						<div className={styles.scrollArea}>
							{/** スクロールエリア -- start -- **/}
								{children}
							{/** スクロールエリア -- end -- **/}
						</div>
					</div>
				</div>
			{/*** メインビジュアルエリア -- end -- ***/}
		</>
	);
}
export default MainVisual
