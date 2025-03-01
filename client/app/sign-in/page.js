import SignIn from "@/components/layout/onBoard/signin/SignIn";
import PageContainer from "@/components/layout/onBoard/PageContainer";
import Image from "next/image";

const SignInPage = () => {
  return (
    <PageContainer
      heading="Setup Profile"
      subHeading="Connect your wallet to access your account and manage your agent."
      paragraph="Access your account"
      right={
        <Image
          src="/minerva/avatar.jpeg"
          width={2000}
          height={2000}
          className=" object-cover w-full h-full"
          alt="signin-image"
        />
      }
      rightColor="#f3f3f3"
    >
      <SignIn />
    </PageContainer>
  );
};

export default SignInPage;
