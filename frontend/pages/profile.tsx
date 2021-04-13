import { ensureAuth } from "@/utils/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import { ControlLayout } from "@/components/Layout/ControlLayout";
import { ProfileContainer } from "@/containers/profile";

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  return (
    <ControlLayout>
      <Head>
        <title>Профиль</title>
      </Head>
      <ProfileContainer />
    </ControlLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  ctx
) => {
  ensureAuth(ctx, "private");
  return {
    props: {},
  };
};
