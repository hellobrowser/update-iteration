import core from "@actions/core";
import GitHubProject from "github-project";

function getCurrentDateInKST() {
    // 현재 시간을 UTC로 가져옵니다.
    const now = new Date();

    // KST(UTC+9)로 변환합니다.
    const kstOffset = 9 * 60; // KST는 UTC+9이므로 9시간을 분으로 변환
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000); // UTC 시간
    const kstTime = new Date(utcTime + (kstOffset * 60000)); // KST 시간

    // 날짜를 yyyy-mm-dd 형식으로 포맷팅합니다.
    const year = kstTime.getFullYear();
    const month = String(kstTime.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(kstTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor;

function callAsyncFunction(args, source) {
  const fn = new AsyncFunction(...Object.keys(args), source);
  return fn(...Object.values(args));
}


const run = async () => {
  try {
    const source = core.getInput("script");

    callAsyncFunction({ core, GitHubProject }, source);

    /*const owner = core.getInput("owner");
    const number = Number(core.getInput("number"));
    const token = core.getInput("token");
    const iterationField = core.getInput("iteration-field"); // name of the iteration field
    const iterationType = core.getInput("iteration"); // last or current
    const newiterationType = core.getInput("new-iteration"); // current or next
    const statuses = core.getInput("statuses").split(",");
    const coreExclusedStatuses = core.getInput("excluded-statuses");
    const excludedStatuses = coreExclusedStatuses ? coreExclusedStatuses.split(",") : [];

    const ghProject = new GitHubProject({ owner, number, token, fields: { iteration: iterationField, readyTime: "Ready Time", doneTime: "Done Time" } });

    const items = await ghProject.items.list();
    core.debug(`items: ${JSON.stringify(items)}`);

    const project = await ghProject.getProperties();

    if (!project.fields) {
      core.setFailed(`No iteration field found with name ${iterationField}`);
      return;
    }
    core.debug(`project fields: ${JSON.stringify(project.fields)}`);

    const projectIterationField = project.fields.iteration;

    //console.log(`project iteration field: ${JSON.stringify(projectIterationField)}`);

    const lastIteration = projectIterationField.configuration.completedIterations[0];
    const currentIteration = projectIterationField.configuration.iterations[0];
    const nextIteration = projectIterationField.configuration.iterations[1];

    const iteration = iterationType === "last" ? lastIteration : currentIteration;

    if (!iteration) {
      core.setFailed(`No ${iterationType} iteration found. Check if the iteration exists.`);
      return;
    }

    core.debug(`iteration: ${iteration.title}`);

    const newIteration = newiterationType === "current" ? currentIteration : nextIteration;

    if (!newIteration) {
      core.setFailed(`No ${newiterationType} iteration found. Check if the iteration exists.`);
      return;
    }

    core.debug(`newIteration: ${newIteration.title}`);

    const iterationUpdates = items.filter((item) => {
      if (item.fields.status !== null && item.fields.status !== "Backlog" && item.fields.status !== "Done") {
        return true;
      }
    });

    await Promise.all(
      iterationUpdates.map((item) => {
        ghProject.items.update(item.id, { iteration: currentIteration.title });
      })
    );

    

    const readyTimeUpdates = items.filter((item) => {
      console.log("title:", item);
      console.log("iteration:", item.fields.iteration);
      console.log("readyTime:", item.fields.readyTime);
      if (item.fields.status === "Ready" && currentIteration.startDate <= getCurrentDateInKST() && item.fields.readyTime === null) {
          return true;
      }
    });

    await Promise.all(
      readyTimeUpdates.map((item) => {
        console.log(`item: ${JSON.stringify(item)}`);
        console.log(iteration.startDate);
        console.log(getCurrentDateInKST());
        console.log(getCurrentDateInKST() - iteration.startDate);
        console.log(iteration.startDate < getCurrentDateInKST() && (iteration.startDate + iteration.duration) < getCurrentDateInKST());
        console.log(iteration.startDate > getCurrentDateInKST());
        ghProject.items.update(item.id, { readyTime: currentIteration.startDate });
      })
    );

    const doneTimeUpdates = items.filter((item) => {
      if (item.fields.status === "Done" && item.fields.doneTime === null && item.fields.iteration !== null) {
          return true;
      }
    });

    await Promise.all(
      doneTimeUpdates.map((item) => ghProject.items.update(item.id, { doneTime: getCurrentDateInKST() }))
    ); */
  } catch (error) {
    core.setFailed(error);
  }
};

run();
