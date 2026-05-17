import Lander from "@/components/sections/Lander";
import Oracle from "@/components/sections/Oracle";
import Tenant from "@/components/sections/Tenant";
import Soberlink from "@/components/sections/Soberlink";
import Blast from "@/components/sections/Blast";
import Billabong from "@/components/sections/Billabong";
import Futures from "@/components/sections/Futures";
import Contact from "@/components/sections/Contact";
import SideNavAndObservers from "@/components/SideNavAndObservers";

export default function Home() {
  return (
    <>
      <Lander />
      <Oracle />
      <Tenant />
      <Soberlink />
      <Blast />
      <Billabong />
      <Futures />
      <Contact />
      <SideNavAndObservers />
    </>
  );
}
