'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ROBO_ROMP_YT } from "@/constants/videos";
import { useEffect, useState } from "react";

const CardDemo = () => {

  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 770) {
        setDimensions({ width: 300, height: 300 });
      } else {
        setDimensions({ width: 600, height: 400 });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="lg:w-[360px] h-[270px] space-x-2 flex flex-col items-center">
      <CardContent className="p-4">
        <div className="bg-white rounded-lg shadow-md">
          <iframe
            src={ROBO_ROMP_YT}
            width={dimensions.width}
            height={dimensions.height}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            loading="lazy"
            className="rounded"
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
