import Head from "next/head";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Home } from "@/components/Landing/Home";
import { HowWeDo } from "@/components/Landing/HowWeDo";
import { Internet } from "@/components/Landing/Internet";
import { UseFul } from "@/components/Landing/Useful";
import { Step } from "@/components/Landing/Step";
import { OurTeam } from "@/components/Landing/OurTeam";
import { stepText } from "@/someData/stepData";

export default function Index() {
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
