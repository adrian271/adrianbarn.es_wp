import { Fragment } from "react";
import { CASE_STUDIES } from "@/content/portfolio";
import CaseStudyLander from "@/components/case-study/Lander";
import CaseStudyHero from "@/components/case-study/Hero";
import CaseStudyBody from "@/components/case-study/Body";
import CaseStudyContact from "@/components/case-study/Contact";
import Reveals from "@/components/case-study/Reveals";

export default function Home() {
  return (
    <>
      <CaseStudyLander />
      {CASE_STUDIES.map((cs, i) => {
        const next = CASE_STUDIES[i + 1];
        const nextLink = next
          ? {
              href: "#" + next.id + "-hero",
              label: next.company,
              num: next.num,
              year: next.year,
            }
          : {
              href: "#contact",
              label: "Get in touch",
              num: "07",
              year: "Today",
            };
        return (
          <Fragment key={cs.id}>
            <CaseStudyHero data={cs} />
            <CaseStudyBody data={cs} nextLink={nextLink} />
          </Fragment>
        );
      })}
      <CaseStudyContact />
      <Reveals />
    </>
  );
}
