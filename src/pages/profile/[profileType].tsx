import { Fragment } from 'react'
import { useRouter } from 'next/router'
import $ from '../../components/page-bundle'
import Modal from '../../components/modal'
import Loading from '../../components/loading'
import { ProfilePage } from '../../config/profile-data'

const Profile = ({ $category }) => {

	const { profile } = $category

	// get parameter from URL
	const router = useRouter()
	const { profileType } = router.query

	const profileKeys: string[] = Object.keys(profile.dataSet)

	const profileKey: string = profileKeys.includes(profileType as string) ? profileType as string : ''

	const pageData: ProfilePage = profileKey ? profile.dataSet[profileKey] : undefined

	return pageData === undefined ? <Loading/> : (
		<$.Page
			categoryState={profile.state}
			pageName={profile.name}
		>
			<$.BaseSection>
				<$.H1>
					{pageData.name}
				</$.H1>
			</$.BaseSection>

			{pageData.contents.map(section => (
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
													{list.text}
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
