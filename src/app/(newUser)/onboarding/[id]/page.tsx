import { validateRequest } from "@/auth";
import { PageContainer } from "@/components/containers/PageContainer";
import { Footer } from "@/components/partials/Footer";
import OnboardingForm from "@/components/forms/OnboardingForm";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface OnboardingPageProps {
	params: {
		id: string;
	};
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
	const { id } = params;

	// await getUser(id);

	const session = await validateRequest();

	const user = await db.user.findUnique({
		where: {
			id: params.id,
		},
	});

	const getUserInfo = await db.userInfo.findFirst({
		where: {
			userId: params.id,
		},
		include: {
			allergies: true,
		},
	});

	if (session.user?.id !== id) {
		redirect(`/onboarding/${session.user?.id}`);
	} else if (!session.user) {
		redirect("/login");
	}

	const firstName = user?.firstName;
	const lastName = user?.lastName;

	const birthday = getUserInfo?.birthDate;
	const height = getUserInfo?.height;
	const weight = getUserInfo?.weight;
	const monthyBudget = getUserInfo?.monthyBudget ?? 0;
	const allergies = getUserInfo?.allergies ?? [];

	return (
		<div>
			<PageContainer>
				<OnboardingForm
					id={id}
					firstName={firstName}
					lastName={lastName}
					birthday={birthday}
					height={height}
					weight={weight}
					monthyBudget={monthyBudget}
					allergies={allergies}
				/>
			</PageContainer>
			<Footer />
		</div>
	);
}
