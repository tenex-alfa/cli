import { exec } from "child_process";

const execute = (command: string) => {
  return new Promise((res, rej) => {
    exec(command, (err: any, stdout: any, stderr: any) => {
      if (err) rej(err);
      if (stdout) res(stdout);
      if (stderr) rej(stderr);
    });
  });
};

export default execute;
