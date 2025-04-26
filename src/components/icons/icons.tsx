import { FaUser } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash, FaArrowUp, FaTrashAlt, FaPen } from "react-icons/fa";
import { IoLogOutOutline, IoCreateSharp } from "react-icons/io5";
import { RiSidebarUnfoldFill, RiSidebarFoldFill } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdIosShare } from "react-icons/md";

export const CreateNewConvIcon = ({size, color, style}:IconProps) => {
  return <IoCreateSharp size={size} color={color} className={style} />
}

export const ShareIcon = ({size, color, style}:IconProps) => {
  return <MdIosShare size={size} color={color} className={style} />
}

export const PenIcon = ({size, color, style}:IconProps) => {
  return <FaPen size={size} color={color} className={style} />
}

export const TrashIcon = ({size, color, style}:IconProps) => {
  return <FaTrashAlt size={size} color={color} className={style} />
}

export const HosrizontalDotsIcon = ({size, color, style}:IconProps) => {
  return <HiDotsHorizontal size={size} color={color} className={style} />
}

export const CloseSidebarIcon = ({size, color, style}:IconProps) => {
  return <RiSidebarFoldFill size={size} color={color} className={style} />
}

export const OpenSidebarIcon = ({size, color, style}:IconProps) => {
  return <RiSidebarUnfoldFill size={size} color={color} className={style} />
}

export const ArrowUpIcon = ({size, color, style}:IconProps) => {
  return <FaArrowUp size={size} color={color} className={style} />
}

export const OpenEyeIcon = ({size, color, style}:IconProps) => {
  return <FaRegEye size={size} color={color} className={style} />
}

export const CloseEyeIcon = ({size, color, style}:IconProps) => {
  return <FaRegEyeSlash size={size} color={color} className={style} />
}

export const LogoutIcon = ({size, color, style}:IconProps) => {
  return <IoLogOutOutline size={size} color={color} className={style} />
}

export const UserIcon = ({size, color, style}:IconProps) => {
  return <FaUser size={size} color={color} className={style} />
}