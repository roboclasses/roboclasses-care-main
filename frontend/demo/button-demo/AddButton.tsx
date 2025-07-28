import { Button } from "@/components/ui/button";
import { btnType } from "@/types/Types";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";


export function AddButton({ name, type, link }: btnType) {
  return (
    <Link href={link ?? ''}>
    <Button type={type} className='flex items-center gap-2' variant={"secondary"}>
        <span>
            <IoAdd />
        </span>
      {name}
    </Button>
    </Link>
  );
}
