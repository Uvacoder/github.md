import Link from "next/link";
import React, { useContext } from "react";

import ButtonLink from "../../basic/buttons/ButtonLink";
import UserSmall from "../../basic/UserSmall";

import { RepoContext } from "../RepoLayout";

const InfoPanel: React.FC = () => {
  const {
    repoInfo: { owner, description, html_url },
  } = useContext(RepoContext);

  return (
    <div className="border border-stone-500 dark:border-[#aaa] min-h-[50px] rounded-[10px] py-4 px-6 gap-2 grid w-full justify-center items-center">
      <Link href={`/gh/${owner.login}`}>
        <div className="mx-auto">
          <UserSmall owner={owner} />
        </div>
      </Link>
      <div className="mb-4">{description}</div>
      <ButtonLink
        text="View on Github"
        link={{ href: html_url, newTab: true }}
      />
    </div>
  );
};

export default InfoPanel;
