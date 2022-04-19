import React, { useEffect, useContext } from "react";
import { StylesWrapper } from "./styles";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const allLinks = [
    {
      title: "All Devices",
      link: "/",
      slug: "devices",
      active: true,
    },
    {
      title: "Create Device ",
      link: "/create-device",
      slug: "create_device",
      active: false,
    },
  ];

  return (
    <StylesWrapper>
      <div className="dashLayout">
        <aside className="hide-sm">
          <div className="dashSidebar bg-primary-dk">
            <div className="dashSidebarContent">
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo@lg@2x.png"
                    alt="Logo"
                    width={235}
                    height={45}
                  />
                </a>
              </Link>
            </div>
            <ul className="dashSteps list-group">
              {allLinks.map((link, index) => (
                <li key={index} className="dashStep">
                  <div className="">
                    <Link href={link.link}>
                      <a
                        className={
                          "dashStepIcon " +
                          (router.asPath == link.link ? "active" : "")
                        }
                      >
                        <div>
                          <span className="">
                            <b>{link.title}</b>
                          </span>
                        </div>
                      </a>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="flex-grow-1 dashMain">
          <section className="dashMainSection">
            <div>{children}</div>
          </section>
        </main>
      </div>
    </StylesWrapper>
  );
};

export default DashboardLayout;
