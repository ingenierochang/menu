import HeaderInformation from "@/components/header/HeaderInformation"
import HeaderImage from "./HeaderImage"
import clsx from "clsx"

type HeaderProps = {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div className={clsx('flex', className)}>
        <HeaderImage />
        <HeaderInformation />
    </div>
  )
}

export default Header
