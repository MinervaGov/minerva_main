import SignIn from "@/components/layout/onBoard/signin/SignIn";
import PageContainer from "@/components/layout/onBoard/PageContainer";

const SignInPage = () => {
  return (
    <PageContainer
      heading="Sign In Account"
      subHeading="Connect your wallet to access your account and manage your agent."
      paragraph="Create your DAO agent"
    >
      <SignIn />
    </PageContainer>
  );
};

export default SignInPage;
