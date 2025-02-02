import SignIn from "@/components/layout/onBoard/signin/SignIn";
import PageContainer from "@/components/layout/onBoard/PageContainer";

const SignInPage = () => {
  return (
    <PageContainer
      heading="Setup Profile"
      subHeading="Connect your wallet to access your account and manage your agent."
      paragraph="Access your account"
    >
      <SignIn />
    </PageContainer>
  );
};

export default SignInPage;
