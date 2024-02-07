const { exec } = require('child_process');

const javaCommand = 'java -jar mavenProject.jar';

exec(javaCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running Java command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Java command stderr: ${stderr}`);
    return;
  }

  console.log(`Java command stdout: ${stdout}`);
});
