import { AppSetup } from "./application/app-setup";

(async (): Promise<void> => await AppSetup.create().run())();
