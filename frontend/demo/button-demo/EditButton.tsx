import { Button } from "@/components/ui/button";
import { btnType } from "@/types/Types";


export function EditButton({ name, type, onClick, className }: btnType) {
  return (
    <Button type={type} onClick={onClick} className={className}>
      {name}
    </Button>
  );
}
