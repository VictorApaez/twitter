import React, { SVGProps } from "react";

const icons = ["thumbs-up", "comment", "share"];
interface IconProps extends SVGProps<SVGSVGElement> {
  id: string;
}

const Icon: React.FC<IconProps> = ({ id, ...props }) => {
  return (
    <svg {...props} width={24} height={24}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default Icon;
