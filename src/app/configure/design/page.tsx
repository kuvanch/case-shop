import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface DesignPageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const DesignPage = async ({ searchParams }: DesignPageProps) => {
    const { id } = searchParams;
    if (!id || typeof id !== "string") return notFound();

    const configuration = await db.configuration.findUnique({
        where: { id },
    });
    if (!configuration) notFound();

    const { height, width, imageUrl } = configuration;
    return (
        <DesignConfigurator
            imageUrl={imageUrl}
            configId={configuration.id}
            imageDimensions={{ width, height }}
        />
    );
};

export default DesignPage;
