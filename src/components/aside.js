import Link from 'next/link'
import styles from '../styles/modules/aside.module.scss'

const Aside = ({data, display, children}) => {
	return (
		<aside className={`contents-aside ${display}`}>

			{/*** セクションタイトル -- start -- ***/}
				{children}
			{/*** セクションタイトル -- end -- ***/}

		</aside>
	)
}
export default Aside
