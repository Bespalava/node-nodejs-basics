const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes('CLOSE')) process.exit(0);
  process.stdout.write(`Received from master process: ${chunkStringified}\n`);
};

process.stdin.on('data', echoInput);
process.on('message', (message) => {
  console.log(`Received from master process (IPC): ${message}`);
});

process.send('Child process is ready');
