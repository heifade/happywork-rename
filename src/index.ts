import commander from "commander";

import { addRenameCommand } from "./renameCommand";

addRenameCommand();

commander.parse(process.argv);
