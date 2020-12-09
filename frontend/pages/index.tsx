import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import Head from "next/head";
import MainLayout from "@/components/Layout/MainLayout";
import { Home } from "@/components/Landing/Home";
import { HowWeDo } from "@/components/Landing/HowWeDo";
import { Internet } from "@/components/Landing/Internet";
import { UseFul } from "@/components/Landing/Useful";
import { Step } from "@/components/Landing/Step";
import { OurTeam } from "@/components/Landing/OurTeam";

const stepText = [
  {
    title: "Как это работает?",
    subtitle: "Регистрация",
    text:
      "Предприниматели в сети интернет формируют глобальную экономическую сеть и при этом - превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Предварительные выводы неутешительны.",
    isSecond: false,
  },
  {
    title: undefined,
    subtitle: "Установка датчиков",
    text:
      "Предприниматели в сети интернет формируют глобальную экономическую сеть и при этом - превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Предварительные выводы неутешительны.",
    isSecond: true,
  },
  {
    title: undefined,
    subtitle: "Использование сервиса",
    text:
      "Предприниматели в сети интернет формируют глобальную экономическую сеть и при этом - превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Предварительные выводы неутешительны.",
    isSecond: false,
  },
];

interface IndexProps {}

export default function Index({}: IndexProps) {
  return (
    <MainLayout>
      <Head>
        <title>LoRaWAN Dam</title>
      </Head>
      <Home />
      <HowWeDo />
      <Internet />
      <UseFul />
      <Step
        title={stepText[0].title}
        subtitle={stepText[0].subtitle}
        text={stepText[0].text}
        isSecond={stepText[0].isSecond}
      />
      <Step
        title={stepText[1].title}
        subtitle={stepText[1].subtitle}
        text={stepText[1].text}
        isSecond={stepText[1].isSecond}
      />
      <Step
        title={stepText[2].title}
        subtitle={stepText[2].subtitle}
        text={stepText[2].text}
        isSecond={stepText[2].isSecond}
      />
      <OurTeam />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async (
  ctx
) => {
  // ensureAuth(ctx);
  return {
    props: {},
  };
};
