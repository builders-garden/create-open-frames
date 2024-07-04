#!/usr/bin/env node
import art from "ascii-art";
import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
import { frames, handleFrameCreation } from "./frames.js";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const main = async () => {
  try {
    const openFramesArt = await art.font("Open Frames", "doom").toPromise();
    console.log(openFramesArt);
    console.log(`created by 🌳 ${chalk.green("https://builders.garden")}`);

    const selectedOpenFrame = await select({
      message: "select an open-frame template:",
      choices: frames,
    });

    const name = await input({
      message: "enter your desired name:",
      default: "open-frame",
    });

    const directory = await input({
      message: "enter the directory where you want to create the open-frame:",
      default: "./",
    });

    const parsedDirectory =
      directory.charAt(directory.length - 1) === "/"
        ? directory.slice(0, -1)
        : directory;

    const path = `${parsedDirectory}/${name}`;

    handleFrameCreation(selectedOpenFrame, path);
  } catch (error) {
    console.log(`${chalk.red("open-frame creation aborted.")}`);
  }
};

main();
