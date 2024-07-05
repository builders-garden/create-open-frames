#!/usr/bin/env node
import art from "ascii-art";
import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
import { frames, handleFrameCreation } from "./frames.js";

const handleSigTerm = () => {
  console.log(`${chalk.red("Open Frame creation aborted.")}`);
  process.exit(0);
};

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const main = async () => {
  try {
    const openFramesArt = await art.font("Open Frames", "doom").toPromise();
    console.log(openFramesArt);
    console.log(`created by 🌳 ${chalk.green("https://builders.garden")}`);

    const selectedOpenFrame = await select({
      message: "Select an Open Frames template:",
      choices: frames,
    });

    const name = await input({
      message: "Enter your desired folder name:",
      default: "open-frame",
    });

    const directory = await input({
      message: "Enter the director where you want to create your Open Frame:",
      default: "./",
    });

    const parsedDirectory =
      directory.charAt(directory.length - 1) === "/"
        ? directory.slice(0, -1)
        : directory;

    const path = `${parsedDirectory}/${name}`;

    handleFrameCreation(selectedOpenFrame, path);
  } catch (error) {
    console.log(`${chalk.red("Open Frame creation aborted.")}`);
  }
};

main();
