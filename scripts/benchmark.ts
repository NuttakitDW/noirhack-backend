import axios from 'axios';
import pLimit from 'p-limit';
import { performance } from 'perf_hooks';

// Usage: bun run benchmark.ts [numPorts] [numRequests]
const numPorts = parseInt(process.argv[2] || '8', 10); // default: 8 ports (3000–3007)
const numRequests = parseInt(process.argv[3] || '100', 10); // default: 100 requests
const concurrency = numPorts;

const payload = {
  circuit_name: 'verifyCardMessage',
  data: {
    deck: [
      ['0x05', '0x05'],
      [
        '0x041e54cffbab943fdc54880df2d51ad3',
        '0x047f540302050db8121e1051053e2401a445fe636cd95139e15d4a5bdec8b718',
      ],
      ['0x06', '0x06'],
      ['0', '0'],
      ['0', '0'],
      ['0', '0'],
      ['0', '0'],
      ['0', '0'],
      ['0', '0'],
      ['0', '0'],
    ],
    deck_size: '3',
    card: [
      '0x041e54cffbab943fdc54880df2d51ad3',
      '0x047f540302050db8121e1051053e2401a445fe636cd95139e15d4a5bdec8b718',
    ],
    decrypt_components: [
      '0x20cf5baabbd9cccd98bbf96a280094970273359dfa27bae8e6c448e2f66233f6',
      '0x06fc91a246a8b3c4bcc4ac8b4d33ee60c0f310b9ef01fe8ef6ebf9d37f905362',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
    ],
    num_decrypt_components: '2',
    expected_messages: ['42', '43', '44', '0', '0', '0', '0', '0', '0', '0'],
    num_expected_messages: '3',
    nullifier_secret: '123456789',
  },
};

async function benchmark() {
  const ports = Array.from({ length: numPorts }, (_, i) => 3000 + i);
  const limit = pLimit(concurrency);

  const requests = Array.from({ length: numRequests }, (_, i) => {
    const port = ports[i % ports.length];
    const url = `http://localhost:${port}/prove`;
    return { url, index: i + 1 };
  });

  let completed = 0;
  const start = performance.now();

  const tasks = requests.map(({ url, index }) =>
    limit(async () => {
      try {
        await axios.post(url, payload);
        completed++;
        process.stdout.write(`\rRequests completed: ${completed}/${numRequests}`);
      } catch (err) {
        console.error(
          `\n❌ Request ${index} failed on port ${url.split(':')[2]}: ${(err as Error).message}`,
        );
      }
    }),
  );

  await Promise.all(tasks);

  const end = performance.now();
  const duration = end - start;

  console.log(
    `\n\n✅ Completed ${numRequests} requests across ports ${ports[0]}–${ports[ports.length - 1]}`,
  );
  console.log(`⏱️ Total time: ${(duration / 1000).toFixed(2)} s`);
  console.log(`📈 Average per request: ${(duration / numRequests).toFixed(2)} ms`);
}

benchmark();
