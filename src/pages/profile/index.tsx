import { Fragment } from 'react'
import $ from '../../components/page-bundle'
import Modal from '../../components/modal'
import Loading from '../../components/loading'
import { ProfilePage } from '../../types/index'

const Profile = ({ $category }) => {

	const { profile } = $category

	const profileIndex = 0

	const pageData: ProfilePage = {
		sectionData: profile.dataSet[profileIndex].sectionData
	}

	return pageData === undefined ? <Loading/> : (
		<$.Page
			categoryState={profile.state}
			pageName={profile.name}
		>
			<$.BaseSection>
				<$.H1>
					{profile.name}
				</$.H1>
			</$.BaseSection>

			{pageData.sectionData.map(section => (
				<$.ContentSection key={section.id}>
					<$.ContentSectionTitle>
						<$.H2 classNames={['flex-start', 'align-items-center']}>
							{section.name}
						</$.H2>
						{section.modal && (
							<Modal
								title={section.name}
								content={section.modal}
							/>
						)}
					</$.ContentSectionTitle>
					{section.contents.map(content => (
						<Fragment key={content.id}>
							{content.title && (
								<$.H3>
									{content.title}
								</$.H3>
							)}
							<$.ListBox>
								{content.lists.map((list, listIdx) => (
									<$.List key={`list${listIdx}`}>
										{list.note ? (
											<>
												<$.ListText>
													{list.type ? `${list.type}：${list.text}` : list.text}
												</$.ListText>
												{list.note.map((note, noteIdx) => (
													<$.ListNote key={`note${noteIdx}`}>
														{note}
													</$.ListNote>
												))}
											</>
										) : list.text}
									</$.List>
								))}
							</$.ListBox>
						</Fragment>
					))}
				</$.ContentSection>
			))}
		</$.Page>
	)
}
export default Profile
