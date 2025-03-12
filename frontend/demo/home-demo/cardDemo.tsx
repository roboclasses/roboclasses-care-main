import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ROBO_ROMP_YT } from "@/constants/videos";

const CardDemo = () => {
  return (
    <Card className="lg:w-[360px] h-[270px] space-x-2 flex flex-col items-center">
      <CardContent className="p-4">
        <div className="bg-white rounded-lg shadow-md">
          <iframe
            src={ROBO_ROMP_YT}
            allowFullScreen
            width={600}
            height={400}
            sandbox="allow-scripts allow-same-origin allow-presentation"
            loading="lazy"
            className="lg:w-[320px] h-[200px] rounded"
          />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xl font-bold">Who are we?</p>
      </CardFooter>
    </Card>
  );
};

export default CardDemo;
