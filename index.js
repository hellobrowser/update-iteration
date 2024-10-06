import core from "@actions/core";
import GitHubProject from "github-project";

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor;

function callAsyncFunction(args, source) {
  const fn = new AsyncFunction(...Object.keys(args), source);
  return fn(...Object.values(args));
}

const run = async () => {
  const script = core.getInput("script");
  callAsyncFunction({ core, GitHubProject }, script);
};

run();
