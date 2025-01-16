import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconRobotFace,
  IconUserBolt,
  IconCirclePlus,
  IconChartBar,
  IconShoppingCartDollar
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Dashboard from "./Dashboard";
import FieldModal from "../components/FieldModal";
import AiInsightModal from "../components/AiInsightModal"; // New AI Insight Modal Component

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAiModalOpen, setAiModalOpen] = useState(false);
  const navigate = useNavigate()
  const handleLogout = () => {
    setOpen(false); 
    setModalOpen(false); 
    setAiModalOpen(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload(); 
};
const handleData = ()=>{
  navigate("/aichart",{ replace: true })
  window.location.reload(); 
}

const handlePricing=()=>{
  navigate("/pricing",{ replace: true })
  window.location.reload(); 
}


  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Field",
      href: "#",
      icon: (
        <IconCirclePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setModalOpen(true),
    },
    {
      label: "AI Insight",
      href: "#",
      icon: (
        <IconRobotFace className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setAiModalOpen(true), 
    },
    {
      label: "Data Visual",
      href: "#",
      icon: (
        <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleData(), 
    },
    {
      label: "Pricing",
      href: "#",
      icon: (
        <IconShoppingCartDollar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handlePricing(), 
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick:()=>handleLogout(),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-8xl mx-auto border border-neutral-200 dark:border-neutral-700",
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard />

      {/* Field Modal Component */}
      <FieldModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onFieldAdded={() => setModalOpen(false)}
      />

      {/* AI Insight Modal Component */}
      <AiInsightModal
        isOpen={isAiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}


export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SenseGrass
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};



