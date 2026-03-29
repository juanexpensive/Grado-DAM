import "reflect-metadata";
import { useRouter } from "expo-router";

export const useHomeViewModel = () => {
    const router = useRouter();
    const titulo = "Bienvenido al tres en raya de Juan Caro Vaquero";

    const entrarAlJuego = () => {
        router.push("/game" as any);
    };

    return {
        titulo,
        entrarAlJuego
    };
};
