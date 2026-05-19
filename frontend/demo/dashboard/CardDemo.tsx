"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ROBO_ROMP_YT } from "@/constants/videos";

const CardDemo = () => {
  return (
    <Card className="space-x-2 flex flex-col items-center">
      <CardContent className="p-4">
        {/* <iframe
            src={ROBO_ROMP_YT}
            width={500}
            height={300}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            loading="lazy"
            className="rounded-xl lg:w-[500px] w-[300px]"
          /> */}

        <iframe
          width="560"
          height="315"
          src={ROBO_ROMP_YT}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-xl lg:w-125 w-75"
        ></iframe>
      </CardContent>
      <CardFooter>
        <p className="lg:text-xl font-bold">Who are we?</p>
      </CardFooter>
    </Card>
  );
};

export default CardDemo;
