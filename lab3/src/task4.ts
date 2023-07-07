import os from "os";
import si from "systeminformation";
import readline from 'readline';

let interval: null | NodeJS.Timer = null;

interface Cpu {
  model: string;
}

const getGB = (bytes: number): string => {
  return  (bytes / (1024 ** 3)).toFixed(3) + 'GB';
}

const getModels = (CPUS: Cpu[]): string[] => {
  return CPUS.map((cpu: Cpu) => cpu.model);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введіть дані: ', (data: string) => {
  
  interval = setInterval(getInfo, +data);
  
  rl.close();
});

const getInfo = async (): Promise<string> => {
  const graphicsInfo = await si.graphics();
  const temperature = await si.cpuTemperature();
  const graphicsInfoModel = graphicsInfo.controllers[0].model;
  const graphicsInfoVendor = graphicsInfo.controllers[0].vendor;
  const memoryObject = await si.mem();
  const battery = await si.battery();
  const freeMemory = memoryObject.free;
  const totalMemory = memoryObject.total;
  const usedMemory = memoryObject.used;

  return `
  operating system: ${os.platform()}
  architecture: ${os.arch()}
  current user name: ${os.userInfo().username}
  cpu cores models: ${getModels(os.cpus())[0]}
  cpu temperature: ${temperature.main}
  graphic controllers vendors and models: ${graphicsInfoModel} ${graphicsInfoVendor}
  total memory, used memory, free memory в GB: ${getGB(totalMemory)} ${getGB(usedMemory)} ${getGB(freeMemory)}
  дані про батарею (charging ${battery.isCharging}, percent ${battery.percent}, remaining time ${battery.timeRemaining || 'Infinity'}). 
  `
};

const handleInfo = () => {
  getInfo().then(data => {
    console.log(data);
  });
};

handleInfo()
