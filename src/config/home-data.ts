import { Category, IdName } from '../config/site-data'

// ---------- Values ---------- //
const category: IdName = {
	id: 'home',
	name: 'Home'
}

const home: Category<undefined> = {
	id: category.id,
	name: category.name,
	URL: '/',
	state: category.id
}

export default home
