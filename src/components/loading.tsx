const Loading = (): JSX.Element => {
	
	const label = {
		loading: 'Now Loading...'
	}

	return (
		<div style={{textAlign: 'center'}}>
			{label.loading}
		</div>
	)
}
export default Loading
