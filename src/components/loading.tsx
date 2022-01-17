import styles from '../styles/modules/loading.module.scss'

const Loading = (): JSX.Element => {
	
	const label = {
		loading: 'Now Loading...'
	}

	return (
		<>
			<div className={styles.loading}/>
			<div className={styles.loadingLabel}>
				{label.loading}
			</div>
		</>	
	)
}
export default Loading
