import { validateRequest } from "@/auth";
import { PageContainer } from "@/components/containers/PageContainer";
import { UserInfoSettingsForm, UserSettingsForm } from "@/components/forms/UserSettingsForm";
import db from "@/lib/db";

export default async function Settings() {
	const session = await validateRequest();

	const getUserData = await db.user.findUnique({
		where: {
			id: session.user?.id,
		},
		include: {
			recipe: true,
		},
	});

	const getUserInfoData = await db.userInfo.findUnique({
		where: {
			userId: session.user?.id,
		},
		include: {
			allergies: true,
		},
	});

	return (
		<PageContainer>
			<div className="flex flex-col md:flex-row">
				<UserInfoSettingsForm userInfoData={getUserInfoData} />
				<div className="border-[0.1rem] border-gray-200 md:mx-4" />
				<UserSettingsForm userData={getUserData} />
			</div>
		</PageContainer>
	);
}
