import { Button } from "@/components/ui/button";
import { btnType } from "@/types/Types";



export function EditButton({ name, type, onClick, varient, className }: btnType) {
  return (
    <Button type={type} onClick={onClick} variant={varient} className={className}>
      {name}
    </Button>
  );
}
